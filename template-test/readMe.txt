说明：
1.psd文件夹是为后期开发备份的，是一些图标,sprite图的源文件，以备二次开发时用。注意所有新图标的递增都要先保存源文件再
存为网页所用格式。

2.images文件夹里所有以pic_test_开头的图片，为模拟数据的图片，在导入数据之后都可以删除。

3.robots.txt是为搜索引擎准备的，是对搜索引擎制定的一个如何索引你的网站的规则。参照百度的：https://www.baidu.com/robots.txt
  注意robots.txt文件名必须小写。

4.资源：
<!--代码高亮显示插件-->
<link type="text/css" rel="stylesheet" href="http://www.colorski.com/plugins/codeView/shCore.css"/>
<script type="text/javascript" src="http://www.colorski.com/plugins/codeView/shCore.js"></script>
<script type="text/javascript" src="http://www.colorski.com/plugins/codeView/shBrushJScript.js"></script>
<script type="text/javascript" src="http://www.colorski.com/plugins/codeView/shBrushCss.js"></script>
<script type="text/javascript" src="http://www.colorski.com/plugins/codeView/shBrushXml.js"></script>
<!--pre的类可以为 xml  css  javasctipt  class="brush:javascript;"-->


图标：
http://www.colorski.com/favicon.ico

重置：
http://www.colorski.com/template-test/css/reset.css

jq：
http://www.colorski.com/template-test/js/jquery-1.12.3.min.js

图片：
http://www.colorski.com/i/images/circle_2.png

http://www.colorski.com/template-test/images/img01.jpg
http://www.colorski.com/template-test/images/img02.jpg
http://www.colorski.com/template-test/images/img03.jpg


音频：
http://www.colorski.com/template-test/js/plugins/audio/numbness.mp3
http://www.colorski.com/template-test/js/plugins/audio/numbness.ogg

http://www.colorski.com/template-test/js/plugins/audio/chime.mp3
http://www.colorski.com/template-test/js/plugins/audio/chime.ogg

http://www.colorski.com/template-test/js/plugins/audio/pi.mp3
http://www.colorski.com/template-test/js/plugins/audio/pi.ogg






for FE: | for Myself:

1.如果要兼容ie7，记得要给position:relative;的定位层级z-index，定一个规则：弹出层10000+，relative的层从5000每100递减；

2.对于项目中已经用过的文件，reset.css以及psd里的源文件只做增量修改，别做删减；

3.所有test文档只作为实验用例，模版使用过程中可以直接删除，新建自己的页面即可；对于几个页面的小项目，像plugns、fonts文件夹
  应该是没必要的，甚至css和js只写在一个文件即可，减少请求数；
