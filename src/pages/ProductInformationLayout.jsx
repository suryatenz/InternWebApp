import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductModelSidebar from "../components/ProductModelSidebar";
import OutsideShowcase from "../components/OutsideShowcase";
import TeardownShowcase from "../components/TeardownShowcase";
import Specifications from "../components/Specifications";
import KeyNotes from "../components/KeyNotes";
import Review from "../components/Review";
import CompanyProfile from "../components/CompanyProfile";
import Performance from "../components/Performance";
import Experience from "../components/Experience";
import Safety from "../components/Safety";
import Warranty from "../components/Warranty";
import Seller from "../components/Seller";
import Accessories from "../components/Accessories";
import Services from "../components/Services";
import PrePurchase from "../components/Pre-Purchase";
import PostPurchase from "../components/Post-Purchase";
export default function ProductInformationLayout() {
  return (
    <div className="mx-3 mb-3 rounded-md border border-neutral-800 border-t-0 border-l-0 rounded-t-none bg-neutral-900 flex" style={{ height: "77vh" }}>
      <div
        className="mr-5 overflow-y-auto scrollbar-hide scroll-smooth w-1/4 "
      >
        <ProductModelSidebar />
      </div>
      <div
        className="flex w-4/5 overflow-y-auto scrollbar-nav scroll-smooth mr-4 my-4"
      >
        <Routes>
          <Route path="OutsideShowcase" element={<OutsideShowcase />} />
          <Route path="TeardownShowcase" element={<TeardownShowcase />} />
          <Route path="Specifications/*" element={<Specifications />} />
          <Route path="KeyNotes" element={<KeyNotes />} />
          <Route path="Review" element={<Review />} />
          <Route path="CompanyProfile" element={<CompanyProfile />} />
          <Route path="Performance" element={<Performance />} />
          <Route path="Experience" element={<Experience />} />
          <Route path="Safety" element={<Safety />} />
          <Route path="Pre-Purchase" element={<PrePurchase />} />
          <Route path="Post-Purchase" element={<PostPurchase />} />
          <Route path="Warranty" element={<Warranty />} />
          <Route path="Seller" element={<Seller />} />
          <Route path="Accessories" element={<Accessories />} />
          <Route path="Services" element={<Services />} />
        </Routes>
      </div>
    </div>
  );
}
