# vscode-imagemin

this extension enable you to compress your image in vscode using imagemin

这个插件可以在 vscode 里压缩图片，压缩插件是 mozjpeg 和 pngquant。

**注意** 
压缩完成后默认替换原图


## Feature
- 支持压缩 单文件，多文件，文件夹 下的图片
- 支持直接替换原图

## ScreenShot
![example](https://images.xiaozhuanlan.com/photo/2020/7c9305e662282413b18296203bbc11c6.gif)

## Others
开发这个插件主要是由于每次通过 tinypng 网站压缩太过于麻烦了，又不想集成到前端工作流中。

不使用 tinypng 提供的 api 是由于要钱，免费的额度有可能不够用 😂

通过实验了不少插件后发现 mozjpeg 和 pngquant 这两个在速度和压缩比例上都还比较好。

## TodoList
- 可配置是否替换文件
- 移除负压缩
- 添加 icon
- 可配置压缩比例与压缩插件
- 减少插件体积
- 压缩完成弹窗提示
- 发布