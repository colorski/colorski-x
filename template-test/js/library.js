//www.zujuan.com
//writer:sanjer
//date:2010.4.27

//扩展Jquery类对字符串/数值/数组的一些常用方法
(function ($) {
    $.extend({

        //获取随机数字
        getRnd: function (len) {
            if ($.isNullOrEmpty(len)) { len = 5; }
            return parseFloat(Math.random()).toFixed(len).toString().replace("0.", "");
        },
        //获取n-m的随机数 宁荣江-2014-7-7
        getRandRange: function (n, m) {
            var c = m - n + 1;
            return Math.floor(Math.random() * c + n);
        },
        //获取url中的参数值 宁荣江-2014-7-29
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },

        //读写小数据量缓存
        setcache: function (cachename, data) {
            if ($("#" + cachename).length > 0) {
                $("#" + cachename).attr("value", data);
            }
            else {
                //$("body").append("<input id='" + cachename + "' style='display:none;' value='" + data + "' />");
                $("body").append("<textarea id='" + cachename + "' style='display:none;'>" + data + "</textarea>");
            }

        },
        getcache: function (cachename) {
            return $("#" + cachename).attr("value");
        },
        delcache: function (cachename) {
            if ($("#" + cachename).length > 0) { $("#" + cachename).remove(); }
        },
        // '1' 转换为 '一' ...
        numToChar: function (number) {
            var numCn = "";
            var array = "一,二,三,四,五,六,七,八,九,十,十一,十二,十三,十四,十五,十六,十七,十八,十九,二十,廿一,廿二,廿三,廿四,廿五,廿六,廿七,廿八,廿九,三十,卅一,卅二,卅三,卅四,卅五,卅六,卅七,卅八,卅九,X".split(",");
            if (number < 1) { number = 1; }
            if (number > 40) { number = 40; }
            return array[number - 1];
        },
        //获取当前时间
        getDateTime: function () {
            var d = new Date();
            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        },

        //获取某日期星期几
        getDateWeek: function (date, defaultStr) {
            var d = new Date(date.replace(/-/ig, "/"));
            var weekStr = "日,一,二,三,四,五,六".split(",");
            if ($.isNullOrEmpty(defaultStr)) { defaultStr = "星期"; }
            return defaultStr + weekStr[new Date().getDay()];
        },

        getDateDiff: function (strInterval, date1, date2) {
            date1 = date1.replace(/-/ig, "/");
            date2 = date2.replace(/-/ig, "/");
            var dtStart = new Date(date1);
            var dtEnd = new Date(date2);
            if (dtEnd < dtStart) {
                var dtTmp = dtStart;
                dtStart = dtEnd;
                dtEnd = dtTmp;
            }
            switch (strInterval) {
                case "s": return parseInt((dtEnd - dtStart) / 1000);
                case "n": return parseInt((dtEnd - dtStart) / 60000);
                case "h": return parseInt((dtEnd - dtStart) / 3600000);
                case "d": return parseInt((dtEnd - dtStart) / 86400000);
                case "w": return parseInt((dtEnd - dtStart) / (86400000 * 7));
                case "m": return dtEnd.getMonth() - dtStart.getMonth();
                case "y": return dtEnd.getFullYear() - dtStart.getFullYear();
            }
        },

        //nrj 2015-1-22 计算时间间隔，有正负之分
        getDateDiff2: function (strInterval, date1, date2) {
            date1 = date1.replace(/-/ig, "/");
            date2 = date2.replace(/-/ig, "/");
            var dtStart = new Date(date1);
            var dtEnd = new Date(date2);
            switch (strInterval) {
                case "s": return parseInt((dtEnd - dtStart) / 1000);
                case "n": return parseInt((dtEnd - dtStart) / 60000);
                case "h": return parseInt((dtEnd - dtStart) / 3600000);
                case "d": return parseInt((dtEnd - dtStart) / 86400000);
                case "w": return parseInt((dtEnd - dtStart) / (86400000 * 7));
                case "m": return dtEnd.getMonth() - dtStart.getMonth();
                case "y": return dtEnd.getFullYear() - dtStart.getFullYear();
            }
        },

        timeDiff: function (date1, date2) {

            var daydiff = $.dateDiff(date1, date2);
            if (daydiff == "今天") {
                var hourDiff = $.getDateDiff("h", date1, date2);
                var minuteDiff = $.getDateDiff("n", date1, date2);
                var secondDiff = $.getDateDiff("s", date1, date2);

                if (hourDiff > 0) { return hourDiff + "小时前"; }
                if (minuteDiff > 0) { return minuteDiff + "分钟前"; }
                else { return secondDiff + "秒钟前"; }
            } else {
                return daydiff;
            }
        },

        dateDiff: function (date1, date2) {
            //2010-9-4 18:00:80 初,末时间
            var array1 = date1.split(" ")[0].split("-");
            var array2 = date2.split(" ")[0].split("-");

            var date1year = array1[0];
            var date1month = array1[1];
            var date1date = array1[2];

            var date2year = array2[0];
            var date2month = array2[1];
            var date2date = array2[2];

            if (date2year > date1year) { return (date2year - date1year) + "年前"; }
            if (date2month > date1month) { return (date2month - date1month) + "个月前"; }

            var datediff = (date2date - date1date);
            switch (datediff) {
                case 0: return "今天"; break;
                case 1: return "昨天"; break;
                case 2: return "前天"; break;
                case 3: return "大前天"; break;
                default: return datediff + "天前"; break;
            }
        },

        formatUTC: function (utcDate, format) {
            if (!utcDate) {
                return '';
            }
            var date = new Date(parseInt(utcDate.replace("/Date(", "").replace(")/", ""), 10));
            var year = date.getFullYear();
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            var datastr = year + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + second;
            return this.formatDateTime(datastr, format);
        },

        //日期形式格式化实现C#中yyyy-MM-dd hh:mm:ss自定义
        formatDateTime: function (str, format) {
            var date = new Date(str.split("-").join("/"));
            if (date.toString() == "NaN" || date.toString() == "Invalid Date") { return ""; }
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds()
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        },

        //将json格式的字符串转为json对象{}
        json: function (jsonStr) {
            return eval("(" + jsonStr + ")");
        },

        //字符串替换，正则匹配替换
        replace: function (text, oldStr, newStr) {
            var reg = new RegExp(oldStr, "g");
            return text.replace(reg, newStr);
        },

        //字符串字节长度，1个中文或全角字符是2字节
        bLength: function (str) {
            var len = 0;
            if (!str) { return 0; }
            var str = str.replace(/(^\s*)|(\s*$)/g, "");
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) { len++; } else { len += 2; }
            }
            return len;
        },
        // 截取字符串
        stringCut: function (value, maxLength, suffix) {
            if (value.length <= maxLength)
                return value;
            else
                return value.substr(0, maxLength) + suffix;
        },
        //清除字符串中的html标签   宁荣江2014-7-4
        htmlClear: function (str) {
            return str.replace(/<[^>]+>/g, "");
        },
        //html编码
        htmlEncode: function (str) {
            return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&#34;").replace(/\'/g, "&#39;");
        },
        //html解码
        htmlDecode: function (str) {
            return str.replace(/\&amp\;/g, '\&').replace(/\&gt\;/g, '\>').replace(/\&lt\;/g, '\<').replace(/\&quot\;/g, '\'').replace(/\&\#39\;/g, '\'');
        },
        //是否字符串或数组是否为空
        isNullOrEmpty: function (str) {
            return (str == null
                    || typeof str == "NaN"
                    || typeof str == "undefined"
                    || str.length == 0) ? true : false;
        },

        isStrInLength: function (str, minLen, maxLen) {
            if (parseInt(maxLen) != maxLen || parseInt(minLen) != minLen) { return null; }
            if (maxLen < minLen) {
                var tmp = maxLen;
                maxLen = minLen;
                minLen = tmp;
            }
            if (str == null || str == undefined) { return false; };
            if (str.length > maxLen) { return false; };
            if (str.length < minLen) { return false; };
            return true;
        },

        //是否整数：0,正整数，负整数
        isInt: function (str) {
            return (str % 1 == 0 ? true : false); //return /^\-?\d+$/.test(num);
        },
        //是否是正整数
        //symbol不指定时表示不按正号前导符匹配，?表示模糊正号前导符匹配，+表示一定要有正号前导符
        isPositiveInt: function (str, symbol) {
            if ($.isNullOrEmpty(str)) { return false; }
            switch (symbol) {
                case "+": return /^\+[1-9][0-9]*$/.test(str); break;
                case "?": return /^\+?[1-9][0-9]*$/.test(str); break;
                default: return /^[1-9][0-9]*$/.test(str); break;
            }
        },
        //非负整数(正整数和零)
        isPositiveIntOrZero: function (str, symbol) {
            switch (symbol) {
                case "+": return (/^\+[1-9][0-9]*$/.test(str) || str == 0); break;
                case "?": return (/^\+?[1-9][0-9]*$/.test(str) || str == 0); break;
                default: return (/^[1-9][0-9]*$/.test(str) || str == "0"); break;
            }
        },
        //是否是金额
        isMoney: function (str) {
            return /^(0|[1-9][0-9]*){1}(\.\d{1,2})?$/.test(str);
        },


        //精确的四则运算
        //精确加法，可类字符串数值/纯数字值
        //javascript的加法结果会有误差，在两个大浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
        accAdd: function (arg1, arg2) {
            var r1, r2, m;
            try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
            try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        },
        //精确减法
        accSub: function (arg1, arg2) {
            var r1, r2, m, n;
            try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
            try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
            m = Math.pow(10, Math.max(r1, r2));
            //last modify by deeka
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        //精确乘法
        accMul: function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try { m += s1.split(".")[1].length; } catch (e) { };
            try { m += s2.split(".")[1].length; } catch (e) { };
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },

        //精确除法
        //javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
        accDiv: function (arg1, arg2) {
            var t1 = 0, t2 = 0, r1, r2;
            try { t1 = arg1.toString().split(".")[1].length; } catch (e) { };
            try { t2 = arg2.toString().split(".")[1].length; } catch (e) { };
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * pow(10, t2 - t1);
            }
        },
        //小数四舍五入
        decRound: function (Decimal, i) {
            return Math.round(Decimal * Math.pow(10, i)) / Math.pow(10, i);
        },


        //以下对数组的操作
        //过滤数组中重复的项
        arrFilter: function (arr) {
            if (arr.length < 2) { return [arr[0]] || []; }
            var array = [];
            for (var i = 0; i < arr.length; i++) {
                array.push(arr.splice(i--, 1));
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j] == array[array.length - 1]) {
                        arr.splice(j--, 1);
                    }
                }
            }
            return array;
        },
        //返回下标从l到h的项组成的数组
        arrRange: function (arr, l, h) {
            var _a = arr; var ret = [];
            l = l < 0 ? 0 : l;
            h = h > _a.length ? _a.length : h;
            for (var i = 0; i < _a.length; i++) {
                if (i >= l && i <= h) { ret[ret.length] = _a[i]; }
                if (i > h) { break; }
            };
            return ret;
        },
        //获取项在数组中第一次出现的下标
        arrIndexOf: function (arr, item) {
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                if (item == arr[i]) { return i; }
            }
            return -1;
        },
        //根据项的下标从数组中删除
        arrDelete: function (arr, removeItemIndex) {
            if (isNaN(removeItemIndex) || removeItemIndex > arr.length) { return arr; }
            arr.splice(removeItemIndex, 1);
            return arr;
        },
        //根据项的值从数组中删除（如果有重复项也一起删除）
        arryRemove: function (arr, removeItemValue) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == removeItemValue) {
                    arr.splice(i, 1);
                }
            }
            return arr;
        },
        // 元素是否在数组中存在
        arrIsExit: function (arr, ele) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === ele) {
                    return true;
                }
            }
            return false;
        },
        // 获取url参数
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]); return '';
        }
    });
})(jQuery);

