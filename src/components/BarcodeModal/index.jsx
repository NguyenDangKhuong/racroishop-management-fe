import { useRef } from 'react'
import Barcode from 'react-barcode'
import { useReactToPrint } from 'react-to-print'

const BarcodeModal = ({
  barcodeValue,
  showBarcodeModal,
  setShowBarcodeModal,
  productQuantity
}) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true
  })
  return showBarcodeModal ? (
    <>
      <div
        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
        onClick={() => setShowBarcodeModal(false)}>
        <div className='relative w-auto my-6 mx-auto max-w-sm'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>Barcode</h3>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => setShowBarcodeModal(false)}>
                <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div ref={componentRef} className='grid grid-cols-2 gap-x-0.5 gap-y-2 text-center m-auto'>
              {Array.from(Array(productQuantity), (_, i) => (
                <Barcode
                  width={1}
                  height={30}
                  fontSize={12}
                  value={barcodeValue}
                />
              ))}
            </div>
            {/*footer*/}
            <div className='flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b'>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowBarcodeModal(false)}>
                Đóng
              </button>
              <button
                className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => {
                  setShowBarcodeModal(false)
                  handlePrint()
                }}>
                In mã
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  ) : null
}

export default BarcodeModal
