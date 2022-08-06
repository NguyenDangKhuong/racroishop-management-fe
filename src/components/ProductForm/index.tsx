const ProductForm = () => {
  return (
    <>
      <div className='w-full lg:w-12/12 px-4'>
        <div className='relative w-full mb-3'>
          <label
            className='block uppercase text-gray-600 text-xs font-bold mb-2'
            htmlFor='grid-password'>
            Address
          </label>
          <input
            type='text'
            className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
            defaultValue='Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09'
          />
        </div>
      </div>
    </>
  )
}

export default ProductForm
