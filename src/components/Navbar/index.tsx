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
        {/* Form */}
        <form className='md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3'>
          <div className='relative flex w-full flex-wrap items-stretch'>
            <span className='z-10 h-full leading-snug font-normal absolute text-center text-gray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
              <i className='fas fa-search'></i>
            </span>
            <input
              type='text'
              placeholder='Search here...'
              className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10'
            />
          </div>
        </form>
        {/* User */}
        <ul className='flex-col md:flex-row list-none items-center hidden md:flex'>
          <UserDropdown />
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
