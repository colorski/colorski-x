"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 xxx
 * @联系 http://www.xuanfengge.com/tag/js%E6%89%8B%E8%AE%B0
 * @邮箱 290518066@qq.com
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/


//实现base64解码
function base64_decode(data){
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,dec = "",tmp_arr = [];
    if (!data) { return data; }
    data += '';
    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    dec = utf8_decode(dec);
    return dec;
}

//实现utf8解码
function utf8_decode(str_data){
    var tmp_arr = [],i = 0,ac = 0,c1 = 0,c2 = 0,c3 = 0;str_data += '';
    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return tmp_arr.join('');
}

//半角转换为全角函数
function ToDBC(str){
    var result = '';
    for(var i=0; i < str.length; i++){
        code = str.charCodeAt(i);
        if(code >= 33 && code <= 126){
            result += String.fromCharCode(str.charCodeAt(i) + 65248);
        }else if (code == 32){
            result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
        }else{
            result += str.charAt(i);
        }
    }
    return result;
}

//全角转换为半角函数
function ToCDB(str){
    var result = '';
    for(var i=0; i < str.length; i++){
        code = str.charCodeAt(i);
        if(code >= 65281 && code <= 65374){
            result += String.fromCharCode(str.charCodeAt(i) - 65248);
        }else if (code == 12288){
            result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
        }else{
            result += str.charAt(i);
        }
    }
    return result;
}

//用正则表达式清除html代码中的脚本
function clear_script(html){
    return html.replace(/<script.*?>[\s\S]*?<\/script>|\s+on[a-zA-Z]{3,16}\s?=\s?"[\s\S]*?"|\s+on[a-zA-Z]{3,16}\s?=\s?'[\s\S]*?'|\s+on[a-zA-Z]{3,16}\s?=[^ >]+/ig,"");
}

//获取当前元素样式
function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}