//本地Cookie操作类//方法共3个
//设置Cookie.Set("cookie名","cookie值","保存天数");
//读取Cookie.Get("cookie名");
//删除Cookie.Del("cookie名");
(function () {
    window.Cookie = (function () {
        return {
            Set: function (name, value, days) {
                var exp = new Date();
                exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=/";
            },
            Get: function (name) {
                var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null) {
                    return decodeURIComponent(arr[2]);
                }
                else {
                    return null; //unescope
                }
            },
            Del: function (name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = this.Get(name);
                if (cval != null) { document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/"; }
            }
        };
    })();
})();


//本地跨页存储Storage类//方法共4个,兼容ie6/7/8及firefox2+/3+,chrome,opera9/10,safari所有版本
//设置Storage.Set("存储区名称","存储项目名","存储内容值");
//读取Storage.Get("存储区名称","存储项目名");
//删除Storage.Del("存储区名称","存储项目名");
//清空Storage.Remove("存储区名称");

(function () {
    window.Storage = (function () {
        //有关flash的
        var flash = {
            id: "Storage_Flash_",
            path: "/Resource/Js/storage-flash.swf",
            cache: function () { return document.getElementById(this.id); },
            insert: function () {
                if (this.cache()) { return true; } //如果有了不用新建了
                var html = [];
                try {//解决遨游的一个bug
                    if (external.max_language_id != undefined) {
                        this.path += "?random=" + Math.random();
                    }
                }
                catch (ex) { }
                if ("ActiveXObject" in window) {
                    html.push("<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' " +
                    "codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/" +
                    "swflash.cab#version=10,0,0,0' id='" + this.id + "' width='1' height='1'>");
                    html.push("<param name='allowScriptAccess' value='always' />");
                    html.push("<param name='movie' value='" + this.path + "' />");
                    html.push("</object>");
                } else {
                    html.push("<embed id='" + this.id + "' name='" + this.id + "' src='" + this.path + "' " +
                    "width='1' height='1' align='middle' allowScriptAccess='always' " +
                    "type='application/x-shockwave-flash' " +
                    "pluginspage='http://www.adobe.com/go/getflashplayer_cn' />");
                };
                var container = document.createElement("div");
                container.style.position = "absolute";
                container.style.top = "-999px";
                container.innerHTML = html.join("");
                try {
                    //document.documentElement.appendChild(container);
                    document.documentElement.insertBefore(container, document.documentElement.firstChild);
                    return true;
                }
                catch (ex) { return false; }
            },
            version: function () {
                var version = 0, n = navigator;
                if (n.plugins && n.plugins.length) {
                    for (var i = 0; i < n.plugins.length; i++) {
                        if (n.plugins[i].name.indexOf("Shockwave Flash") != -1) {

                            version = n.plugins[i].description.split("Shockwave Flash")[1];
                            break;
                        }
                    }
                } else if ("ActiveXObject" in window) {
                    for (var i = 15; i > 7; i--) {
                        try {
                            if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i)) {
                                version = parseInt(i);
                                break;
                            }
                        } catch (ex) { }
                    }
                }
                return parseInt(version);
            },
            check: function () {
                var bool = false;
                if (this.version() >= 10) {
                    bool = this.insert();
                }
                return bool;
            }
        };
        var o = {
            ls: (typeof window.localStorage == "object") ? true : false, //再支持localstorage
            t: (navigator.appVersion.toString().indexOf("MSIE") > 0
                && navigator.appVersion.toString().indexOf("MSIE 9.0") < 0) ? true : false,
            //ie9以下版本,在本地无法保存，采用服务器保存的方案
            g: (window.google && google.gears && google.gears.factory.create) ? true : false, //有gears再支持gears
            gs: (typeof window.globalStorage == "object") ? true : false, //再支持globalStorage
            f: (1 == 2) ? true : false, //有flash支持flashStorage//flash.check()
            u: false  //ie9以下版本,由于不支持跨页，所以放弃
        };
        //alert(o.ls+","+o.t+","+o.g+","+o.gs);
        //gears方案
        var g = (function () {
            var db = (o.g) ? google.gears.factory.create("beta.database", "1.0") : null;
            return {
                Set: function (name, key, val) {
                    var complete = false;
                    db.open("beta.database");
                    with (db) try {
                        execute("create table if not exists storage" + name + " (itemkey text unique not null PRIMARY key,itemval text not null)");
                        var rs = execute("select itemkey from storage" + name + " where itemkey=?", [key]);
                        if (rs.isValidRow()) { execute("update storage" + name + " set itemval=? where itemkey=?", [val, key]); } else { execute("insert into storage" + name + " values (?,?)", [key, val]); };
                        rs.close();
                        complete = true;
                    } catch (e) { }; //alert(e.message);
                    db.close();
                    return complete;
                },
                Get: function (name, key) {
                    var backval = "";
                    db.open("beta.database");
                    try {
                        var rs = db.execute("select itemkey,itemval from storage" + name + " where itemkey=?", [key]);
                        if (rs.isValidRow()) {
                            backval = rs.field(1);
                            backval = (backval == null || backval == undefined) ? "" : backval;
                        }
                        rs.close();
                    } catch (e) { };
                    db.close();
                    return backval;
                },
                Del: function (name, key) {
                    var complete = false;
                    db.open("beta.database");
                    try {
                        db.execute("delete from storage" + name + " where itemkey=?", [key]);
                        complete = true;
                    } catch (e) { };
                    db.close();
                    return complete;
                },
                Remove: function (name) {
                    var complete = false;
                    db.open("beta.database");
                    try {
                        db.execute("drop table storage" + name);
                        complete = true;
                    } catch (e) { };
                    close();
                    return complete;
                }
            };
        })();

        //localStorage和globalStorage方案(二者类似firefox,chrome,opear,ie8/9支持localStorage)
        var gs, ls;
        gs = ls = (function () {
            var storage = (o.ls) ? window.localStorage : (o.gs) ? window.globalStorage[location.hostname] : null;
            return {
                Set: function (name, key, val) {
                    var loadval = storage.getItem(name);
                    if (loadval == undefined || loadval == null) {
                        storage.setItem(name, key + "=" + val);
                    } else {
                        var array = loadval.split(";");
                        var len = array.length;
                        var addnew = true;
                        for (var i = 0; i < len; i++) {
                            if (array[i].indexOf(key + "=") == 0) {
                                array[i] = key + "=" + val;
                                addnew = false;
                                break;
                            }
                        }
                        if (addnew) {
                            array.push(key + "=" + val);
                        }
                        storage.setItem(name, array.join(";"));
                    }
                    return true;
                },
                Get: function (name, key) {
                    var backval = "";
                    var loadval = storage.getItem(name);
                    if (loadval != undefined && loadval != null) {
                        var array = loadval.split(";");
                        var len = array.length;
                        for (var i = 0; i < len; i++) {
                            if (array[i].indexOf(key + "=") == 0) {
                                backval = array[i].substr(array[i].indexOf("=") + 1);
                                break;
                            }
                        }
                    }
                    return backval;
                },
                Del: function (name, key) {
                    return this.Set(name, key, "");
                },
                Remove: function (name) {
                    if (storage.getItem(name)) {
                        storage.setItem(name, "");
                    }
                    return true;
                }
            };
        })();

        //flashShare方案，flash方案有一定的局限性，需要页面加载完成后才可以使用。
        var f = (function () {
            return {
                //外部循环检查flash对象是否准备妥当
                IsReady: function () {
                    return (flash.cache().set) ? true : false;
                },
                Set: function (name, key, val) {
                    flash.cache().set(name, key, val);
                },
                Get: function (name, key) {
                    return flash.cache().get(name, key);
                },
                Del: function (name, key) {
                    return flash.cache().del(name, key);
                },
                Remove: function (name) {
                    flash.cache().remove(name);
                }
            };
        })();

        //userData方案ie6/7， 该方案不支持跨页。
        var u = (function () {
            if (o.u) document.documentElement.addBehavior("#default#userdata");
            return {
                Set: function (name, key, val) {
                    with (document.documentElement) try {
                        load(name);
                        setAttribute(key, val);
                        save(name);
                        return true;
                    }
                    catch (e) {
                        return false;
                    }
                },
                Get: function (name, key) {
                    var backval = "";
                    with (document.documentElement) try {
                        load(name);
                        backval = getAttribute(key);
                        if (backval == undefined || backval == null) { backval = ""; }
                    } catch (e) { }
                    return backval;
                },
                Del: function (name, key) {
                    return this.Set(name, key, "");
                },
                Remove: function (name) {
                    with (document.documentElement) try {
                        load(name);
                        expires = new Date(315532799000).toUTCString();
                        save(name);
                        return true;
                    }
                    catch (e) { return false; }
                }
            };
        })();

        //服务器端保存方案，在ie6.0下才是必须使用的方式
        var t = (function () {
            return {
                Set: function (name, key, val) {
                    var postdata = { "Do": "Set", name: name, Key: key, value: val };
                    var ret = false;
                    $.ajax({
                        url: "/Web/Handler1.ashx?action=SvrStorage",
                        type: "post",
                        data: postdata,
                        async: false,
                        success: function () {
                            ret = true;
                        },
                        error: function () {
                        }
                    });
                    return true;
                },
                Get: function (name, key) {
                    var postdata = { "Do": "Get", name: name, Key: key };
                    var ret = "";
                    $.ajax({
                        url: "/Web/Handler1.ashx?action=SvrStorage",
                        type: "post",
                        data: postdata,
                        async: false,
                        success: function (data) {
                            ret = data;
                        },
                        error: function () {
                        }
                    });
                    return ret;
                },
                Del: function (name, key) {
                    var postdata = { "Do": "Del", name: name, Key: key };
                    var ret = false;
                    $.ajax({
                        url: "/Web/Handler1.ashx?action=SvrStorage",
                        type: "post",
                        data: postdata,
                        async: false,
                        success: function (data) {
                            ret = true;
                        },
                        error: function () {
                        }
                    });
                    return ret;
                },
                Remove: function (name) {
                    var postdata = { "Do": "Remove", name: name };
                    var ret = false;
                    $.ajax({
                        url: "/Web/Handler1.ashx?action=SvrStorage",
                        type: "post",
                        data: postdata,
                        async: false,
                        success: function (data) {
                            ret = true;
                        },
                        error: function () {
                        }
                    });
                    return ret;
                }
            };
        })();
        //Public方法
        return {
            Set: function (name, key, val) {
                for (var s in o) {
                    if (eval("o." + s)) {
                        return (eval(s + ".Set(\"" + name + "\",\"" + key + "\",\"" + encodeURIComponent(val) + "\")"));
                    }
                }
            },
            Get: function (name, key) {
                for (var s in o) {
                    if (eval("o." + s)) {
                        return decodeURIComponent(eval(s + ".Get(\"" + name + "\",\"" + key + "\")"));
                    }
                }
            },
            Del: function (name, key) {
                for (var s in o) {
                    if (eval("o." + s)) {
                        return (eval(s + ".Del(\"" + name + "\",\"" + key + "\")"));
                    }
                }
            },
            Remove: function (name) {
                for (var s in o) {
                    if (eval("o." + s)) {
                        return (eval(s + ".Remove(\"" + name + "\")"));
                    }
                }
            },
            IsReady: function () {
                for (var s in o) {
                    if (eval("o." + s)) {
                        if (s == "f") {//flash
                            return f.IsReady();
                        } else {
                            return true;
                        }
                        //return (eval(s + ".IsReady()"));
                    }
                }
            }
        };
    })();
})();


