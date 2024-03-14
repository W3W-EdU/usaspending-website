import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const CustomTick = (props) => {
    const {
        x, y, payload, link
    } = props;
    return (
        <g transform={`translate(${x},${y})`} >
            <a href={`${link[payload.index].link}`}>
                <text x={0} y={0} dy={0} textAnchor="end" fill="#666" fontSize={12} >
                    {payload.value}
                </text>
            </a>
        </g>);
};

const SpendingByCategoriesChart = (props) => {
    const dataStuff = [];
    if (props.dataSeries?.length === props.labelSeries?.length) {
        for (let i = 0; i < props.dataSeries.length; i++) {
            dataStuff.push({
                value: props.dataSeries[i],
                label: props.labelSeries[i],
                desc: props.descriptions[i],
                link: props.linkSeries[i]
            });
        }
    }

    return (
        <div className="recharts-time-visualization-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={dataStuff}
                    layout="vertical"
                    barSize={21}
                    barCategoryGap={10}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 200,
                        bottom: 10
                    }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="label" tick={<CustomTick link={dataStuff} />} fontSize="12px" link="link" />
                    <Bar dataKey="value" fill="#07648d" activeBar={false} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingByCategoriesChart;

