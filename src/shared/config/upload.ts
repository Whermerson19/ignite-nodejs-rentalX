import multer from "multer";

import path from "path";
import crypto from "crypto";

// import '../../../tmp'

const tmpFolder = path.resolve(__dirname, "..", "..", "..", "tmp");

const uploadConfig = {
  uploadFolder: path.resolve(tmpFolder, "uploads"),
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, cb) {
      const fileEncode = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileEncode}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};

export default uploadConfig;
