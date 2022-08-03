// import Image from 'next/image'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useState } from 'react'
// import { Category } from '../../models/Category'
// import { get, put, remove } from '../../utils/api'
// import { currencyFormat } from '../../utils/currencyFormat'
// import BarcodeModal from '../BarcodeModal'
// import CategoryModal from '../CategoryModal'

// export const initialCategory = {
//   name: '',
//   price: 0,
//   sku: '',
//   quantity: 0,
//   _id: '',
//   image: ''
// }

const CategoryTable = ({ color = 'light' }: { color?: string }) => {
//   const [showModal, setShowModal] = useState(false)
//   const [barcodeValue, setBarcodeValue] = useState('')
//   const [showBarcodeModal, setShowBarcodeModal] = useState(false)
//   const [editingCategory, setEditingCategory] = useState<Category>(initialCategory)

//   const queryClient = useQueryClient()

//   const mutationDelCategory = useMutation(
//     (_id: string) => remove(`/api/category/${_id}`),
//     {
//       onSuccess: () => {
//         queryClient.refetchQueries(['fetchCategorys'])
//       }
//     }
//   )

//   const { isLoading, isError, isSuccess, data } = useQuery(
//     ['fetchCategorys'],
//     () => get(`/api/categorys/`)
//   )

//   const mutationPutCategory = useMutation(
//     (updatedCategory: Category) => put('/api/category', updatedCategory),
//     {
//       onSuccess: () => {
//         queryClient.refetchQueries(['fetchCategorys'])
//       }
//     }
//   )

//   const renderResult = () => {
//     if (isLoading) {
//       return (
//         <div className='text-center'>
//           <i className='fas fa-spinner fa-spin animate-spin text-xl mr-2'></i>
//           Đang tải...
//         </div>
//       )
//     }
//     if (isError) {
//       return (
//         <div className='text-center text-red-500'>
//           Đã xảy ra lỗi, vui lòng liên hệ Khương
//         </div>
//       )
//     }
//     if (isSuccess) {
//       return (
//         <table className='items-center w-full bg-transparent border-collapse'>
//           <thead>
//             <tr>
//               <th
//                 className={
//                   'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
//                   (color === 'light'
//                     ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
//                     : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
//                 }>
//                 Tên
//               </th>
//               <th
//                 className={
//                   'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
//                   (color === 'light'
//                     ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
//                     : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
//                 }>
//                 Sửa/Xóa
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.data.categorys.map((item: Category) => (
//               <tr key={item._id} className='border-t'>
//                 <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
//                   <Image
//                     className='h-24'
//                     src='/image/product-placeholder.png'
//                     width={100}
//                     height={100}
//                     alt=''
//                   />
//                 </td>
//                 <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
//                   <span>{item.name}</span>
//                 </td>
//                 <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
//                   {currencyFormat(item.price)}
//                 </td>
//                 <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
//                   <i
//                     className='fas fa-minus text-lg text-emerald-500 cursor-pointer'
//                     onClick={() =>
//                       mutationPutCategory.mutate({
//                         ...item,
//                         quantity: item.quantity - 1
//                       })
//                     }></i>
//                   <input
//                     type='number'
//                     className='mx-2 px-2 py-1 bg-whiterounded text-sm shadow outline-none focus:outline-none focus:shadow-outline border w-16'
//                     value={item.quantity}
//                     onChange={()=>{}}
//                   />
//                   <i
//                     className='fas fa-plus text-lg text-emerald-500  cursor-pointer'
//                     onClick={() =>
//                       mutationPutCategory.mutate({
//                         ...item,
//                         quantity: item.quantity + 1
//                       })
//                     }></i>
//                 </td>
//                 <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
//                   {item.categoryId}
//                 </td>
//                 <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
//                   <div
//                     className='flex items-center text-blue-500 font-bold cursor-pointer'
//                     onClick={() => {
//                       setBarcodeValue(item.sku)
//                       setShowBarcodeModal(true)
//                     }}>
//                     {item.sku}
//                   </div>
//                 </td>
//                 <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
//                   <i
//                     className='fas fa-edit text-lg text-emerald-500 mr-4 cursor-pointer'
//                     onClick={() => {
//                       setEditingCategory(item)
//                       setShowModal(true)
//                     }}></i>
//                   <i
//                     className='fas fa-close text-lg text-emerald-500 mr-2 cursor-pointer'
//                     onClick={() => mutationDelCategory.mutate(item._id)}></i>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )
//     }
//     return <></>
//   }

//   return (
//     <div
//       className={
//         'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg border rounded ' +
//         (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
//       }>
//       <div className='rounded-t mb-0 px-4 py-3 border-0'>
//         <div className='flex flex-wrap items-center'>
//           <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
//             <h3
//               className={
//                 'font-semibold text-lg ' +
//                 (color === 'light' ? 'text-blueGray-700' : 'text-white')
//               }>
//               Danh sách sản phẩm
//             </h3>
//           </div>
//           <span className='cursor-pointer' onClick={() => setShowModal(true)}>
//             <i className='fas fa-plus text-lg text-emerald-500 mr-4'></i>Thêm
//             Sản Phẩm
//           </span>
//         </div>
//       </div>
//       <div className='block w-full overflow-x-auto'>
//         {/* Categorys table */}
//         {renderResult()}
//       </div>
//       <CategoryModal
//         showModal={showModal}
//         setShowModal={(val: boolean) => setShowModal(val)}
//         editingCategory={editingCategory}
//         setEditingCategory={(val: any) => setEditingCategory(val)}
//       />
//       <BarcodeModal
//         barcodeValue={barcodeValue}
//         showBarcodeModal={showBarcodeModal}
//         setShowBarcodeModal={(val: boolean) => setShowBarcodeModal(val)}
//       />
//     </div>
//   )
}

export default CategoryTable
