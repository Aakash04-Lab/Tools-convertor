import { useState } from 'react';
import api from '../api/api.js';
import Navbar from '../components/Navbar.jsx';
import PasswordInput from '../components/PasswordInput.jsx';

export default function ForgotPassword(){
  const [step,setStep]=useState(1); const [email,setEmail]=useState(''); const [otp,setOtp]=useState(''); const [newPassword,setNewPassword]=useState(''); const [msg,setMsg]=useState(''); const [error,setError]=useState('');
  const sendOtp=async(e)=>{e.preventDefault();setError('');try{const {data}=await api.post('/auth/forgot-password',{email});setMsg(data.message);setStep(2)}catch(err){setError(err.response?.data?.message||err.message)}};
  const reset=async(e)=>{e.preventDefault();setError('');try{const {data}=await api.post('/auth/reset-password',{email,otp,newPassword});setMsg(data.message)}catch(err){setError(err.response?.data?.message||err.message)}};
  return <><Navbar/><main className="auth-page"><section className="auth-shell compact-auth">
    <div className="auth-image">
      <img src="/images/reset-art.jpg" alt="Reset password artwork" />
    </div>
    <div className="auth-panel">
      <p className="mini-brand">USE-FULL TOOLS</p>
      <h2>RESET PASSWORD</h2>
      <p className="auth-copy">{step===1?'Enter your account email and we will send an OTP.':'Enter the OTP and choose your new password.'}</p>
      {step===1?<form onSubmit={sendOtp}>
        <label>Email<input placeholder="Enter your email" type="email" onChange={e=>setEmail(e.target.value)}/></label>
        <button>Send OTP</button>
      </form>:<form onSubmit={reset}>
        <label>OTP<input placeholder="Enter OTP" onChange={e=>setOtp(e.target.value)}/></label>
        <label>New Password<PasswordInput placeholder="New password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} autoComplete="new-password" /></label>
        <button>Reset Password</button>
      </form>}
      {msg&&<p className="success">{msg}</p>}{error&&<p className="error">{error}</p>}
    </div>
  </section></main></>
}
