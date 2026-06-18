# MERN Tools Suite

A full MERN web app with authentication, email OTP password reset, dashboard, and tools:

- JPG/PNG to PDF
- PDF to JPG
- Image Compressor
- Background Remover using remove.bg API

## Tech Stack

- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT auth
- Nodemailer OTP emails
- Multer file uploads
- Sharp image processing
- pdf-lib for image to PDF
- pdf-poppler for PDF to JPG

## Requirements

1. Node.js 18+
2. MongoDB local or MongoDB Atlas
3. For PDF to JPG: Poppler installed on your system
   - Windows: install Poppler and add `bin` folder to PATH
   - macOS: `brew install poppler`
   - Ubuntu/Debian: `sudo apt-get install poppler-utils`
4. remove.bg API key for background remover

## Setup

```bash
cd mern-tools-suite
npm run install:all
```

Create `server/.env` from `server/.env.example`:

```bash
cp server/.env.example server/.env
```

Fill these values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_tools_suite
JWT_SECRET=replace_with_a_long_secret
CLIENT_URL=http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
REMOVE_BG_API_KEY=your_remove_bg_api_key
```

For Gmail OTP, use a Gmail App Password, not your normal Gmail password.

## Run

```bash
npm run dev
```

Open:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Production notes

- Uploaded files are deleted automatically after processing.
- Add rate limiting and HTTPS before deploying publicly.
- PDF to JPG depends on Poppler being available on the server.
# Tools-convertor
