import React from 'react'
import SideBar from '../components/SideBar'
import {Routes,Route } from 'react-router'
import Header from '../components/Header'
import Home from './Home';
import AddProduct from './AddProduct';
import ProductVariantLayout from './ProductVariantLayout';
export default function () {
  return (
    <div className='bg-black flex flex-row h-screen w-screen overflow-y-auto '>
        <SideBar />
    <div className='flex-auto text-white'>
        <div className=''>  <Header />  </div>
        <div className=' scroll-smooth '>
        <Routes>
            <Route  index element={<Home />} />
            <Route path="AddProduct" element={<AddProduct />} />
            <Route path="ProductVariants/*" element={<ProductVariantLayout />} />
          </Routes>
        </div>
        </div>
    </div>
  )
}