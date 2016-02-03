
> 使用此库,可以方便的使用 Markdown,编写出上线翻页滑动展示的页面.

## 引用

    使用了很多 nodeppt 中的工具函数,滑动库使用 Swiper

## 使用 npm 安装
    
        npm install mdshow -g
        npm install
        
## 文档编写

请参考 `test/demo/` 目录的写法.

## 测试方式:

    npm install mdshow
    
	# 浏览到 mshow 的目录以后执行
	
	npm test

会调用:package.json `scripts` 中的语句进行测试

    node bin/mdshow -s test/demo/ -t simple -o test/publish

## 使用方式:

    mdshow -s test/demo/ -t your_template -o test/publish

## 约定:

源码的目录里面,需要有入口文件 `index.md`,此文件是正常的 Markdown 文件中,增加了 Markdown 文件的 `include` 功能

## 扩展和修改

扩展和修改主要在 `tempplates` 中进行,在默认的模板 `simple` 进行修改,定义各种标签的样式.若定义一个新的模板,请复制 `simple` 文件夹,进行修改以后,然后运行语句时指定模板文件夹名,如:
     
    mdshow -s test/demo/ -t your_template -o test/publish
