import Navbar from '../components/Navbar.jsx';
import ToolCard from '../components/ToolCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard(){
  const { user } = useAuth();
  return <><Navbar/><main className="dashboard">
    <section className="dash-head">
      <p>Welcome, {user?.name}</p>
      <h1>Your Tools Dashboard</h1>
      <span>Fast file actions in one calm workspace.</span>
    </section>
    <section className="grid">
      <ToolCard title="JPG/PNG to PDF" description="Upload one or more images and create a PDF." endpoint="jpg-to-pdf" field="images" multiple accept="image/jpeg,image/png" />
      <ToolCard title="PDF to JPG" description="Convert each PDF page into JPG images." endpoint="pdf-to-jpg" field="pdf" accept="application/pdf" />
      <ToolCard title="Image Compressor" description="Reduce image size using quality control." endpoint="compress-image" field="image" accept="image/*" showQuality />
      <ToolCard title="Background Remover" description="Remove image background." endpoint="remove-bg" field="image" accept="image/*" />
    </section>
  </main></>
}
