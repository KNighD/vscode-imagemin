import * as fs from 'fs-extra';
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const filesize = require('filesize');
import { isFile, findImages, getCompressPercent } from './utils';

interface IImageMin {
  input: string;
  outputChannel: any;
}

export default class ImageMin implements IImageMin {
  input: string;
  outputChannel: any;

  constructor(input: string, outputChannel: any) {
    this.input = input;
    this.outputChannel = outputChannel;
  }

  compressFile = async (input: string) => {
    const dirname = path.dirname(input);
    const stat = await fs.stat(input);
    const size = stat.size;

    this.outputChannel.show();
    this.outputChannel.appendLine(`start compress ${input}...`);
    this.outputChannel.appendLine(`file size: ${filesize(size, { round: 0 })}`);
    await imagemin([input], {
      destination: dirname,
      plugins: [imageminPngquant(), imageminMozjpeg()]
    });
    const newStat = await fs.stat(input);
    const newSize = newStat.size;
    this.outputChannel.appendLine(`after compress file size: ${filesize(newSize, { round: 0 })}`);
    const compressPercent = getCompressPercent(size, newSize);
    this.outputChannel.appendLine(`after compress reduce: ${compressPercent}`);
    this.outputChannel.appendLine(`compress ${input} success`);
  }

  compress = async () => {
    const targetIsFile = await isFile(this.input);

    if (targetIsFile) {
      this.compressFile(this.input);
    } else {
      const images = await findImages(this.input);
      for (let i = 0; i < images.length; i++) {
        const imageFile = images[i];
        await this.compressFile(imageFile);
      }
    }
  }
}
