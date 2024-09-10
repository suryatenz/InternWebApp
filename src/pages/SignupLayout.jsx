import React from 'react';
import ForgotHeader from '../components/forgotHeader';
import { Routes, Route } from 'react-router-dom';
import SignupEmail from './SignupEmail';
import SignupOtp from './SignupOtp';
import SignupPassword from './SignupPassword';
import "../index.css";

export default function SignupLayout() {
  return (
    <div className=' imaga bg-neutral-900 min-h-screen min-w-screen overflow-auto'>
      <ForgotHeader />
      <Routes>
        <Route index element={<SignupEmail />} />
        <Route path="verifyOtp" element={<SignupOtp />} />
        <Route path="verifyOtp/verifyPassword" element={<SignupPassword />} />
      </Routes>
    </div>
  );
}