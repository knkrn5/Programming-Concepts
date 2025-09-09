// import { IoMdMenu, IoMdClose } from 'react-icons/io';
// import { Outlet } from 'react-router';
// import { useEffect, useState } from 'react';

// function AdminLayout() {
//   const [isOpenMenu, setIsOpenMenu] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     function handleResize() {
//       setIsSmallScreen(window.innerWidth < 768);
//       setIsOpenMenu(false);
//     }

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div
//       className={`grid ${
//         isOpenMenu ? 'md:grid-cols-[250px_1fr]' : 'md:grid-cols-[55px_1fr]'
//       } transition-all duration-500   h-screen bg-indigo-100`}
//     >
//       {/* Left Column */}
//       <div
//         className={` bg-gray-500 text-black overflow-auto transition-all ${
//           isSmallScreen
//             ? `fixed h-full top-0  max-md:w-70  z-10 transform ${
//                 isOpenMenu ? 'translate-x-0 duration-500' : '-translate-x-full duration-500'
//               } `
//             : ''
//         }  `}
//       >
//         {/* menu bar */}
//         <div
//           className="absolute z-20 w-fit m-1 p-2 rounded-2xl bg-black text-white hover:bg-gray-700 duration-300 cursor-pointer"
//           onClick={() => setIsOpenMenu(!isOpenMenu)}
//         >
//           {!isOpenMenu ? <IoMdMenu size={32} /> : <IoMdClose size={32} />}
//         </div>
//         <p className=" mt-15">sidebar</p>
//       </div>

//       {/* Main content area with header, content, and footer */}
//       <div className="grid grid-rows-[auto_1fr_auto] h-full  ">
//         <div className=" bg-blue-500 text-white">
//           {!isOpenMenu && isSmallScreen && (
//             <div
//               className="absolute z-20 w-fit m-1 p-2 rounded-2xl bg-black text-white hover:bg-gray-700 duration-300 cursor-pointer"
//               onClick={() => setIsOpenMenu(!isOpenMenu)}
//             >
//               {!isOpenMenu ? <IoMdMenu size={32} /> : <IoMdClose size={32} />}
//             </div>
//           )}
//           Header
//         </div>
//         {/* Main Content */}
//         <div className="bg-yellow-500  overflow-auto">
//           <Outlet />
//         </div>

//         {/* Footer */}
//         <div className="bg-green-500 text-white ">Footer</div>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;
