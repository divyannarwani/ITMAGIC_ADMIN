import React from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom';
import Dropdown from './Dropdown'
import BASE_URL from '../constant.js'

// icons import
import { AiFillProduct } from "react-icons/ai";


function Sidebar() {

    
    

    const options = [
        { text: 'option 1' },
        { text: 'option 2' },
        { text: 'option 3' },
        { text: 'option 4' },
      ]

    const navButtons = [
        { text: "Home Page Logo", to: "/", iconLink: <div className="text-2xl"><AiFillProduct /></div>, notification: false },
        { text: "Products", to: "/Products", iconLink: <div className="text-2xl"><AiFillProduct /></div>, notification: false },
        { text: "Client category", to: "/Client-category", iconLink: <div className="text-2xl"><AiFillProduct /></div>, notification: false },
        { text: "Clients", to: "/Clients", iconLink: <div className="text-2xl"><AiFillProduct /></div>, notification: false },
        { text: "PopUp", to: "/Popup", iconLink: <div className="text-2xl"><AiFillProduct /></div>, notification: false },
    ]

  return (
    <> 
        <div className='flex flex-row bg-clip-border bg-white text-gray-700 h-[10vh] w-full p-4 shadow-2xl shadow-blue-gray-900/5'>
            <div className='flex justify-between items-center w-full'>
                <div className="p-4 justify-start">
                    <h5 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-gray-900">DASHBOARD</h5>
                </div>
                {/* <div className='flex justify-between items-center px-1'>
                    <Dropdown options={options} buttonName={<img className='w-8 h-8 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />} />
                </div> */}
            </div>
        </div>

        <div className='flex justify-start'>
            <div className="relative top-0 left-0 py-0 flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[17rem] p-4 shadow-2xl shadow-blue-gray-900/5">
                <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">

                    {navButtons.map((Buttons, index) => (
                        <NavLink to={Buttons.to} key={index} role="button" tabIndex="0" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                            <div className="grid place-items-center mr-4">
                                {Buttons.iconLink}
                            </div>
                            {Buttons.text}
                            {Buttons.notification && (
                                <div className="grid place-items-center ml-auto justify-self-end">
                                    <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full" style={{opacity: 1}}>
                                        <span className="">14</span>
                                    </div>
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>
            
            <div className='relative px-8 py-4 w-full h-full'>
                <Outlet />  
            </div>
        </div>

    </>
  )
}

export default Sidebar