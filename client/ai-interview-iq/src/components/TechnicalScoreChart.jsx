import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TechnicalScoreChart = () => {
    const data = [
        {
            interview: 'Interview-1',
            techincalScore: 5,
            date: '04/06/2026'
        },
        {
            interview: 'Interview-2',
            techincalScore: 6.5,
            date: '07/06/2026'
        },
        {
            interview: 'Interview-3',
            techincalScore: 4.2,
            date: '10/06/2026'
        },
        {
            interview: 'Interview-4',
            techincalScore: 8,
            date: '13/06/2026'
        },
        {
            interview: 'Interview-5',
            techincalScore: 8.7,
            date: '26/06/2026'
        },
    ]
    return (
        <div className='p-8'>
            {/* <ResponsiveContainer width='100%' aspect={1.618} maxHeight={500}> */}

            <LineChart
                style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis width="auto" domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]} label={{value:'Technical Score', angle:-90, position:'insideLeft    '}} />
                <Tooltip />
                <Legend />
                <Line
                    type="bump"
                    dataKey="techincalScore"
                    name='Techincal Score Report'
                    // stroke="var(--color-chart-1)"
                    // dot={{
                    //     fill: 'var(--color-surface-base)',
                    // }}
                    activeDot={{ r: 5 }}
                />
                {/* <RechartsDevtools /> */}
            </LineChart>

            {/* </ResponsiveContainer> */}
        </div>
    )
}

export default TechnicalScoreChart