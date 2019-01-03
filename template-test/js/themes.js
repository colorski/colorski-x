$(document).ready(function(){
	//获取颜色值-这个值是从用户后台传过来的 主色调值和被选中色调值 类似这样：#agb23k  #algj4k;
	var skin=$("#skin").val();
	var choose_skin=$("#choose_skin").val();

	if(skin==undefined || choose_skin==undefined || skin=='' || choose_skin==''){
		//没做修改时使用默认样式，这一步可以不要，把themes.css作为一个基础样式放到页面中，只要else的情况，
		//即：if(skin!=undefined || choose_ski!=undefined) {public_themes(skin,choose_skin)}
		//导入样式
		link_css();
	}else{
		//如果做了修改，取得那两个值，执行下边的函数
		//公共区域风格
		public_themes(skin,choose_skin);
		
		//调用改变页眉风格的方法
		head_themes(skin,choose_skin);
		
		//导入样式？这个还有必要导入吗？
		link_css();
	}
});


//改变公共区域风格
function public_themes(skin,choose_skin){
	var style='';
	//首页-滑动效果
	style+='.main-con .sec-ul li a:hover{color:'+skin+';}';
	//搜索框
	style+='.database-search{background-color:'+skin+' !important;}';
	
	$("style").append(style);
	
}

//改变页眉页脚风格
function head_themes(skin,choose_skin){	
	//页眉风格
	var style='';
	style+='.head{background-color:'+skin+' !important;}';
	//页脚风格
	style+='.footer{background-color:'+skin+' !important;}';
	
	$("style").append(style);
}

//导入样式
function link_css(){
	$("body").append('<link href="/css/themes.css" rel="stylesheet" type="text/css">');
}