//格式化CSS样式代码
function formatCss(s){//格式化代码
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/;\s*;/g, ";"); //清除连续分号
    s = s.replace(/\,[\s\.\#\d]*{/g, "{");
    s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
    s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
    s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
    return s;
}

//压缩CSS样式代码
function compressCss (s) {//压缩代码
    s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理
    s = s.replace(/;\s*;/g, ";"); //清除连续分号
    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
    return (s == null) ? "" : s[1];
}

//常用的正则表达式
//正整数
/^[0-9]*[1-9][0-9]*$/;
//负整数
/^-[0-9]*[1-9][0-9]*$/;
//正浮点数
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
//负浮点数
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
//浮点数
/^(-?\d+)(\.\d+)?$/;
//email地址
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url地址
//      /^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
//或：  ^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$

//年/月/日（年-月-日、年.月.日）
/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
//匹配中文字符
/[\u4e00-\u9fa5]/;
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
//匹配空白行的正则表达式
/\n\s*\r/;
//匹配中国邮政编码
/[1-9]\d{5}(?!\d)/;
//匹配身份证
/\d{15}|\d{18}/;
//匹配国内电话号码
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//匹配IP地址
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//匹配首尾空白字符的正则表达式
/^\s*|\s*$/;
//匹配HTML标记的正则表达式
//   < (\S*?)[^>]*>.*?|< .*? />;
//sql 语句
//   ^(select|drop|delete|create|update|insert).*$
//提取信息中的网络链接
//   (h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
//提取信息中的邮件地址
//   \w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
//提取信息中的图片链接
//   (s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
//提取信息中的 IP 地址
//   (\d+)\.(\d+)\.(\d+)\.(\d+)
//取信息中的中国手机号码
//   (86)*0*13\d{9}
//提取信息中的中国邮政编码
//   [1-9]{1}(\d+){5}
//提取信息中的浮点数（即小数）
//   (-?\d*)\.?\d+
//提取信息中的任何数字
//   (-?\d*)(\.\d+)?
//电话区号
//   ^0\d{2,3}$
//腾讯 QQ 号
//   ^[1-9]*[1-9][0-9]*$
//帐号（字母开头，允许 5-16 字节，允许字母数字下划线）
//   ^[a-zA-Z][a-zA-Z0-9_]{4,15}$
//中文、英文、数字及下划线
//   ^[\u4e00-\u9fa5_a-zA-Z0-9]+$


//格式化数字、金额
function number_format(number, decimals, dec_point, thousands_sep) {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
var num = number_format(1234567.089, 2, ".", ",");//1,234,567.09


//操作DOM class

// 判断某个对象是否有指定的className
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

// 给指定对象添加className
function addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

// 删除className
function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}

//分解url
// 正则：
/^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+)?)?(?:#(.+)?)?$/
// 结果格式：
/*Array [
    [scheme] => http
    [host] => quchao.com
    [user] => user
    [pass] => pass
    [path] => /about-me
    [query] => t=100102
    [fragment] => hash
]*/
// demo:
'http://user:pass@xuanfenge.com:80/category/?s=css3#first'
.match(/^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+)?)?(?:#(.+)?)?$/);
// 结果
["http://user:pass@xuanfenge.com:80/category/?s=css3#first", "http", "user", "pass", "xuanfenge.com", "80", "/category/", "s=css3", "first"]


//获取url参数
function parseUrl(url) {
    // 找到url中的第一个?号
    var parse = url.substring(url.indexOf("?") + 1),
        params = parse.split("&"),
        len = params.length,
        item = [],
        param = {};

    for (var i = 0; i < len; i++) {
        item = params[i].split("=");
        param[item[0]] = item[1];
    }

    return param;
}

// demo:
parseUrl("www.xuanfengge.com/js?name=xuanfeng&age=21&page=2")
// 结果
//   {name: "xuanfeng", age: "21", page: "2"}


//URL参数拼接
/**
 * @description 将传入的url参数对象解析组装成字符串做为queryString中的一部分
 * @param {Object} params 请求参数的数组
 * @param {string} cgi 请求串
 * @return {String} queryString部分字符串
 * @example ： param1=value1&param2=value2&param3=value3......
 */
function convert_params(params, cgi){
    var paramsArray = [];
    for (var name in params) {
        if (paramsArray.length == 0) {
            cgi && cgi.indexOf('?') != -1 ? paramsArray.push("&") : paramsArray.push("?");
        }
        else {
            paramsArray.push("&");
        }
        paramsArray.push(name);
        paramsArray.push("=");
        paramsArray.push(params[name]);
    }
    return paramsArray.join("");
}

console.log(convert_params({"param": "value1", "param2": "value2"}, "/cgi-bin/"));
// ?param=value1&param2=value2
console.log(convert_params({"param": "value1", "param2": "value2"}, "/cgi-bin/?page=1"));
// &param=value1&param2=value2


//判断一个对象是否为空对象
function isEmptyObj(obj){
    for(var name in obj) {
        return false;
    }
    return true;
}
console.log(isEmptyObj({}));                //true
console.log(isEmptyObj({name: "ivan"}));    //false


//解析url
/**
 * @description 解析url
 * @param {String} 请求url串
 * @return
 * @type Object
 * @example parse_url('http://www.xuanfengge.com/index?app_id=110000011')
 */
function parse_url(url){
    var host, path, search, hash, param = {};
    if(url === undefined) {
        var loc = window.location;
        host = loc.host;
        path = loc.pathname;
        search = loc.search.substr(1);
        hash = loc.hash;
    } else {
        var ret = url.match(/\w+:\/\/((?:[\w-]+\.)+\w+)(?:\:\d+)?(\/[^\?\\\"\'\|\:<>]*)?(?:\?([^\'\"\\<>#]*))?(?:#(\w+))?/i) || [];
        host = ret[1];
        path = ret[2];
        search = ret[3];
        hash = ret[4];
    }
    search && function() {
        var arr = search.split('&');
        for(var i = 0, l = arr.length; i < l; i++) {
            //var p=arr[i].split('=');
            //param[p[0]]=p[1];
            if(arr[i].indexOf('=') != -1) {
                var pos = arr[i].indexOf('=');
                var k = arr[i].slice(0, pos);
                var v = arr[i].slice(pos + 1);
                param[k] = v;
            }
        }
    }();
    return {
        host : host,
        path : path,
        search : search,
        hash : hash,
        param : param
    }
}
console.log(JSON.stringify(parse_url("http://www.xuanfengge.com/index?app_id=110000011")));
// {"host":"www.xuanfengge.com","path":"/index","search":"app_id=110000011","param":{"app_id":"110000011"}}



//cookie存储的工具类函数
var cookie = {
    getTopDomain : function() {
        var top = window.location.host, list = {
            'com.cn' : 1,
            'net.cn' : 1,
            'gov.cn' : 1,
            'com.hk' : 1
        }, arr = top.split('.');
        //配置最常用的地区域名名单
        arr.length > 2 && function() {
            top = (list[arr.slice(-2).join('.')] ? arr.slice(-3) : arr.slice(-2)).join('.');
        }();
        return top;
    },
    get : function(key) {
        var ret = document.cookie.match(new RegExp("(?:^|;\\s)" + key + "=(.*?)(?:;\\s|$)"));
        return ret ? ret[1] : "";
    },
    save : function(key, value, expires) {
        document.cookie = key + "=" + value + ";path=/;domain=" + this.getTopDomain() + ( expires ? ";expires=" + expires : '');
    }
}


//浏览器及版本
var userAgent = navigator.userAgent.toLowerCase();
$.browser = {
    version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
    safari: /webkit/.test( userAgent ),
    opera: /opera/.test( userAgent ),
    msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
    mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};


//类型转换函数
var Converter = {
    toInt: function(val){
        return result = isNaN(val)? 0 : parseInt(val);
    },
    toFloat: function(val){
        return result = isNaN(val)? 0 : parseFloat(val);
    },
    toDate: function(strDate){
        var sDate = strDate.replace(/(^\s+|\s+$)/g,''); //去两边空格;
        if(sDate==''){
            return null;
        }

        var s = sDate.replace(/[\d]{4,4}[\-/]{1}[\d]{1,2}[\-/]{1}[\d]{1,2}/g, '');
        if (s == '')
        {
            var t=new Date(sDate.replace(/\-/g,'/'));
            var ar = sDate.split(/[-/:]/);
            if(ar[0] == t.getFullYear() && ar[1] == t.getMonth() + 1 && ar[2] == t.getDate())
            {
                return t;   //返回转化成功的日期对象
            }
        }

        return null;

    }
};

console.log(Converter.toInt("12.3"));
// 12
console.log(Converter.toFloat("12.36"));
// 12.36
console.log(Converter.toDate("2014/9/2"));
console.log(Converter.toDate("2014-9-2"));
console.log(Converter.toDate("2014-09-02"));
// Tue Sep 02 2014 00:00:00 GMT+0800 (中国标准时间)



//全屏遮罩层
/**
 * @description 全屏遮罩层管理器
 * @example mask.create();
 */
var mask = {
    self : '',
    isIE6 : $.browser.msie && $.browser.version < 7,
    create : function() {
        if(this.self && this.self.parent().length) {
            return;
        }
        $(window).bind('resize.overlay', this.resize);
        return (this.self = (this.self || $('<div></div>').css({
            height : '100%',
            left : 0,
            position : 'absolute',
            top : 0,
            width : '100%',
            background : '#000',
            'opacity' : 0.3,
            'z-index' : 2001
        })).appendTo('body').css({
            width : this.width(),
            height : this.height()
        }));
    },
    destroy : function() {
        if(this.self && !this.self.parent().length) {
            return;
        }
        $([document, window]).unbind('resize.overlay');
        this.self.animate({
            opacity : 'hide'
        }, function() {
            $(this).remove().show();
        });
    },
    resize: function() {
        var _mask = mask;
        _mask.self.css({
            width: 0,height: 0
        }).css({
            width: _mask.width(),height: _mask.height()
        });
    },
    height : function() {
        var scrollHeight, offsetHeight;
        if(this.isIE6) {
            scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
            if(scrollHeight < offsetHeight) {
                return $(window).height() + 'px';
            } else {
                return scrollHeight + 'px';
            }
        } else {
            return $(document).height() + 'px';
        }
    },
    width : function() {
        var scrollWidth, offsetWidth;
        if(this.isIE6) {
            scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
            offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
            if(scrollWidth < offsetWidth) {
                return $(window).width() + 'px';
            } else {
                return scrollWidth + 'px';
            }
        } else {
            return $(document).width() + 'px';
        }
    }
}
// demo
mask.create();
setTimeout(function(){
    mask.destroy()
}, 1000);



//封装cookie组件
var Cookie = {
    // 读取
     read : function(name){
        var cookieStr = "; "+document.cookie+"; ";
        var index = cookieStr.indexOf("; "+name+"=");
        if (index!=-1){
            var s = cookieStr.substring(index+name.length+3,cookieStr.length);
            return unescape(s.substring(0, s.indexOf("; ")));
        }else{
            return null;
        }
    },
    // 设置
     set : function(name,value,expires){
        var expDays = expires*24*60*60*1000;
        var expDate = new Date();
        expDate.setTime(expDate.getTime()+expDays);
        var expString = expires ? "expires="+expDate.toGMTString() : "";
        var pathString = ";path=/";
        document.cookie = name + "=" + escape(value) + expString + pathString;
    },
    // 删除
     del : function(name){
        var exp = new Date(new Date().getTime()-1);
        var s=this.read(name);
        if(s!=null) {
            document.cookie= name + "="+s+"expires="+exp.toGMTString()+";path=/"
        }
    }
};
// demo:
Cookie.set("xuanfengge", "www.xuanfengge.com", 7);
alert(Cookie.read("xuanfengge"));
Cookie.del("xuanfengge");


//字符串比较
var aString = "Hello!";
var bString = new String("Hello!");
if( aString == "Hello!" ){ } //结果: true
if( aString == bString ){ } //结果: true
if( aString === bString ){ } //结果: false (两个对不同,尽管它们的值相同)


//检索字符串
var myString = "hello everybody.";
// 如果检索不到会返回-1,检索到的话返回在该串中的起始位置
if( myString.indexOf("every") > -1 ){ } //结果: true


//查找替换字符串
var myString = "I is your father.";
var result = myString.replace("is","am"); //结果: "I am your father."


//截取字符串
//截取第 6 位开始的字符
var myString = "Every good boy does fine.";
var section = myString.substring(6); //结果: "good boy does fine."
//截取第 0 位开始至第 10 位为止的字符
var myString = "Every good boy does fine.";
var section = myString.substring(0,10); //结果: "Every good"
//截取从第 11 位到倒数第 6 位为止的字符
var myString = "Every good boy does fine.";
var section = myString.slice(11,-6); //结果: "boy does"
//从第 6 位开始截取长度为 4 的字符
var myString = "Every good boy does fine.";
var section = myString.substr(6,4); //结果: "good"


//字数统计(中英文)
function fucCheckLength(strTemp){
    var i,sum;
    sum=0;
    for(i=0;i<strTemp.length;i++){
        if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255)){
            sum=sum+1;
        }else{
            sum=sum+2;
        }
    }
    return sum;
}
// demo:
fucCheckLength("qwe");        //3
fucCheckLength("轩枫");        //4



//字符串是否合法日期
//合法日期：yyyy-mm-dd,分隔符可以为-/.
String.prototype.isDate = function() {
    var year,month,date,day;
    var reg = /^([12]\d{3})([-\/\.])([01]?\d)\2([0-3]?\d)$/;

    if (!reg.test(this)) return false;

    year  = RegExp.$1.parseInt();
    month = RegExp.$3.parseInt() - 1;
    date  = RegExp.$4.parseInt();
    day = new Date(year,month,date);

    return ((date == day.getDate()) && (month == day.getMonth()));
}
// demo:
"1999-12-20".isDate()
// 合法日期：yyyy-mm-dd,分隔符可以为-/


//返回两个日期之间的时间间隔
function dateDiff(date1,date2) {
    var year,month,date,day1,day2;
    var reg = /^(\d{4})([-\/\.])(\d{2})\2(\d{2})$/;

    reg.test(date1);
    year  = RegExp.$1.parseInt();
    month = RegExp.$3.parseInt() - 1;
    date  = RegExp.$4.parseInt();
    day1 = new Date(year,month,date);

    reg.test(date2);
    year  = RegExp.$1.parseInt();
    month = RegExp.$3.parseInt() - 1;
    date  = RegExp.$4.parseInt();
    day2 = new Date(year,month,date);

    return (day1.getTime() - day2.getTime()) / 86400000;
}
// demo:
// 用以前，先用isDate()判断一下是否合法日期
// 注意：这个函数的reg和isDate()里的reg小you不同
// 以天为单位(date1-date2=?),可以用来比较2个日期大小



//判断是否为空对象
function isEmpty(obj){
    for(var key in obj){
        return false;
    }
    return true;
}
// demo:
isEmpty({});    //true
isEmpty({"key":"value"});    //false
// jq版本
$.isEmptyObject({});    //true
$.isEmptyObject({"key": "value"});    //false



//获取对象的属性个数
Object.prototype.length = function() {
    var count = 0;
    for(var i in this){
        count ++;
    }
    return count;
};
// demo：
var a = {a:1, b:2, c:3, d:4};
alert(a.length());    // 5



//十六进制颜色值的随机生成
function randomColor(){
 var arrHex=["0","1","2","3","4","5","6","7","8","9","a","b","c","d"],
     strHex="#",
     index;
     for(var i=0;i<6;i++){
      index=Math.floor(Math.random()*14);
      strHex+=arrHex[index];
     }
 return strHex;
}
console.log(randomColor());

function getRandomColor(){
    return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
}
console.log(getRandomColor());
//说明：
//1、16777215为16进制的颜色ffffff转成10进制的数字
//2、>>数字取整
//3、转成16进制不足6位的以0来补充



//获取下一个结点，兼容IE和Firefox
function getNextNode(node){
      node = typeof node == "string" ? document.getElementById(node) : node;
      var nextNode = node.nextSibling;
      if(!nextNode) return null;
     if(!document.all){
         while(true){
            if(nextNode.nodeType == 1){
                break;
            } else {
                if(nextNode.nextSibling){
                    nextNode = nextNode.nextSibling;
                } else {
                    break;
                }
            }
          }
     }
     return nextNode;
};
// demo:
var nextNode = getNextNode("item");   //传递当前元素id
console.log(nextNode.id);              //返回nextSibling的id



//设置透明度
function setOpacity(node, level){
     node = typeof node == "string" ? document.getElementById(node) : node;
    if (document.all){
        node.style.filter = 'alpha(opacity=' + level + ')';
     } else {
        node.style.opacity = level / 100;
    }
}
// demo:
setOpacity("test1",20);
setOpacity("test2",80);



//Event兼容
// 兼容IE和firefox的event对象
btn.onclick = function(e){
     e = window.event || e;
    //下面可以用e来做点什么事，e在IE和Firefox下都指向了event对象
}
// 兼容srcElement和target
var el = e.srcElement || e.target;
console.log(el.tagName);
// 封装getEventTarget函数
function getEventTarget(e){
     e = window.event || e;
     return e.srcElement || e.target;
}



//阻止冒泡，封装stopPropagation函数
function stopPropagation(e){
     e = window.event || e;
    if(document.all){
         e.cancelBubble=true;
     } else {
          e.stopPropagation();
    }
}
// demo:
btn.onclick = function(e){
    stopPropagation(e);
}



//事件监听兼容函数
function on(node,eventType,handler){
     node = typeof node == "string" ? document.getElementById(node) : node;
    if(document.all){
         node.attachEvent("on"+eventType,handler);
     } else {
         node.addEventListener(eventType,handler,false);
     }
}
// demo:
var btn = document.getElementById("btn");
on(btn,"click",function(){
    console.log(1);
});
// 增强函数
// IE下this指向window，其他浏览器指向当前元素
on = function(node,eventType,handler,scope){
  node = typeof node == "string" ? document.getElementById(node) : node;
  scope = scope || node;
  if(document.all){
    node.attachEvent("on"+eventType,function(){handler.apply(scope,arguments)});
  } else {
    node.addEventListener(eventType,function(){handler.apply(scope,arguments)},false);
  }
}



//类型判断函数
function isNumber(s){
    return !isNaN(s);
}
function isString(s){
     return typeof s == "string";
}
function isBoolean(s){
     return typeof s == "boolean";
}
function isFunction(s){
     return typeof s == "function";
}
function isNull(s){
     return s == null;
}
function isUndefined(s){
     return typeof s == "undefined";
}
function isEmpty(s){
    return /^\s*$/.test(s);
}
function isArray(s){
     return s instanceof Array;
}




//getByClass、getById、getByTag
var get={
  byId:function(id){
    return document.getElementById(id);
  },
  byClass:function(oParent,sClass){
    if(oParent.getElementsByClass){
      retuen (oParent||document).getElementsByClass(sClass);
    }else{
      var aClass=[];
      var reClass=new  RegExp("(^|)"+sClass+"( |$)");
      var aElem=this.byTag(oParent,"*");
      for(var i=0;i<aElem.length;i++){
        // reClass.test(aElem[i].className) && aClass.push(aElem[i]);
        if(reClass.test(aElem[i].className)){
          aClass.push(aElem[i]);
        }
      }
      return aClass;
    }
  },
  byTag:function(obj,elem){
    return (obj||document).getElementsByTagName(elem);
  }
}
// demo:
var oNav = get.byId("nav");
var aLi = get.byTagName("li", oNav);
var aSubNav = get.byClass("subnav", oNav);



//getByClass
function getByClass(oParent, sClassName) {
    var aElm=oParent.getElementsByTagName('*');
    var aArr=[];
    for(var i=0; i<aElm.length; i++)
    {
        if(aElm[i].className==sClassName)
        {
            aArr.push(aElm[i]);
        }
    }
    return aArr;
}



//extend函数
function extend(subClass,superClass){
 var F = function(){};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
  subClass.superclass = superClass.prototype;
  if(superClass.prototype.constructor == Object.prototype.constructor){
    superClass.prototype.constructor = superClass;
  }
}
function Animal(name){
 this.name = name;
 this.type = "animal"
}
Animal.prototype = {
 say : function(){
  alert("I'm a(an) " + this.type + " , my name is " + this.name);
}
}
function Bird(name){
  this.constructor.superclass.constructor.apply(this,arguments);
  this.type = "bird"
}
extend(Bird,Animal);
  Bird.prototype.fly = function(){
  alert("I'm flying");
}
var canary = new Bird("xiaocui");
canary.say();   // I’m a(an) bird , my name is xiaocui
canary.fly(); // I’m flying




//将字符串转换成URL编码
var myString = "hello all";
var code = encodeURI(myString); //结果: "hello%20all"
var str = decodeURI(code); //结果: "hello all"
//相应的还有: encodeURIComponent() decodeURIComponent()


//将字符转换成Unicode编码
var myString = "hello";
var code = myString.charCodeAt(3); //返回"l"的Unicode编码(整型)
var char = String.fromCharCode(66); //返回Unicode为66的字符


//光标停在文字的后面，文本框获得焦点时调用
function focusLast(){
    var e = event.srcElement;
    var r =e.createTextRange();
    r.moveStart('character',e.value.length);
    r.collapse(true);
    r.select();
}


//检验URL链接是否有效
function getUrlState(URL){
    var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
    xmlhttp.Open("GET",URL, false);
    try{
        xmlhttp.Send();
    }catch(e){
    }finally{
        var result = xmlhttp.responseText;
        if(result){
            if(xmlhttp.Status==200){
                return(true);
            }else{
                return(false);
            }
        }else{
            return(false);
        }
    }
}


//格式化CSS样式代码
function formatCss(s){//格式化代码
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/;\s*;/g, ";"); //清除连续分号
    s = s.replace(/\,[\s\.\#\d]*{/g, "{");
    s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
    s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
    s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
    return s;
}


//压缩CSS样式代码
function yasuoCss (s) {//压缩代码
    s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理
    s = s.replace(/;\s*;/g, ";"); //清除连续分号
    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
    return (s == null) ? "" : s[1];
}


//获取当前路径
var currentPageUrl = "";
if (typeof this.href === "undefined") {
    currentPageUrl = document.location.toString().toLowerCase();
}
else {
    currentPageUrl = this.href.toString().toLowerCase();
}



//IP转成整型
function _ip2int(ip){
    var num = 0;
    ip = ip.split(".");
    num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
    num = num >>> 0;
    return num;
}



//整型解析为IP地址
function _int2iP(num){
    var str;
    var tt = new Array();
    tt[0] = (num >>> 24) >>> 0;
    tt[1] = ((num << 8) >>> 24) >>> 0;
    tt[2] = (num << 16) >>> 24;
    tt[3] = (num << 24) >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
}




//实现checkbox全选与全不选  -  注意有更好的方法
function checkAll() {
    var selectall = document.getElementById("selectall");
    var allbox = document.getElementsByName("allbox");
    if (selectall.checked) {
        for (var i = 0; i < allbox.length; i++) {
            allbox[i].checked = true;
        }
    } else {
        for (var i = 0; i < allbox.length; i++) {
            allbox[i].checked = false;
        }
    }
}



//用户判断给定的对象是否是数组
function isArray(o){
    return Object.prototype.toString.call(o)==='[object Array]';
}
// demo：
isArray("str");  //false
isArray([1,2]);  //true



//判断检查数组中是否存在某个值
Array.prototype.inArray = function(e) {
    for(i=0;i < this.length;i++)
    {
        if(this[i] == e)
        return true;
    }
    return false;
}
// demo:
[1,2].inArray(1);  //true



//用来显示或隐藏一个DOM元素
function toggle(obj){
    var el = document.getElementById(obj);
    if ( el.style.display != 'none' ) {
        el.style.display = 'none';
    }
    else {
        el.style.display = '';
    }
}
// demo:
oDiv.onclick = toggle("id");



//加载样式文件
function LoadStyle(url) {
    try {
        document.createStyleSheet(url)
    } catch(e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink)
    }
}
// demo:
LoadStyle("css/style.css");



//清除脚本内容
function stripscript(s) {
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}



//解析获取URL参数
function getUrlParm(url, parm) {
    var thisUrl=url;
    var parmValue="";
    var re=new RegExp(parm+"=.*", "i");
    var mResult=re.exec(thisUrl);
    if(mResult!=null){
        mResult=mResult[0];
        alert(mResult);
        if(mResult.indexOf("&")!=-1)
            mResult=mResult.split("&")[0];
        alert(parm+" value is "+mResult.split("=")[1]);  //return mResult.split("=")[1];
    }
}
// demo:
getUrlParm("http://www.xuanfeng.com/login?user=chris","user");
// user=chris
// user value is chris



//判断是否为有效的数字
var i = 123; var str = "string";
if( typeof i == "number" ){ } //true
//某些方法(如:parseInt,parseFloat)会返回一个特殊的值NaN(Not a Number)
//请注意第2点中的[注意],此方法不完全适合判断一个字符串是否是数字型!!
i = parseInt(str);
if( isNaN(i) ){ }  //true



//获取时间的某部份
var myDate = new Date();
myDate.getYear(); //获取当前年份(2位)
myDate.getFullYear(); //获取完整的年份(4位,1970-????)
myDate.getMonth(); //获取当前月份(0-11,0代表1月)
myDate.getDate(); //获取当前日(1-31)
myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours(); //获取当前小时数(0-23)
myDate.getMinutes(); //获取当前分钟数(0-59)
myDate.getSeconds(); //获取当前秒数(0-59)
myDate.getMilliseconds(); //获取当前毫秒数(0-999)
myDate.toLocaleDateString(); //获取当前日期
myDate.toLocaleTimeString(); //获取当前时间
myDate.toLocaleString( ); //获取日期与时间



//事件源对象
event.srcElement.tagName
event.srcElement.type

// 捕获释放
event.srcElement.setCapture();
event.srcElement.releaseCapture();

// 事件按键
event.keyCode
event.shiftKey
event.altKey
event.ctrlKey

// 事件返回值
event.returnValue

// 鼠标位置
event.x
event.y



//元素显示的通用方法
function $(id) {
    return !id ? null : document.getElementById(id);
}
function display(id) {
    var obj = $(id);
    if(obj.style.visibility) {
        obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
    } else {
        obj.style.display = obj.style.display == '' ? 'none' : '';
    }
}



//实现字符串长度截取并在结尾添加…
function cutstr(str, len) {
    var temp;
    var icount = 0;
    var patrn = /[^\x00-\xff]/;  //表示汉字或者全角，即ASCII 编码不在0-255的字符
    var strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len) {
            // 每次截取一个字符
            temp = str.substr(i, 1);
            if (patrn.exec(temp) == null) {
                // 如果是英文、半角
                icount = icount + 1
            } else {
                // 如果是中文、全角
                icount = icount + 2
            }
            // 字符串连接
            strre += temp
        } else {
            break
        }
    }
    return strre + "..."
}
// demo:
cutstr("xuanfeng", 2)  //xu...
cutstr("轩枫阁", 3)    //轩枫...



