import { diskStorage } from 'multer';

const fileName = (req, file, callback) => {
  callback(null, file.originalname);
};

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: fileName,
});



// import { diskStorage } from 'multer';
// import { path } from 'app-root-path';
// import { ensureDir } from 'fs-extra';
// import { format } from 'date-fns';

// const dest = async () => {
//   const dateFolder = format(new Date(), 'yyyy-MM');
//   const uploadFolder = `./uploads/${dateFolder}`;
//   await ensureDir(uploadFolder);
//   return uploadFolder;
// };

// const fileName = async (req, file, callback) => {
//   const dir = await dest();
//   console.log(dir)
//   console.log(file.originalname)
//   callback(null, dir + file.originalname);
// };

// const dirName = async (req, file, callback) => {
//   const dir = await dest();
//   callback(null, dir);
  
// };

// export const fileStorage = diskStorage({
//   destination: dirName,
//   filename: fileName,
// });
