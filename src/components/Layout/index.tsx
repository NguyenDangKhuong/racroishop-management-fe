import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

interface IWrapperProps {
  children?: ReactNode
}

const Layout = ({ children }: IWrapperProps) => {
  return (
    <>
      <Sidebar />
      <div className='md:ml-64'>
        <Navbar />
        <div className='px-4 md:px-10 mx-auto w-full -m-24 pt-20 md:pt-32 select-none'>
          {children}
        </div>
        <ToastContainer
          position='top-right'
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Footer />
      </div>
    </>
  )
}

export default Layout
