# ImageMin

this extension enable you to compress your image in vscode using imagemin

这个插件可以在 vscode 里压缩并替换图片，压缩插件是 mozjpeg 和 pngquant。

**注意** 
压缩完成后默认替换原图


## Feature
- 支持压缩 单文件，多文件，文件夹 下的图片
- 支持直接替换原图(默认替换原图，可配置)
- 无需 apikey, 本地压缩
- 没有文件大小限制

## ScreenShot
![example](https://user-images.githubusercontent.com/13437430/72045953-5a7f7b80-32f2-11ea-8313-5a76e749f0dd.gif)

## Others
开发这个插件主要是由于每次通过 tinypng 网站压缩太过于麻烦了，又不想集成到前端工作流中。

不使用 tinypng 提供的 api 是由于每个月 500 的额度有可能不够用，申请 apikey 又麻烦 😂

通过实验后发现 mozjpeg 和 pngquant 这两个在速度和压缩比例上都还比较好。

## TodoList
- 可配置压缩比例与压缩插件
- 压缩其他格式：gif,webp...
- 优化拓展体积