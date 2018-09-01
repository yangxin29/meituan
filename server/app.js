const express = require('express')
const app = express()
const path = require('path')
// const request = require('request')
// const  fs = require('fs')

app.listen(4000, err => {
  if (!err) {
    console.log('listen 4000')
  }
})

// slideBar
app.get('/api/slideBar', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/sidebar.md'))
})

app.get('/api/docs', (req, res) => {
  const name = req.query.name
  res.sendFile(path.join(__dirname, `/data/${name}.md`))
})

// const STRING = `# [ECMAScript 6 入门]()
//
// 作者：[阮一峰](http://www.ruanyifeng.com)
//
// 授权：<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">署名-非商用许可证</a>
//
// ## 目录
// 1. [前言](#README)
// 1. [ECMAScript 6简介](#docs/intro)
// 1. [let 和 const 命令](#docs/let)
// 1. [变量的解构赋值](#docs/destructuring)
// 1. [字符串的扩展](#docs/string)
// 1. [正则的扩展](#docs/regex)
// 1. [数值的扩展](#docs/number)
// 1. [函数的扩展](#docs/function)
// 1. [数组的扩展](#docs/array)
// 1. [对象的扩展](#docs/object)
// 1. [Symbol](#docs/symbol)
// 1. [Set 和 Map 数据结构](#docs/set-map)
// 1. [Proxy](#docs/proxy)
// 1. [Reflect](#docs/reflect)
// 1. [Promise 对象](#docs/promise)
// 1. [Iterator 和 for...of 循环](#docs/iterator)
// 1. [Generator 函数的语法](#docs/generator)
// 1. [Generator 函数的异步应用](#docs/generator-async)
// 1. [async 函数](#docs/async)
// 1. [Class 的基本语法](#docs/class)
// 1. [Class 的继承](#docs/class-extends)
// 1. [Decorator](#docs/decorator)
// 1. [Module 的语法](#docs/module)
// 1. [Module 的加载实现](#docs/module-loader)
// 1. [编程风格](#docs/style)
// 1. [读懂规格](#docs/spec)
// 1. [ArrayBuffer](#docs/arraybuffer)
// 1. [最新提案](#docs/proposals)
// 1. [参考链接](#docs/reference)
//
// ## 其他
// - [源码](http://github.com/ruanyf/es6tutorial/)
// - [修订历史](https://github.com/ruanyf/es6tutorial/commits/gh-pages)
// - [反馈意见](https://github.com/ruanyf/es6tutorial/issues)
// `
//
// var regex1 = /\(#docs\/(.+?)\)/g
// STRING.match(regex1).forEach(v => {
//   const name = v.match(/\/(.+)\)/)[1]
//   request({
//     url: `http://es6.ruanyifeng.com/docs/${name}.md`,
//     method: 'GET'
//   }, (err, req, body) => {
//     fs.writeFile(path.join(__dirname, `/data/${name}.md/`), body, (err1) => {
//       console.log(err1)
//     })
//   })
// })

// docs
