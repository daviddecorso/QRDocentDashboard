import {
    Button,
    Card,
    CardContent,
    makeStyles,
    Menu,
    MenuItem,
    Typography
} from '@material-ui/core';
import React, { useState } from 'react';

const mockData = {
    numScans: 16987,
    percent: -12.4
};

const useStyles = makeStyles({
    root: {
        width: '328px',
        borderRadius: '20px',
        backgroundColor: '#2F333C',
        display: 'flex',
        justifyContent: 'space-between'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '211px'
    },
    topRightMenu: {
        alignSelf: 'baseline',
        marginRight: '10px',
        paddingTop: '5px'
    },
    detailPositive: {
        color: '#4cdc52',
        backgroundColor: '#4caf501a'
    },
    detailNegative: {
        color: '#f44336',
        backgroundColor: '#90423c1a'
    },
    detailText: {
        color: '#ccc'
    },
    headingText: {
        marginTop: '.45rem',
        marginBottom: '.45rem'
    }
});

function NumericCard() {
    const classes = useStyles();
    const signBool = mockData.percent > 0;
    const sign = signBool ? '+' : '-';

    const [anchorEl, setAnchorEl] = useState(null);
    const [timeMenu, setTimeMenu] = useState('Today');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = item => {
        setAnchorEl(null);
        setTimeMenu(item);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography component="h3" variant="h6">
                        Total Scans
                    </Typography>
                    <Typography component="span" variant="h4" className={classes.headingText}>
                        {mockData.numScans.toLocaleString()}
                    </Typography>
                    <div>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            className={signBool ? classes.detailPositive : classes.detailNegative}>
                            {sign + mockData.percent + '%'}
                        </Typography>
                        <Typography
                            component="span"
                            variante="subtitle1"
                            className={classes.changeText}>
                            {' Since ' + timeMenu.toLowerCase()}
                        </Typography>
                    </div>
                </CardContent>

                <div className={classes.topRightMenu}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        {timeMenu}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => handleClose(timeMenu)}>
                        <MenuItem onClick={() => handleClose('Today')}>Today</MenuItem>
                        <MenuItem onClick={() => handleClose('This Week')}>This Week</MenuItem>
                        <MenuItem onClick={() => handleClose('This Month')}>This Month</MenuItem>
                        <MenuItem onClick={() => handleClose('All Time')}>All Time</MenuItem>
                    </Menu>
                </div>
            </Card>
        </div>
    );
}

export default NumericCard;
