const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// helper upload dari buffer memory multer
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: 'toko-online' },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File tidak ada" });
    const result = await uploadToCloudinary(req.file.buffer);
    res.json({ message: "Upload sukses", url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadProductImage };
