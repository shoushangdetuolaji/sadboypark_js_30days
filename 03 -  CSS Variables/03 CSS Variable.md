# 03 CSS Variabel

## 实现效果

用js和css3实现拖动滑块时，实时调整图片的内边距、模糊度、背景颜色、同时标题中js两字的颜色也随图片背景颜色而变化。

## 涉及特性

- :root

  > https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root

- var(--xxx): css变量 （[CSS Variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)）

- filter: blur () 

- event: change、mousemove

## 过程指南

1. css
   1. 声明全局（`:root`）的 CSS 变量
   2. 将变量应用到页面中对应元素 `<img>` 
   3. 处理标题的 CSS 值
2. js实时更新css值
   1. 获取页面中input元素
   2. 给每个input添加事件、值再变动、触发更新操作
   3. 添加鼠标滑过时的事件监听
   4. 编写处理更新操作的方法
      1. 获取参数值后缀 suffix  data-xxx
      2. 获取参数名 {blur、spacing、color}
      3. 获取参数值（12px、#efefef）
      4. 赋值给对应css变量

## 基础知识

1. NodeList 和 Array 的区别

   可以打开 __proto__ 查看它的方法，其中有 `forEach()`、`item()`、`keys()` 等。而 Array 的 prototype 中有 `map()`、`pop()` 等数组才有的方法。

2. HTML5 中的自定义数据属性 `dataset`

   HTML5 中可以为元素添加非标准的自定义属性，只需要加上 `data-` 前缀，可以随便添加和命名。添加之后，可以通过元素的 `dataset` 属性来访问这些值，`dataset` 的值是 DOMStringMap 的一个实例化对象，其中包含之前所设定的自定义属性的“名-值”对。

3. [CSS variable](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)

   这是一个 CSS3 的新特性，[IE 和 Edge 目前都还不支持](http://caniuse.com/#feat=css-variables)。命名写法是 `--变量名`，在引用这个变量时写法是 `var(--变量名)`。具体实例见下一条代码。

4. `:root` 伪类

   这个伪元素匹配的是文档的根元素，也就是 `<html>` 标签。

   所以常用于声明全局的 CSS 变量：

   ```css
   :root {
     --color: #fff;
   }
   ```

   在使用时：

   ```css
   img {
     background: var(--base);
   }
   ```

5. CSS 滤镜 [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)

   CSS 的滤镜提供了一些图形特效，比如高斯模糊、锐化、变色等。它带有一些预设的函数，在使用时加上参数调用这些函数即可。[在 Chrome、Firefox 中都支持。](http://caniuse.com/#search=filter)

## 解决难点

1. **如何处理参数值（一个有 px 、另一个没有）**

   运用 `dataset` 储存后缀，有 px 后缀的标签中设置 `<input data-sizing: px>`：

   ```html
   <input type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
    <input type="color" name="base" value="#8aa8af">
   ```

   JS 中通过 `dataset.sizing` 来获取后缀值：

   ```javascript
   const suffix = this.dataset.sizing || ''; 
   ```

   此时 suffix 获取到的值，针对颜色为空，而针对长度类的则为 'px'。

2. **如何用 JavaScript 改变 CSS 属性值？**

   在 JavaScript 中 `document.documentElement` 即代表文档根元素。所以要改变全局的 CSS 变量，可以这样写：

   ```JS
   document.documentElement.style.setProperty('--base', '#fff');
   ```

   

