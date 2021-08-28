import { makeStyles, Typography } from '@material-ui/core';
import { IconPlus } from '@tabler/icons';
import PrimaryButton from '../components/buttons/primary-button';
import React from 'react';

const pageStyles = {
    header: {
        display: 'flex',
        alignItems: 'center'
    }
};

export default function Exhibits() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    return (
        <div>
            <div className={'content'}>
                <div className={'left-spacing'}>
                    <div className={classes.header}>
                        <Typography component="h1" variant="h2">
                            EXHIBITS
                        </Typography>
                        <div>
                            <PrimaryButton
                                path={'/exhibits/add'}
                                text={'Add an exhibit'}
                                width={'210px'}
                                height={'45px'}
                                fontSize={'14px'}
                                lm={'5vw'}
                                icon={<IconPlus size={20} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