//获取主域名
function getHost(url) {
    var host = "null";
    if(typeof url == "undefined"|| null == url) {
        url = window.location.href;
    }
    var regex = /^\w+\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined" && null != match) {
        host = match[1];
    }
    return host;
}
// demo:
getHost("http://www.xuanfengge.com/page/2")   //www.xuanfengge.com




//清除左右空格
String.prototype.trim=function(){
　　return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){
　　return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
　　return this.replace(/(\s*$)/g,"");
}
// demo:
" xuanfeng    ".trim()  //xuanfeng
"  xuanfengge".ltrim()  //xuanfengge
"chrislee    ".rtrim()  //chrislee



//替换全部
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
}
// demo:
"哈哈哈".replaceAll('哈','呵')   //呵呵呵



//转义html标签
function HtmlEncode(text) {
    return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
// demo:
HtmlEncode("<html></html>");    //&lt;html&gt;&lt;/html&gt;



//还原html标签
function HtmlDecode(text) {
    return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}
// demo:
HtmlDecode("&lt;html&gt;&lt;/html&gt;");    //<html></html>



//时间日期格式转换
Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
}
// demo:
var date = new Date();
date.Format("YYYY-M-D");    //2013-5-8
date.Format("YYYY-MM-DD");  //2013-11-08



