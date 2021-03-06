import { IconArrowDown, IconArrowUp, IconX } from '@tabler/icons';
import { IconButton, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
    unclicked: {
        backgroundColor: '#343842',
        width: '375px',
        height: '60px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        borderColor: '#343842',
        borderStyle: 'solid',
        color: 'white'
    },
    clicked: {
        backgroundColor: '#343842',
        width: '375px',
        height: '60px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        borderColor: '#614AD3',
        borderStyle: 'solid',
        color: 'white'
    }
};

function ExhibitList({
    contentId,
    position,
    activeButton,
    setActive,
    content,
    setContent,
    contentType,
    setFormProps
}) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [isActiveButton, setIsActiveButton] = useState(activeButton === position);

    const setActiveButton = pos => {
        setActive(pos);
    };

    const isFirstElement = position === 1;
    const isLastElement = position === content.length;

    const changeCardPosition = (e, direction) => {
        e.stopPropagation();
        const newContentArr = content;
        if (direction === 'up') {
            if (isFirstElement) {
                return;
            }
            newContentArr[position - 1].position = position - 1;
            newContentArr[position - 2].position = position;
        }
        if (direction === 'down') {
            if (isLastElement) {
                return;
            }
            newContentArr[position - 1].position = position + 1;
            newContentArr[position].position = position;
        }
        newContentArr.sort((a, b) => a.position - b.position);
        setContent(newContentArr);

        if (direction === 'up') {
            setActiveButton(position - 1);
        }
        if (direction === 'down') {
            setActiveButton(position + 1);
        }
    };

    const deleteCard = e => {
        e.stopPropagation();
        const tempContentArr = content;

        // Update positions after deleting a card
        for (let i = position; i < tempContentArr.length; i++) {
            tempContentArr[i].position--;
        }
        tempContentArr.splice(position - 1, 1);
    };

    useEffect(() => {
        setIsActiveButton(activeButton === position);
    }, [activeButton, content, position]);

    return (
        <div
            className={isActiveButton ? classes.clicked : classes.unclicked}
            onClick={() => {
                setActiveButton(position);
                setFormProps(
                    content[position - 1].URL,
                    content[position - 1].description,
                    contentId,
                    position
                );
            }}>
            <span style={{ fontSize: '20px', marginLeft: '1.5rem' }}>
                {contentType(contentId) + ' card'}
            </span>
            <div className={classes.icons}>
                {!isFirstElement && (
                    <IconButton onClick={event => changeCardPosition(event, 'up')}>
                        <IconArrowUp size={24} color={'white'} />
                    </IconButton>
                )}
                {!isLastElement && (
                    <IconButton onClick={event => changeCardPosition(event, 'down')}>
                        <IconArrowDown size={24} color={'white'} />
                    </IconButton>
                )}

                <IconButton
                    onClick={event => {
                        deleteCard(event);
                    }}>
                    <IconX size={24} color={'white'} />
                </IconButton>
            </div>
        </div>
    );
}

ExhibitList.propTypes = {
    activeButton: PropTypes.number,
    content: PropTypes.array,
    contentType: PropTypes.func,
    contentId: PropTypes.any,
    position: PropTypes.number,
    setActive: PropTypes.func,
    setContent: PropTypes.func,
    setFormProps: PropTypes.func
};

export default ExhibitList;
