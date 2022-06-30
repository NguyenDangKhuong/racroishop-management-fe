import { createPopper } from '@popperjs/core'
import { createRef, useState } from 'react'

const NotificationDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false)
  const btnDropdownRef: any = createRef()
  const popoverDropdownRef: any = createRef()
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start'
    })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }
  return (
    <>
      <a
        className='text-gray-500 block py-1 px-3'
        href='#'
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault()
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}>
        <i className='fas fa-bell'></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }>
        <a
          href='#'
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700'
          }
          onClick={e => e.preventDefault()}>
          Action
        </a>
        <a
          href='#'
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700'
          }
          onClick={e => e.preventDefault()}>
          Another action
        </a>
        <a
          href='#'
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700'
          }
          onClick={e => e.preventDefault()}>
          Something else here
        </a>
        <div className='h-0 my-2 border border-solid border-gray-100' />
        <a
          href='#'
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700'
          }
          onClick={e => e.preventDefault()}>
          Seprated link
        </a>
      </div>
    </>
  )
}

export default NotificationDropdown
