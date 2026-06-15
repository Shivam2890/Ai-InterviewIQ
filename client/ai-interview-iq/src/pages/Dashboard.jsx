import React from 'react'
import TechnicalScoreChart from '../components/TechnicalScoreChart'
import SkillsChart from '../components/SkillsChart'
import InterviewHistoryTable from '../components/InterviewHistoryTable'

const Dashboard = () => {
    return (
        <div className='h-screen flex flex-col justify-between'>
            {/* Charts */}
            <div className='flex border-2 h-full'>
                <TechnicalScoreChart />
                <SkillsChart />
            </div>

            {/* Tables */}
            <div className='border-2 h-full'>
                <InterviewHistoryTable />
            </div>
        </div>
    )
}

export default Dashboard