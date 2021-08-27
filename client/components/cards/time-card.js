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
import PropTypes from 'prop-types';

const getHrs = mins => Math.floor(mins / 60);

const getMins = mins => mins % 60;

function TimeCard({ styles, data }) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [timeMenu, setTimeMenu] = useState('Today');

    const signBool = data.percent >= 0;
    const sign = signBool ? '+' : '-';

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
                        Average Visit
                    </Typography>
                    <div className={classes.headingText}>
                        <Typography component="span" variant="h4" className={classes.headingText}>
                            {getHrs(data.avgLengthMins)}
                        </Typography>
                        <Typography component="span" variant="body2">
                            {'HRS '}
                        </Typography>
                        <Typography component="span" variant="h4" className={classes.headingText}>
                            {getMins(data.avgLengthMins)}
                        </Typography>
                        <Typography component="span" variant="body2">
                            {'MINS'}
                        </Typography>
                    </div>

                    <div>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            className={signBool ? classes.detailPositive : classes.detailNegative}>
                            {sign + data.percent + '%'}
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

TimeCard.propTypes = {
    styles: PropTypes.object,
    data: PropTypes.object
};

export default TimeCard;
