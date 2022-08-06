import { createPopper } from '@popperjs/core'

const Popovers = ({
  popoverShow,
  popoverRef
}: {
  popoverShow: boolean
  popoverRef: any
}) => {
  return (
    <div
      className={
        (popoverShow ? '' : 'hidden ') +
        'bg-gray-600 border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
      }
      ref={popoverRef}>
      <div>
        <div className='bg-gray-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-100 uppercase rounded-t-lg'>
          gray popover title
        </div>
        <div className='text-white p-3'>
          {`And here's some amazing content. It's very engaging. Right?`}
        </div>
      </div>
    </div>
  )
}

export default Popovers