//用户本地缓存数据读写
(function () {
    window.UserSetting = (function () {
        var storage = { id: "localCache", name: "userSet" };
        return {
            Set: function (name, value) {
                var userSetxmlstr = Storage.Get(storage.id, storage.name);
                if ($.isNullOrEmpty(userSetxmlstr)) userSetxmlstr = "<xml><setting></setting></xml>";
                var xml = window.XMLHandler;
                xml.load(userSetxmlstr);
                var node = xml.getNodesByPath("//setting/data[@name='" + name + "']")[0];
                if ($.isNullOrEmpty(node)) {
                    node = xml.createNode("<data name='" + name + "'>" + value + "</data>");
                    xml.insertNodeInBottom(xml.getNodesByName("setting")[0], node);
                } else {
                    xml.setNodeText(node, value);
                }
                Storage.Set(storage.id, storage.name, xml.string());
                return true;
            },
            Get: function (name) {
                var value = "";
                var userSetxmlstr = Storage.Get(storage.id, storage.name);
                if ($.isNullOrEmpty(userSetxmlstr)) { return value; }
                var xml = window.XMLHandler;
                xml.load(userSetxmlstr);
                var node = xml.getNodesByPath("//setting/data[@name='" + name + "']")[0];
                if ($.isNullOrEmpty(node)) { value = ""; }
                else { value = xml.getNodeText(node); }
                return value;
            },
            Del: function (name) {
                this.Set(name, "");
            },
            Destroy: function () {
                Storage.Del(storage.id, storage.name);
                return true;
            }
        };
    })();
})();