//判断是否为数字类型
function isDigit(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
// demo:
isDigit("sdf");     //false
isDigit(12);        //true



//设置cookie值
function setCookie(name, value, Hours) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=xuanfengge.com;"
}



//获取cookie值
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}



//”金钱“格式转换
//运用点：所谓的金钱格式转换就是把数字转换成三位数加一个逗号的格式，使数据变得很直观明了~
//例子：1,342就像这里的赞功能，点击之后加1，再次点击减1，很简单实现。但是数据是字符串的，加减钱需要用正则转换成数字，但是再显示最后结果时，也需要再次转换成金钱的格式，再通过ajax实现数据的交互。下面来看下怎么实现的 这个是正则，把字符串转换成数字之后，能直接进行运算:如把1,561,124转换成1561124
var sLove=document.getElementById("love");  //slove = 1,561,124
var reg=sLove1.innerHTML.replace(/,/g,"");  //reg = 1561124
//下面的这个是数字转换成金钱格式的函数，也很容易理解
function formatCash(cash){
        var str_cash = cash + "";//转换成字符串
        var ret_cash = "";
        var counter = 0;
        for(var i=str_cash.length-1;i>=0;i--){
            ret_cash = str_cash.charAt(i) + ret_cash;
            counter++;
            if(counter==3){
                counter = 0;
                if(i!=0){
                ret_cash = "," + ret_cash;
                }
            }}
        return ret_cash;
    }
