/**
 *
 * @type {{}}
 */

var md_swiper = {};
var fs = require("fs");
var $ = require('./helper');
var path = require("path");

/**
 * 根据 index.md 中的 md 文件引用,把多个 md 合成为一个md,也可以没有
 * @param input md 文件内容,处理 [markdown][include.md] 标签,替换成文件内容
 */
md_swiper.getMergedMd = function(inputFile){
    var mstr = fs.readFileSync(inputFile,"utf-8");

    mstr = mstr.replace(/\[markdown\]\((.*)\)/img,function(fullstr,matchstr){
        var mdfile = matchstr.replace(/"|'/g,"");
        var fullpath = path.join(path.dirname(inputFile),mdfile);

        if ($.exists(fullpath)) {
            return fs.readFileSync(fullpath,"utf8");
        }else{
            return "File Not Found: " + fullpath;
        }
    })

    return mstr;
}

/**
 * md 转成 html
 * @param input
 * @param template
 * @param outputDir
 */
md_swiper.toHtml = function(inputFile,template,outputFile){
    var md_parser = require("./md_parser");
    var mstr = md_parser(this.getMergedMd(inputFile),null,null,null,null,template);

    fs.writeFileSync(outputFile,mstr);
}

/**
 * 先拷贝 template 目录的内容,再拷贝源码目录中除了 *.md 文件以外的内容
 */
md_swiper.mergePublish = function(sourceDir,templateDir,publishDir){
    $.copy(templateDir, publishDir, function(filename, dir, subdir) {
        if (path.extname(filename) == ".md" || path.extname(filename) == ".ejs") {
            return false;
        }

        return true;
    });

    $.copy(sourceDir, publishDir, function(filename, dir, subdir) {
        if (path.extname(filename) == ".md" || path.extname(filename) == ".psd") {
            return false;
        }
        return true;
    });
}

/**
 * 调用入口
 * @param sourceDir
 * @param template
 * @param publishDir
 */
md_swiper.make_swiper = function(sourceDir,template,publishDir){

    if (!$.exists(publishDir)){
        $.mkdir(publishDir);
    }

    //合并生成最终的目录
    var templateRoot = path.join(path.join(__dirname),"../templates");
    this.mergePublish(sourceDir,path.join(templateRoot,template),publishDir);
    this.toHtml(path.join(sourceDir,"index.md"),template,path.join(publishDir,"index.html"));
}

md_swiper.test = function(){

}

module.exports = md_swiper;

