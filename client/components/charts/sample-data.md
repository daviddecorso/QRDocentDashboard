# Mock Data for Charts

This file describes the data shape for charts used on the analytics page.

Graph library used is Nivo.js. Documentation can be found at https://nivo.rocks/

### Total Scans Chart

The x-axis represents the date and the y-axis repesentes total scans:

```
const mockTotalScansData = [
    {
        id: 'Scans',
        color: 'hsl(172, 70%, 50%)',
        data: [
            { x: '14', y: '912' },
            { x: '15', y: '712' },
            { x: '16', y: '200' },
            { x: '17', y: '788' },
            { x: '18', y: '600' },
            { x: '19', y: '722' },
            { x: '20', y: '650' }
        ]
    }
];
```

### Pie Chart

Value reperesnts percent of total scans. Alternatively, the value could represent number of scans (and the graph would still show percentages).

```
const scansPieData = [
    {
        id: 'Aretha Franklin',
        label: 'Aretha Franklin',
        value: 73.2
    },
    {
        id: 'James Brown',
        label: 'James Brown',
        value: 26.8
    }
];
```

### Average Time Chart

Data for average time spent in musuem over time line graph. x-axis represents date and y-axis represents time in minutes between a user's first and last scans.

```
const avgTimeData = [
    {
        id: 'Average Time',
        color: 'hsl(172, 70%, 50%)',
        data: [
            { x: '14', y: '1.52' },
            { x: '15', y: '2.64' },
            { x: '16', y: '2.01' },
            { x: '17', y: '2.22' },
            { x: '18', y: '1.96' },
            { x: '19', y: '1.07' },
            { x: '20', y: '2.11' }
        ]
    }
];
```

### Rank chart

Data for exhibit ranking bump chart. x-axis is date, y-axis is rank.

```
const rankingData = [
    {
        id: 'Aretha Franklin',
        data: [
            { x: '14', y: '1' },
            { x: '15', y: '1' },
            { x: '16', y: '1' },
            { x: '17', y: '2' },
            { x: '18', y: '1' },
            { x: '19', y: '2' },
            { x: '20', y: '3' }
        ]
    },
    {
        id: 'James Brown',
        data: [
            { x: '14', y: '2' },
            { x: '15', y: '2' },
            { x: '16', y: '2' },
            { x: '17', y: '3' },
            { x: '18', y: '2' },
            { x: '19', y: '3' },
            { x: '20', y: '2' }
        ]
    },
    {
        id: 'Exhibit 3',
        data: [
            { x: '14', y: '3' },
            { x: '15', y: '3' },
            { x: '16', y: '3' },
            { x: '17', y: '1' },
            { x: '18', y: '3' },
            { x: '19', y: '1' },
            { x: '20', y: '1' }
        ]
    }
];
```