// demo:
var num = 1012145;
formatCash(num);   //1,012,145



//window.onload使用多次
//运用点：window.onload只能使用一次，而不像JQ那样能只用多次，下面的这个函数就可以实现多次使用onload的功能
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
// demo：
addLoadEvent(fnName);  //可使用多次



//insertafter在结点后面插入内容
//运用点：js给我们提供了insertbefore，没有before，下面这个函数就实现了这个功能
function insertAfter(newElement,targetElement){
  	var parent=targetElement.parentNode;
  	if(parent.lastChild==targetElement){
    	parent.appendChild(newElement);
	} else{
  		parent.insertBefore(newElement,targetElement.nextSibling);
  	}
}



//随机数生成
var rnd = Math.random(); //返回0-1之间的任意小数
var rnd = Math.floor(Math.random() * n); //返回0-n之间的任意整数(不包括n)


//X进制数字的转换
var i = parseInt("0x1f",16); //31
var i = parseInt(i,10); //31
var i = parseInt("11010011",2); //211



//格式化显示数字
var i = 3.14159;
//格式化为两位小数的浮点数
var str = i.toFixed(2); //结果: "3.14"
//格式化为五位数字的浮点数(从左到右五位数字,不够补零)
var str = i.toPrecision(5); //结果: "3.1415"



