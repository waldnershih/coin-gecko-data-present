import React from 'react';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const BasicLineChart = ({ data }) => {
	return (
		<ResponsiveContainer width="99%" aspect={1.5}>
			<LineChart
				width={300}
				height={100}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" horizontal="true" vertical="" />
				<XAxis dataKey="date" minTickGap={60} />
				<YAxis
					domain={['auto', 'auto']}
					tickFormatter={value => {
						if (!value) return '';
						return `$${value.toLocaleString(undefined, {
							minimumFractionDigits: 2,
						})}`;
					}}
				/>
				<Legend />
				<Tooltip
					wrapperStyle={{
						borderColor: 'white',
						boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
					}}
					contentStyle={{
						backgroundColor: 'rgba(255, 255, 255, 0.8)',
					}}
					labelStyle={{
						fontWeight: 'bold',
						color: '#666666',
					}}
					formatter={value => {
						if (!value) return '';
						return [`$${parseInt(value)?.toFixed(2)}`, 'Price'];
					}}
					labelFormatter={(value, props) => {
						// get empty array when clicking border of chart
						if (props.length === 0) return;
						return props[0].payload.label;
					}}
				/>
				<Line
					dataKey="price"
					type="monotone"
					stroke="#2196f3"
					dot={false}
					activeDot={{ r: 6 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default BasicLineChart;