//用户本地缓存数据读写
(function () {
    window.VisitorSetting = (function () {
        var storage = { id: "localCache1", name: "visitorSet" };
        return {
            Set: function (name, value) {
                var userSetxmlstr = Storage.Get(storage.id, storage.name);
                if ($.isNullOrEmpty(userSetxmlstr)) userSetxmlstr = "<xml><setting></setting></xml>";
                var xml = window.XMLHandler;
                xml.load(userSetxmlstr);
                var node = xml.getNodesByPath("//setting/data[@name='" + name + "']")[0];
                if ($.isNullOrEmpty(node)) {
                    node = xml.createNode("<data name='" + name + "'>" + value + "</data>");
                    xml.insertNodeInBottom(xml.getNodesByName("setting")[0], node);
                } else {
                    xml.setNodeText(node, value);
                }
                Storage.Set(storage.id, storage.name, xml.string());
                return true;
            },
            Get: function (name) {
                var value = "";
                var userSetxmlstr = Storage.Get(storage.id, storage.name);
                if ($.isNullOrEmpty(userSetxmlstr)) { return value; }
                var xml = window.XMLHandler;
                xml.load(userSetxmlstr);
                var node = xml.getNodesByPath("//setting/data[@name='" + name + "']")[0];
                if ($.isNullOrEmpty(node)) { value = ""; }
                else { value = xml.getNodeText(node); }
                return value;
            },
            Del: function (name) {
                this.Set(name, "");
            },
            Destroy: function () {
                Storage.Del(storage.id, storage.name);
                return true;
            }
        };
    })();
})();



