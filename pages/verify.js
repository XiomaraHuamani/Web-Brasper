import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Reemplaza useNavigate con useRouter de Next.js
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter(); // Usa useRouter para la navegación en Next.js

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp) {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-email/`, { otp });
        const resp = res.data;
        if (res.status === 200) {
          router.push('/login'); // Reemplaza navigate con router.push
          toast.success(resp.message);
        }
      } catch (error) {
        console.error("Error verifying OTP", error);
        toast.error("Failed to verify OTP");
      }
    }
  };

  return (
    <div>
      <div className='form-container'>
        <form style={{ width: "30%" }} onSubmit={handleOtpSubmit}>
          <div className='form-group'>
            <label htmlFor="">Enter your OTP code:</label>
            <input
              type="text"
              className='email-form'
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button type='submit' className='vbtn'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;