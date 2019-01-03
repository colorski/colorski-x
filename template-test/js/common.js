"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 xxx
 * @联系 ww
 * @邮箱 290518066@qq.com
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/

var ski = {
	dom:{
		//use jquery-1.12.3.min.js
	},
	cmn:{
		//common function
	},
	ind:{
		//individual function
	}
};

ski.cmn = {
	rdm:function(n,m){
		return parseInt(Math.random()*(m-n))+n;
	},
	toDbl:function(n){
		return n<10?'0'+n:''+n;
	}
};


//公共部分执行
ski.cmn.rdm(30,100);