//xml操作助手类，兼容ie6/7/8/9及firefox2+/3+,chrome,opera9/10,safari所有版本
//提供xml格式的字符串与xmldocument相互转换，及对xml对象的常用操作
//方法共19个
//示例:
//var xml=window.XMLHandler;
//xml.load(str);//载入字符串str(str必须有根元素)为xml对象，并返回xml对象
//xml.xmlDoc();//获取xml对象;
//xml.string();//获取xml对象的字符串格式，返回string
//xml.getNodesByName(name);//按元素名称获取节点集合
//xml.getNodesByName(name)[0];//获取第一个
//xml.getNodesByPath(xpath);//根据xpath获取节点集合
//xml.getNodesByPath(xpath)[0];//获取第一个

(function () {
    window.XMLHandler = (function () {
        var xmlDocument;
        return {
            //载入字符串并返回xmlDocument对象
            load: function (str) {
                var error = false;
                str = str.replace(/(^\s*)|(\s*$)/g, "");
                if ("ActiveXObject" in window) {//ie
                    var m = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument", "Microsoft.XMLDOM"];
                    for (var i = 0; i < m.length; i++) {
                        try { xmlDocument = new ActiveXObject(m[i]); } catch (e) { }
                        if (xmlDocument) { xmlDocument.loadXML(str); break; }
                    }
                    if (typeof xmlDocument == "undefined" || xmlDocument.xml == "") { error = true; }
                } else {
                    xmlDocument = (new DOMParser()).parseFromString(str, "text/xml");
                    if (new XMLSerializer().serializeToString(xmlDocument).indexOf("parsererror") > 0) { error = true; }
                }
                if (error) {
                    xmlDocument = undefined;
                    alert("请检查字符格式是否正确！");
                }

                return xmlDocument;
            },

            //返回xmlDocument对象
            xmlDoc: function () {
                if (xmlDocument) return xmlDocument;
            },

            //将对象输出成string
            string: function () {
                if (xmlDocument) return ("ActiveXObject" in window) ? xmlDocument.xml : new XMLSerializer().serializeToString(xmlDocument);
            },


            //通过元素名称获取节点集合
            getNodesByName: function (name) {
                if (xmlDocument) return xmlDocument.getElementsByTagName(name);
            },

            //通过xpath路径获取节点集合
            getNodesByPath: function (xpath) {
                if ("ActiveXObject" in window) {
                    if (xmlDocument) return xmlDocument.selectNodes(xpath); //selectNodes//selectSingleNode
                }
                else if (xmlDocument && window.XPathEvaluator) {
                    var oEvaluator = new XPathEvaluator();
                    var oResult =
                        oEvaluator.evaluate(xpath, xmlDocument, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                    var aNodes = new Array;
                    if (oResult != null) {
                        var oElement;
                        while (oElement = oResult.iterateNext()) { aNodes.push(oElement); }
                    }
                    return aNodes;
                } else {
                    //2012.7.11添加
                    //考虑手机安卓的浏览器不支持xpath组件，自实现一个简单的xpath功能
                    //支持的xpath仅为//xmlPaper/body/part/partBody[@name='xxx']的格式

                    xpath = xpath.replace(/\/\//g, "").replace(/\\/g, "/").replace(/'/g, "").replace(/\"/g, "");
                    var xpart = (xpath.indexOf("/") > 0) ? (xpart = xpath.substring(0, xpath.indexOf("/"))) : xpath;
                    var selectNodeName = xpart.split("[")[0];
                    var selectNodeAttrName = xpart.substring(xpart.indexOf("@") + 1, xpart.indexOf("="));
                    var selectNodeAttrValue = xpart.substring(xpart.indexOf("=") + 1, xpart.indexOf("]"));

                    var refNodes = (arguments[1] == undefined)
                    ? xmlDocument.getElementsByTagName(selectNodeName) : arguments[1];
                    var nextNodes = [];
                    var tmpNodes = [];

                    for (var i = 0, len = refNodes.length; i < len; i++) {
                        var node = refNodes[i];
                        if ((node.nodeName == selectNodeName)
                        && ((selectNodeAttrName.length == 0)
                        || (this.getNodeAttrByName(node, selectNodeAttrName) == selectNodeAttrValue))) {
                            tmpNodes.push(node);
                            var nodes = node.childNodes;
                            for (var j = 0; j < nodes.length; j++) {
                                nextNodes.push(nodes[j]);
                            }
                        }
                    }

                    xpath = xpath.substr(xpath.indexOf("/") + 1);
                    if (xpath == xpart) {
                        return tmpNodes;
                    }
                    else {
                        return this.getNodesByPath(xpath, nextNodes);
                    }
                }
            },

            //新建一个(孤)节点，需要通过insert方法插入才生效
            createNode: function (str) {
                if (!xmlDocument) { return; }
                var node;
                if (/^<([^<^>]*)>([^<^>]*)<\/([^<^>]*)>$/.test(str)) {
                    var elename = RegExp.$3;
                    var eletext = RegExp.$2;
                    var attr = RegExp.$1.replace(RegExp.$3, "");
                    var node = xmlDocument.createElement(elename);
                    if (node.text == "") { node.text = eletext; } else { node.textContent = eletext; }
                    var attrList = attr.split(" ");
                    var len = attrList.length;
                    for (var i = 0; i < len; i++) {
                        var str = attrList[i];
                        if (str) {
                            var Lastr = (str.substr(str.length - 1));
                            if (Lastr != "'" && Lastr != "\"") {
                                if ((i + 1) < len) attrList[i + 1] = attrList[i] + " " + attrList[i + 1]; continue;
                            }
                            var _name = str.substr(0, str.indexOf("=")).replace(/\r/, "").replace(/\n/, "");
                            var _value = str.substr(str.indexOf("=") + 1);
                            if (new RegExp(/^['|""]?([\s\S]*)['|""]$/).test(_value)) { _value = RegExp.$1; }
                            node.setAttribute(_name, _value);
                        }
                    }
                } else {
                    alert("请检查字符格式是否正确！");
                }
                return node;
            },

            //在某节点的下级插入新节点到最前位置.内插入
            insertNodeInTop: function (parentNode, newNode) {
                if (!parentNode || !newNode) return false;
                if (parentNode.childNodes.length == 0) {
                    parentNode.appendChild(newNode);
                } else {
                    var referNode = parentNode.childNodes[0];
                    return this.insertNodeBefore(referNode, newNode);
                }
                return true;
            },

            //在某节点的下级插入新节点到最后位置.内插入
            insertNodeInBottom: function (parentNode, newNode) {
                if (!parentNode || !newNode) return false;
                parentNode.appendChild(newNode);
                return true;
            },

            //在参考节点之后插上新节点.平级插入
            insertNodeAfter: function (referNode, newNode) {
                if (!referNode || !newNode) return false;
                var parentNode = referNode.parentNode;
                if (!parentNode) return false;
                referNode = referNode.nextSibling; //插入焦点下移一个节点
                if (referNode) {//如果有下一个节点
                    parentNode.insertBefore(newNode, referNode);
                } else {//否则就直接后缀新节点
                    parentNode.appendChild(newNode);
                }
                return true;
            },

            //在参照节点之前插上新节点.平级插入
            insertNodeBefore: function (referNode, newNode) {
                if (!referNode || !newNode) return false;
                var parentNode = referNode.parentNode;
                if (!parentNode) return false;
                parentNode.insertBefore(newNode, referNode);
                return true;
            },


            //同级内上移节点.平级上移
            moveNodeUp: function (node) {
                var parentNode = node.parentNode;
                if (parentNode) {
                    var prevnode = node.previousSibling; //上一个节点
                    this.insertNodeBefore(prevnode, node);
                }
            },

            //下移节点.平级下移
            moveNodeDn: function (node) {
                var parentNode = node.parentNode;
                if (parentNode) {
                    var nextnode = node.nextSibling; //下一个节点
                    return this.insertNodeAfter(nextnode, node);
                }
            },

            //两节点对调.平级交换//function(node1,node2)，function(node2,node1)效果一样
            exChangeNode: function (node1, node2) {
                if (!node1 || !node2) return false;
                if (!node1.parentNode || !node2.parentNode) return false;
                if (node1.parentNode.nodeName != node2.parentNode.nodeName) return false; //防交叉交换
                var tmpNode = this.createNode("<tmp></tmp>"); //alert("创建临时node后："+this.string());
                this.insertNodeBefore(node2, tmpNode); //alert("插入临时node到node2之前变成："+this.string());
                this.replaceNode(node1, node2); //alert("将node2替换node1变成："+this.string());
                this.replaceNode(tmpNode, node1); //alert("将node1替换临时node变成："+this.string());
                return true;
            },

            //替换节点
            replaceNode: function (oldNode, newNode) {
                if (!oldNode || !newNode) return false;
                var parentNode = oldNode.parentNode;
                if (!parentNode) return false;
                parentNode.replaceChild(newNode, oldNode);
                return true;
            },

            //移除节点
            removeNode: function (node) {
                if (!node) return false;
                var parentNode = node.parentNode;
                if (!parentNode) return false;
                parentNode.removeChild(node); return true;
            },


            //获取某节点某属性
            getNodeAttrByIndex: function (node, attrindex) {
                if (node) return node.attributes[attrindex].value;
            },


            getNodeAttrByName: function (node, attranme) {
                var nodexml = this.getNodeString(node);
                if (!node || !nodexml) return;
                var array = nodexml.split("=\"");
                for (var i = 0; i < array.length; i++) {
                    var indx = (array[i].indexOf(attranme));
                    if (array[i].replace(array[i].substr(0, indx), "") == attranme) {
                        return this.getNodeAttrByIndex(node, i);
                    }
                }
            },

            //修改节点内文本
            setNodeText: function (node, text) {
                if (!node) return false;
                if ("ActiveXObject" in window) { node.text = text; } else { node.textContent = text; }
                return true;
            },

            //获取节点内文本
            getNodeText: function (node) {
                if (node) return ("ActiveXObject" in window) ? node.text : node.textContent;
            },
            //将节点转成字符串输出
            getNodeString: function (node) {
                if (node) return ("ActiveXObject" in window) ? node.xml : new XMLSerializer().serializeToString(node);
            }
        };
    })();
})();

var loadXML = function (xmlFile) {
    var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM'); //IE浏览器
        xmlDoc.async = false;
        xmlDoc.load(xmlFile);
    }
    else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) { //火狐浏览器
        //else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
        xmlDoc = document.implementation.createDocument('', '', null);
        xmlDoc.load(xmlFile);
    }
    else { //谷歌浏览器
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", xmlFile, false);
        xmlhttp.send(null);
        if (xmlhttp.readyState == 4) {
            xmlDoc = xmlhttp.responseXML.documentElement;
        }
    }

    return xmlDoc;
};
// 首先对xml对象进行判断
var checkXMLDocObj = function (xmlFile) {
    var xmlDoc = loadXML(xmlFile);
    if (xmlDoc == null) {
        alert('您的浏览器不支持xml文件读取,于是本页面禁止您的操作,推荐使用IE5.0以上可以解决此问题!');
        // window.location.href = '../err.html';

    }
    return xmlDoc;
};
var getImgPath = function (keyvalue) {
    var xmldoc = checkXMLDocObj("image.xml");
    var apps = xmldoc.getElementsByTagName("add");
    var imgpath = "";
    for (var i = 0; i < apps.length; i++) {
        if (apps[i].attributes["key"].value == keyvalue) {
            imgpath = apps[i].attributes["value"].value;
        }
    }
    return imgpath;
};

