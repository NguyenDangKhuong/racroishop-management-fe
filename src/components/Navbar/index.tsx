import React from 'react'
import UserDropdown from '../Dropdowns/UserDropdown'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4'>
      <div className='w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4'>
        {/* Brand */}
        <a
          className='text-white text-sm uppercase hidden lg:inline-block font-semibold'
          href='#'
          onClick={e => e.preventDefault()}>
          Dashboard
        </a>
        {/* User */}
        <ul className='flex-col md:flex-row list-none items-center hidden md:flex'>
          <UserDropdown />
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