//小数转整数
var f = 1.5;
var i = Math.round(f); //结果:2 (四舍五入)
var i = Math.ceil(f); //结果:2 (返回大于f的最小整数)
var i = Math.floor(f); //结果:1 (返回小于f的最大整数)



//异常捕获
try{ expression } catch(e){ } finally{}

//不处理任何异常
window.onerror = doNothing;
function doNothing(){ return true; }

//异常类可用的属性
//description : 异常描述(IE,NN)
//fileName : 异常页面URI(NN)
//lineNumber : 异常行数(NN)
//message : 异常描述(IE,NN)
//name : 错误类型(IE,NN)
//number : 错误代码(IE)

//错误信息(兼容所有浏览器)
try{}
catch(e){
    var msg = (e.message) ? e.message : e.description;
    alert(msg);
}



//延迟函数调用
var tId = setTimeout("myFun()",1000); //延迟1000毫秒后再调用myFun()函数
function myFun(){
    //do something
    clearTimeout(tId); //销毁对象
}



//字符串与数字间的转换
var i = 1;
var str = i.toString(); //结果: "1"
var str = new String(i); //结果: "1"
i = parseInt(str); //结果: 1
i = parseFloat(str); //结果: 1.0
//注意: parseInt,parseFloat会把一个类似于"32G"的字符串,强制转换成32
