import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import axios from 'axios';
import FormData from 'form-data';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { execFile } from 'child_process';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempDir = path.join(__dirname, '../temp');
const execFileAsync = promisify(execFile);

const publicUrl = (req, file) => {
  const forwardedProto = req.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const protocol = forwardedProto || req.protocol;
  return `${protocol}://${req.get('host')}/downloads/${file}`;
};
const safeDelete = async (file) => { try { await fs.unlink(file); } catch {} };

export const jpgToPdf = async (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ message: 'Upload at least one image' });
    const pdfDoc = await PDFDocument.create();
    for (const file of req.files) {
      const bytes = await fs.readFile(file.path);
      const img = file.mimetype.includes('png') ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
    const outName = `converted-${uuidv4()}.pdf`;
    const outPath = path.join(tempDir, outName);
    await fs.writeFile(outPath, await pdfDoc.save());
    for (const f of req.files) await safeDelete(f.path);
    res.json({ message: 'PDF created', downloadUrl: publicUrl(req, outName) });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const compressImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Upload an image' });
    const quality = Math.max(10, Math.min(Number(req.body.quality || 70), 95));
    const outName = `compressed-${uuidv4()}.jpg`;
    const outPath = path.join(tempDir, outName);
    await sharp(req.file.path).jpeg({ quality }).toFile(outPath);
    await safeDelete(req.file.path);
    res.json({ message: 'Image compressed', downloadUrl: publicUrl(req, outName) });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const pdfToJpg = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Upload a PDF' });
    const outputPrefix = `pdf-page-${uuidv4()}`;

    if (process.platform === 'win32') {
      const { default: pdfPoppler } = await import('pdf-poppler');
      const options = { format: 'jpeg', out_dir: tempDir, out_prefix: outputPrefix, page: null };
      await pdfPoppler.convert(req.file.path, options);
    } else {
      const outputPath = path.join(tempDir, outputPrefix);
      await execFileAsync('pdftoppm', ['-jpeg', '-r', '150', req.file.path, outputPath]);
    }

    await safeDelete(req.file.path);
    const files = fsSync.readdirSync(tempDir)
      .filter(f => f.startsWith(outputPrefix) && f.endsWith('.jpg'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    res.json({ message: 'PDF converted to JPG', files: files.map(f => publicUrl(req, f)) });
  } catch (error) {
    await safeDelete(req.file?.path);
    res.status(500).json({ message: `${error.message}. Make sure Poppler is installed and available in PATH.` });
  }
};

export const removeBackground = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Upload an image' });
    const apiKey = process.env.REMOVE_BG_API_KEY?.trim();
    if (!apiKey) return res.status(500).json({ message: 'REMOVE_BG_API_KEY missing in server .env' });
    const form = new FormData();
    form.append('image_file', fsSync.createReadStream(req.file.path));
    form.append('size', 'auto');
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', form, {
      headers: { ...form.getHeaders(), 'X-Api-Key': apiKey },
      responseType: 'arraybuffer'
    });
    const outName = `no-bg-${uuidv4()}.png`;
    const outPath = path.join(tempDir, outName);
    await fs.writeFile(outPath, response.data);
    await safeDelete(req.file.path);
    res.json({ message: 'Background removed', downloadUrl: publicUrl(req, outName) });
  } catch (error) {
    await safeDelete(req.file?.path);
    const rawError = error.response?.data?.toString?.() || error.message;
    let message = rawError;
    try {
      const parsed = JSON.parse(rawError);
      message = parsed.errors?.map((err) => err.title).join(', ') || rawError;
    } catch {}
    res.status(error.response?.status || 500).json({ message });
  }
};
