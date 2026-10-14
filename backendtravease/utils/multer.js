import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Absolute, so it does not depend on which folder the server was started from,
// and created on boot so the first upload cannot fail with ENOENT.
export const UPLOAD_DIR = path.resolve(__dirname, "..", "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype) || file.mimetype === "application/pdf") {
      return cb(null, true);
    }
    cb(new Error("Only images (jpg, png, webp, gif) and PDF files are allowed"));
  },
});

export default upload;

// Multer's req.file.path is an absolute disk path (and uses "\" on Windows).
// The browser needs a forward-slash web path, because the frontend renders
// images as `${REACT_APP_API_URL}/${d.image}`. Always persist this, never .path.
export const webPath = (file) => (file ? `uploads/${file.filename}` : "");
