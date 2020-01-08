# vscode-imagemin

this extension enable you to compress your image in vscode using imagemin

compress engine: mozjpeg && pngquant

**warning**

when compress successfully, the origin images will replaced by the compressed ones

这个插件可以在 vscode 里压缩图片，压缩插件是 mozjpeg 和 pngquant。

**注意** 

压缩完成后会替换原图


开发这个插件主要是由于每次通过 tinypng 网站压缩太过于麻烦了，又不想集成到前端工作流中。

不使用 tinypng 提供的 api 是由于要钱，免费的额度有可能不够用 😂

通过实验了不少插件后发现 mozjpeg 和 pngquant 这两个在速度和压缩比例上都还比较好。

## ScreenShot
![example](./example.gif)