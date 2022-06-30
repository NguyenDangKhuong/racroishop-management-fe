import { ReactNode } from 'react'
import Header from '../Header'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

interface IWrapperProps {
  children?: ReactNode
}

const Layout = ({ children }: IWrapperProps) => {
  return (
    <>
      <Sidebar />
      <div className="md:ml-64 bg-slate-800">
        <Navbar />
        <Header />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  )
}

export default Layout
