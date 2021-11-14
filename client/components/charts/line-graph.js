import { Card, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveLine } from '@nivo/line';

function LineGraph({ data, theme, title, yAxis }) {
    return (
        <>
            <Card
                style={{
                    maxWidth: '500px',
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

                <ResponsiveLine
                    data={data}
                    theme={theme}
                    margin={{ top: 30, right: 60, bottom: 100, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Date',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: yAxis,
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    lineWidth={3}
                    colors={['#864AD3']}
                    curve="catmullRom"
                    enableCrosshair={false}
                    enablePointLabel={true}
                    enableSlices={'x'}
                    pointSize={12}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={3}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                />
            </Card>
        </>
    );
}

LineGraph.propTypes = {
    data: PropTypes.array,
    theme: PropTypes.object,
    title: PropTypes.string,
    yAxis: PropTypes.string
};

export default LineGraph;
