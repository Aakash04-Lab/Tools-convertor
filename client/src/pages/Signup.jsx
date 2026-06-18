import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import PasswordInput from '../components/PasswordInput.jsx';

export default function Signup(){
  const [form,setForm]=useState({name:'',email:'',password:''}); const [error,setError]=useState('');
  const { setAuth } = useAuth(); const navigate=useNavigate();
  const submit=async(e)=>{e.preventDefault();setError('');try{const {data}=await api.post('/auth/signup',form);setAuth(data);navigate('/dashboard')}catch(err){setError(err.response?.data?.message||err.message)}};
  return <><Navbar/><main className="auth-page"><section className="auth-shell">
    <div className="auth-image">
      <img src="/images/signup-art.jpg" alt="Signup artwork" />
    </div>
    <div className="auth-panel">
      <p className="mini-brand">USE-FULL TOOLS</p>
      <h2>CREATE ACCOUNT</h2>
      <p className="auth-copy">Start converting files with a clean, secure workspace.</p>
      <form onSubmit={submit}>
        <label>Name<input placeholder="Enter your name" onChange={e=>setForm({...form,name:e.target.value})}/></label>
        <label>Email<input placeholder="Enter your email" type="email" onChange={e=>setForm({...form,email:e.target.value})}/></label>
        <label>Password<PasswordInput placeholder="Create a password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} autoComplete="new-password" /></label>
        <button>Sign Up</button>
      </form>
      {error&&<p className="error">{error}</p>}
      <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  </section></main></>
}
