import { Card, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBump } from '@nivo/bump';

const colors = ['#ae24bd', '#f76d70', '#04c3e9', '#0990d4', '#0973d4'];

function BumpChart({ data, theme, title }) {
    return (
        <>
            <Card
                style={{
                    maxWidth: '700px',
                    width: '100vw',
                    height: '450px',
                    borderRadius: '20px',
                    backgroundColor: '#2F333C',
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'black'
                }}>
                <Typography
                    component="h3"
                    variant="h5"
                    style={{ margin: 0, paddingTop: '10px', color: 'white', textAlign: 'center' }}>
                    {title}
                </Typography>
                <ResponsiveBump
                    data={data}
                    theme={theme}
                    margin={{ top: 30, right: 100, bottom: 100, left: 60 }}
                    colors={colors}
                    lineWidth={3}
                    activeLineWidth={6}
                    inactiveLineWidth={3}
                    inactiveOpacity={0.15}
                    pointSize={12}
                    activePointSize={16}
                    inactivePointSize={0}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={3}
                    activePointBorderWidth={3}
                    pointBorderColor={{ from: 'serie.color' }}
                    axisTop={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: -36
                    }}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'ranking',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                />
            </Card>
        </>
    );
}

BumpChart.propTypes = {
    data: PropTypes.object,
    theme: PropTypes.object,
    title: PropTypes.string
};

export default BumpChart;
