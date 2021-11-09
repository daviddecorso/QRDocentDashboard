import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Skeleton } from '@material-ui/lab';

const pageStyles = {
    listItemDarkBg: {
        height: '80px',
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1fr 1fr 1fr',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: '#2F333C'
    },
    listItemLightBg: {
        height: '80px',
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1fr 1fr 1fr',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: '#343842'
    },
    image: {
        justifySelf: 'right'
    }
};

function ExhibitListSkeleton() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();
    return (
        <>
            <div className={classes.listItemLightBg}>
                <Skeleton variant="circle" width={60} height={60} className={classes.image} />
                <Skeleton
                    variant="text"
                    style={{ justifySelf: 'center', width: '70%', height: '35px' }}
                />
                <Skeleton
                    variant="text"
                    style={{ justifySelf: 'center', width: '40%', height: '35px' }}
                />
                <Skeleton
                    variant="text"
                    style={{ justifySelf: 'center', width: '55%', height: '35px' }}
                />
            </div>
            <div className={classes.listItemDarkBg}>
                <Skeleton variant="circle" width={60} height={60} className={classes.image} />
                <Skeleton
                    variant="text"
                    style={{ justifySelf: 'center', width: '70%', height: '35px' }}
                />
                <Skeleton
                    variant="text"
                    style={{ justifySelf: 'center', width: '40%', height: '35px' }}
                />
                <Skeleton
                    variant="text"
                    style={{ justifySelf: 'center', width: '55%', height: '35px' }}
                />
            </div>
            <div className={classes.listItemLightBg}>
                <Skeleton variant="circle" width={60} height={60} className={classes.image} />
                <Skeleton
                    variant="text"
                    style={{ justifySelf: 'center', width: '70%', height: '35px' }}
                />
                <Skeleton
                    variant="text"
                    style={{ justifySelf: 'center', width: '40%', height: '35px' }}
                />
                <Skeleton
                    variant="text"
                    style={{ justifySelf: 'center', width: '55%', height: '35px' }}
                />
            </div>
        </>
    );
}

export default ExhibitListSkeleton;
