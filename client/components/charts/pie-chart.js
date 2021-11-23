import { Card, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const colors = ['#ae24bd', '#f76d70', '#04c3e9', '#0990d4', '#0973d4'];

function PieChart({ data, theme, title }) {
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
                <ResponsivePie
                    data={data}
                    theme={theme}
                    margin={{ top: 40, right: 100, bottom: 80, left: 100 }}
                    valueFormat=" >-1.1%"
                    sortByValue={true}
                    activeOuterRadiusOffset={8}
                    colors={colors}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#FFFFFF"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor="#ffffff"
                />
            </Card>
        </>
    );
}

PieChart.propTypes = {
    data: PropTypes.array,
    theme: PropTypes.object,
    title: PropTypes.string
};

export default PieChart;