// 公用方法
function logindiv() {
    // dplus代码
    if (dplus_isWork()) {
        dplus.track("打开登陆窗口");
    }
    // 单点登录
    var back = "https://sso.zxxk.com/login?service=" + window.location.href;
    location.href = back;

    //    var title = "登录";
    //    var width = 675;
    //    var content = [];
    //    content.push("<div><iframe width=\"100%\" src=\"/Login.aspx\" frameborder=\"0\" srcoll=\"no\" height=\"354\"></div>");
    //    new Dialog(content.join(""), { title: title, dialogWidth: width + "px" }).show();

}


/**
判断dplus是否可用 by hpy
为dplus埋码功能添加开关功能，
默认插件可用时开启功能，不可用关闭功能。
或手动配置 return false;  就关闭所有记录的功能。
*/
function dplus_isWork() {
    return typeof dplus === 'object';
}

// 下载完试卷后给阅卷通发送数据
function sendDataYjt(downid) {
    if (checkIs_Yjt()) {
        var key = Cookie.Get("yjt_key");
        var id = Cookie.Get("yjt_id");
        var sendData = { downid: downid, key: key, id: id };
        $.ajax({
            type: 'get',
            url: 'http://118.26.233.118:8011/YueJuanTong/QuestionCard/CreateCarByDownloadId',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: "callback",
            data: sendData,
            success: function (data) {
                var _ = 0;
            }
        });
    }
}

// 检查是否是阅卷通的用户过来
function checkIs_Yjt() {
    var yjt_key = Cookie.Get('yjt_key');
    return (typeof yjt_key === "string" && yjt_key.length > 0);
}


// 公用方法end

/*#region CAS-SSO-同步登陆信息*/

//退出
function CloseWin() {
    window.location.href = "/Web/Handler6.ashx";
}

$(function () {
    $('body').append('<div id="userState"><div>');
    var frame = $('<iframe id="csflagid" style="display:none;" width="460px" ></iframe>').attr("src", "/SSOPage.aspx").appendTo($('#userState'));
    frame.load(function () {
        try {
            var contentType = this.contentDocument.contentType; //若同域则不报错不进入catch，若报错则非同域显示的内容是302主站的页面
            if (isvisitor) {
                $.get('/SSOPage.aspx', function (data) {
                    if (data == 'true') window.location.reload();
                });

            }
        } catch (e) { //跨域无法访问
            //console.info("该用户在各分站均为登陆过，显示主站登陆的iframe登陆窗体");
        }
    });
});
/*#endregion CAS-SSO-同步登陆信息*/
