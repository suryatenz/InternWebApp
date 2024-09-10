import ForgotHeader from '../components/forgotHeader'
import { Routes, Route } from 'react-router-dom';
import ForgotEmail from './ForgotEmail';
import ForgotOtp from './ForgotOtp';
import SetPassword from './SetPassword';
import "../index.css";

export default function Forgotlayout() {
  return (
    <div className='imaga bg-neutral-900 min-h-screen min-w-screen overflow-auto'>
    <ForgotHeader />
    <Routes>
      <Route index element={<ForgotEmail />} />
      <Route path="verifyotp" element={<ForgotOtp />} />
      <Route path="setpassword" element={<SetPassword />} />
    </Routes>
  </div>
  )
}
