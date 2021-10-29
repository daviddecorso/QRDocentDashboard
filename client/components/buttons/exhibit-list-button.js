import { IconArrowDown, IconArrowUp, IconX } from '@tabler/icons';
import { IconButton, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
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
    contentType
}) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    let isActiveButton = activeButton === position;

    const setActiveButton = pos => {
        setActive(pos);
    };

    useEffect(() => {
        isActiveButton = activeButton === position;
    }, [activeButton, content]);

    let newContentArr = [];

    const isFirstElement = position === 1;
    const isLastElement = position === content.length;

    const changeCardPosition = (e, direction) => {
        e.stopPropagation();
        newContentArr = content;
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

    return (
        <div
            className={isActiveButton ? classes.clicked : classes.unclicked}
            onClick={() => {
                setActiveButton(position);
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

                <IconButton>
                    <IconX size={24} color={'white'} />
                </IconButton>
            </div>
        </div>
    );
}

ExhibitList.propTypes = {
    activeButton: PropTypes.number,
    content: PropTypes.shape({
        length: PropTypes.any
    }),
    contentType: PropTypes.func,
    contentId: PropTypes.any,
    position: PropTypes.number,
    setActive: PropTypes.func,
    setContent: PropTypes.func
};

export default ExhibitList;
