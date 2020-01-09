import * as fs from 'fs-extra';
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const filesize = require('filesize');
import { isFile, findImages, getCompressPercent, isImage, replaceFile } from './utils';

interface IOptions {
  replaceOriginImage?: boolean;
}

interface IImageMin {
  inputs: string[];
  outputChannel: any;
  options: IOptions;
}

export default class ImageMin implements IImageMin {
  inputs: string[];
  outputChannel: any;
  options: IOptions;

  constructor(inputs: string[], outputChannel: any, options: IOptions ) {
    this.inputs = inputs;
    this.outputChannel = outputChannel;
    this.options = options;
  }

  compressFile = async (input: string) => {
    if(!isImage(input)) { return; }
    const stat = await fs.stat(input);
    const size = stat.size;

    this.outputChannel.show();
    this.outputChannel.appendLine(`start compress ${input}...`);
    this.outputChannel.appendLine(`file size: ${filesize(size, { round: 0 })}`);

    const [{ data }] = await imagemin([input], {
      plugins: [imageminPngquant(), imageminMozjpeg()]
    });
    const extName = path.extname(input);
    const destinationPath = input.replace(extName, `.min${extName}`);
    await fs.writeFile(destinationPath, data);
    const newStat = await fs.stat(destinationPath);
    let newSize = newStat.size;

    if(newSize >= size) {
      // 无优化/负优化
      await replaceFile(destinationPath, input);
      newSize = size;
    }
    
    this.outputChannel.appendLine(
      `after compress file size: ${filesize(newSize, { round: 0 })}`
    );
    const compressPercent = getCompressPercent(size, newSize);
    this.outputChannel.appendLine(`after compress reduce: ${compressPercent}`);
    this.outputChannel.appendLine(`compress ${input} success`);

    if(this.options.replaceOriginImage) {
      await replaceFile(input, destinationPath);
    }
  }

  compress = async (input: string) => {
    try {
      const targetIsFile = await isFile(input);
      if (targetIsFile) {
        await this.compressFile(input);
      } else {
        this.outputChannel.appendLine(`start compress ${input}...`);
        const images = await findImages(input);
        for (let i = 0; i < images.length; i++) {
          const imageFile = images[i];
          await this.compressFile(imageFile);
        }
        this.outputChannel.appendLine(`compress ${input} successful`);
      }
    } catch (error) {
      this.outputChannel.appendLine(error.toString());
    }
  }

  process = async () => {
    for (let i = 0; i < this.inputs.length; i++) {
      const input = this.inputs[i];
      await this.compress(input);
    }
  }
}
