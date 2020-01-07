import * as fs from 'fs-extra';
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const filesize = require('filesize');

const isFile = async (input: string) => {
  const stat = await fs.lstat(input);
  return stat.isFile();
};

// find image under folder
const findImages = async (input: string) => {
  const basenames = await fs.readdir(input);
  const test = /(.png|.jpg|.jpeg)$/;
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
    } else if (test.test(_path)) {
      images.push(_path);
    }
  }
  return images;
};

const compressFile = async (input: string) => {
  const dirname = path.dirname(input);
  const stat = await fs.stat(input);
  const size = stat.size;
  console.log(`start compress ${input}...`);
  console.log(`file size: ${filesize(size, {round: 0})}`);
  await imagemin([input], {
    destination: dirname,
    plugins: [imageminPngquant(), imageminMozjpeg()]
  });
  const stat2 = await fs.stat(input);
  const size2 = stat2.size;
  console.log(`compress ${input} success`);
  console.log(`after compress file size: ${filesize(size2, {round: 0})}`);
  const compressPercent = `${((size - size2) / size * 100).toFixed(2)}%`;
  console.log(`after compress reduce: ${compressPercent}`);
};

const compress = async (input: string) => {
  const targetIsFile = await isFile(input);

  if (targetIsFile) {
    compressFile(input);
  } else {
    const images = await findImages(input);
    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i];
      await compressFile(imageFile);
    }
  }
};

export default compress;
