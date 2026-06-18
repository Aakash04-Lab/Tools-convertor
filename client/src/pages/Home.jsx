import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function Home(){
  return <><Navbar/><main className="hero">
    <div className="hero-copy">
      <p className="badge">All-in-one file tools</p>
      <h1>Convert, compress, and remove backgrounds in seconds.</h1>
      <p className="subtitle">A clean online workspace for fast PDF and image tools.</p>
      <Link className="bigBtn" to="/signup">Start Free</Link>
    </div>
    <div className="hero-preview">
      <div className="preview-card">
        <img src="/images/preview-card-sky.jpg" alt="Online file tools preview" />
      </div>
    </div>
    <p className="home-seo-copy">All-in-one free online tools website for PDF conversion, JPG conversion, image compression, and background removal. Easily convert PDF to JPG, JPG to PDF, compress images without losing quality, and remove image backgrounds instantly. Fast, secure, and user-friendly online converter tools for students, professionals, designers, and businesses. No software installation required. Convert, compress, and edit your files online for free with high-quality results.</p>
  </main></>
}
