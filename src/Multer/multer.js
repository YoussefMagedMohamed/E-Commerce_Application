import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../Utils/AppError.js";

function refactorMulter(folderName) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      // To accept the file pass `true`, like so:
      cb(null, true);
    } else {
      // To reject this file pass `false`, like so:
      cb(new AppError("Images Only", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });
  return upload;
}

// Upload a Single Image
export const uploadSingleFile = (fieldName, folderName) =>
  refactorMulter(folderName).single(fieldName);

// Upload Multiple Images
export const uploadMixOfFiles = (arrOfFields, folderName) =>
  refactorMulter(folderName).fields(arrOfFields);
