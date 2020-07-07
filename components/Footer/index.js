import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-700 p-4'>
            <div className='container mx-auto text-center font-bold text-white'>
                Projeto desenvolvido por Gabriel Koch Fodi / 
                <a className='hover:underline' href='https://github.com/gabrikf'>GitHub</a>
                <div className='mt-2    '>
                <img className='inline p-4'src='/logo_semana_fsm 1.png'/>
                <img className='inline p-4'src='/logo_devpleno 1.png'/>
                </div>
            </div>

        </div>
    )
}

export default Footer