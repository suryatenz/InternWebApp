import React from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom'    
import ProductHeader from '../components/ProductHeader'
import ProductVariants from './ProductVariants'
import ProductInformationLayout from './ProductInformationLayout'
export default function ProductVariantLayout() {
    const location = useLocation();
    const path=location.pathname;
    console.log(path);
  return (
    <div className="pr-4 mr-4  pl-4  max-h-screen ">
       <ProductHeader />
        {path=='/search/ProductVariants' &&  <ProductVariants /> }
      <Routes>
             <Route path="ProductInfo/*" element={<ProductInformationLayout />} />
      </Routes> 
    </div>
  )
}
