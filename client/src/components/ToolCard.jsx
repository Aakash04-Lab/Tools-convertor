import { useState } from 'react';
import api from '../api/api.js';

export default function ToolCard({ title, description, endpoint, field, multiple=false, accept, showQuality=false }){
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(70);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setError(''); setResult(null);
    if (!files.length) return setError('Please select file first');
    const form = new FormData();
    Array.from(files).forEach(f => form.append(field, f));
    if (showQuality) form.append('quality', quality);
    try {
      setLoading(true);
      const { data } = await api.post(`/tools/${endpoint}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResult(data);
    } catch (err) { setError(err.response?.data?.message || err.message); }
    finally { setLoading(false); }
  };

  return <div className="tool-card">
    <div className="tool-icon">{title.split(' ').map(word=>word[0]).join('').slice(0,2)}</div>
    <h3>{title}</h3><p>{description}</p>
    <form onSubmit={submit}>
      <input type="file" accept={accept} multiple={multiple} onChange={e=>setFiles(e.target.files)} />
      {showQuality && <label>Quality: {quality}<input type="range" min="10" max="95" value={quality} onChange={e=>setQuality(e.target.value)} /></label>}
      <button disabled={loading}>{loading ? 'Processing...' : 'Convert / Process'}</button>
    </form>
    {error && <p className="error">{error}</p>}
    {result?.downloadUrl && <a className="download" href={result.downloadUrl} download rel="noopener noreferrer">Download File</a>}
    {result?.files && <div className="downloads">{result.files.map((u,i)=><a key={u} href={u} download rel="noopener noreferrer">Download JPG {i+1}</a>)}</div>}
  </div>
}
