import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import PasswordInput from '../components/PasswordInput.jsx';

export default function Login(){
  const [form,setForm]=useState({email:'',password:''}); const [error,setError]=useState('');
  const { setAuth } = useAuth(); const navigate=useNavigate();
  const submit=async(e)=>{e.preventDefault();setError('');try{const {data}=await api.post('/auth/login',form);setAuth(data);navigate('/dashboard')}catch(err){setError(err.response?.data?.message||err.message)}};
  return <><Navbar/><main className="auth-page"><section className="auth-shell">
    <div className="auth-image">
      <img src="/images/login-art.jpg" alt="Login artwork" />
    </div>
    <div className="auth-panel">
      <p className="mini-brand">USE-FULL TOOLS</p>
      <h2>WELCOME BACK</h2>
      <p className="auth-copy">Enter your email and password to access your account.</p>
      <form onSubmit={submit}>
        <label>Email<input placeholder="Enter your email" type="email" onChange={e=>setForm({...form,email:e.target.value})}/></label>
        <label>Password<PasswordInput placeholder="Enter your password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} autoComplete="current-password" /></label>
        <div className="form-row"><label className="check-row"><input type="checkbox"/>Remember me</label><Link to="/forgot-password">Forgot Password</Link></div>
        <button>Login</button>
      </form>
      {error&&<p className="error">{error}</p>}
      <p className="auth-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  </section></main></>
}
