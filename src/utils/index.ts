import * as fs from 'fs-extra';

const isFile = async (input: string) => {
  const stat = await fs.lstat(input);
  return stat.isFile();
};

const isImage = (path: string) => {
  const reg = /(.png|.jpg|.jpeg)$/;
  return reg.test(path);
};

// find image under folder
const findImages = async (input: string) => {
  const basenames = await fs.readdir(input);
  if (!basenames || basenames.length === 0) {
    return [];
  }
  let images: string[] = [];
  for (let i = 0; i < basenames.length; i++) {
    const basename = basenames[i];
    const _path = `${input}/${basename}`;
    const pathIsFile = await isFile(_path);
    if (!pathIsFile) {
      // if this is a folder then go on find image
      const subImages = await findImages(_path);
      images = [...images, ...subImages];
    } else if (isImage(_path)) {
      images.push(_path);
    }
  }
  return images;
};

const getCompressPercent = (size: number, newSize: number) => {
  return `${((size - newSize) / size * 100).toFixed(2)}%`;
};



export {
  isFile, findImages, getCompressPercent, isImage
};
