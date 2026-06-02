import React from 'react'

const PopUp = ({ setIsEditEnabled, RenderComponent }) => {
    if (!RenderComponent) return null
    return (
        <div className=' absolute h-[400px] shadow-2xl flex bg-white left-[25%] w-[400px]'>
            <div className='w-full'>
                <div className='flex justify-end'>
                    <button onClick={() => setIsEditEnabled(false)}>Close</button>
                </div>
                {/* <RenderComponent /> */}
                <RenderComponent />
            </div>
        </div>
    )
}

export default PopUp