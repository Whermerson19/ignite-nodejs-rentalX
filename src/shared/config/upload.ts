import multer from "multer";

import path from "path";
import crypto from "crypto";

// const uploadConfig = {
//   uploadFolder: path.resolve(tmpFolder, "uploads"),
//   directory: tmpFolder,
//   storage: multer.diskStorage({
//     destination: tmpFolder,
//     filename(request, file, cb) {
//       const fileEncode = crypto.randomBytes(16).toString("hex");
//       const fileName = `${fileEncode}-${file.originalname}`;

//       return cb(null, fileName);
//     },
//   }),
// };

const uploadConfig = {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "..", folder),
        filename: (req, file, cb) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return cb(null, fileName);
        },
      }),
    };
  },
};

export default uploadConfig;
