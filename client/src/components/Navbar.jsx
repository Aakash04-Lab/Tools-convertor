import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar(){
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const signout = () => { logout(); navigate('/'); };
  return <nav className="nav">
    <Link className="brand" to="/">Use-Full Tools</Link>
    <div>
      {token ? <><Link to="/dashboard">Dashboard</Link><button onClick={signout}>Logout</button></> : <><Link to="/login">Login</Link><Link className="btn" to="/signup">Sign up</Link></>}
    </div>
  </nav>
}
