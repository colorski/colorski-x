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
	cmn:{}
};

//弹出框可推拽函数
function alertDrag(){
	$('body').delegate('.alertTip h6','mousedown',function(e){
		var $box = $(this).parent('.alertTip');
		var o = $box.offset();
		var x = e.pageX - o.left;
		var y = e.pageY - o.top;
		//防止超出屏幕
		var iBoxWidth = $box.width();
		var iBoxHeight = $box.height();
		var iMarL = Math.abs(parseInt($box.css("marginLeft")));
		var iMarT = Math.abs(parseInt($box.css("marginTop")));
		var iWinWidth = $(window).width();
		var iWinHeight = $(window).height();
		var scroll_h = $(window).scrollTop(); //注意有滚动高度

		$(document).bind('mousemove',function(ev){
			$box.stop();
			var _x = ev.pageX - x;
			var _y = ev.pageY - y - scroll_h;
			//防止超出屏幕的判断
			/*if(_x<0){_x=0}
			if(_x>iWinWidth-iBoxWidth){_x=iWinWidth-iBoxWidth}
			if(_y<0){_y=0}
			if(_y>iWinHeight-iBoxHeight){_y=iWinHeight-iBoxHeight}*/

			$box.animate({left:_x+iMarL+'px',top:_y+iMarT+'px'},0);
			return false;//防止出现选择文字的情况
		});
		$(document).mouseup(function(){
			$(this).unbind('mousemove');
		});
	});
};

ski.cmn = {
	//n-m之间的随机数（默认0-10，包括n不包括m）
	rdm:function(n,m){
		n = n || 0;
		m = m || 10;
		return parseInt(Math.random()*(m-n))+n;
	},
	//补零函数
	toDbl:function(n){
		return n<10?'0'+n:''+n;
	},

	//tab
	tab:function(id){
		var $A = $(id).children('.tab_top').children('a');
		var $List = $(id).children('.tab_listem').children('.tab_list');
		$A.hover(function() {
			$(this).addClass('on').siblings().removeClass('on');
			var index = $(this).index();
			$List.eq(index).show().siblings('.tab_list').hide();
		});
	},

	//goTop
	goTop:function(id){
		var $obj = $(id);
		var $win = $(window);
		$win.scroll(function(){
			$win.scrollTop()>350 ? $obj.fadeIn(500):$obj.fadeOut(300);
        });
		$obj.click(function() {
			$('body,html').animate({scrollTop:0},500);
            return false;
		});
	},

	//banner
	banner:function(){
		var numpic = $("#slides li").size() - 1;
		var nownow = 0;
		var inout = 0;
		var TT = 0;
		var speed = 5000;
		$("#slides li").eq(0).siblings("li").css({
		    "display": "none"
		});
		var ulstart = '<ul id="pagination">',
		    ulcontent = "",
		    ulend = "</ul>";
		addLi();
		var pagination = $("#pagination li");
		var paginationwidth = $("#pagination").width();
		$("#pagination").css("margin-left", (-paginationwidth / 2));
		pagination.eq(0).addClass("current");

		function addLi() {
		    for (var i = 0; i <= numpic; i++) {
		        ulcontent += "<li>" + '<a href="javascript:;">' + (i + 1) + "</a>" + "</li>"
		    }
		    $("#slides").after(ulstart + ulcontent + ulend)
		}
		pagination.on("click", docChange);

		function docChange() {
		    var changenow = $(this).index();
		    $("#slides li").eq(nownow).css("z-index", "900");
		    $("#slides li").eq(changenow).css({
		        "z-index": "800"
		    }).show();
		    pagination.eq(changenow).addClass("current").siblings("li").removeClass("current");
		    $("#slides li").eq(nownow).fadeOut(400, function() {
		        $("#slides li").eq(changenow).fadeIn(500)
		    });
		    nownow = changenow
		}
		pagination.mouseenter(function() {
		    inout = 1
		});
		pagination.mouseleave(function() {
		    inout = 0
		});

		function gogo() {
		    var NN = nownow + 1;
		    if (inout == 1) {} else {
		        if (nownow < numpic) {
		            $("#slides li").eq(nownow).css("z-index", "900");
		            $("#slides li").eq(NN).css({
		                "z-index": "800"
		            }).show();
		            pagination.eq(NN).addClass("current").siblings("li").removeClass("current");
		            $("#slides li").eq(nownow).fadeOut(400, function() {
		                $("#slides li").eq(NN).fadeIn(500)
		            });
		            nownow += 1
		        } else {
		            NN = 0;
		            $("#slides li").eq(nownow).css("z-index", "900");
		            $("#slides li").eq(NN).stop(true, true).css({
		                "z-index": "800"
		            }).show();
		            $("#slides li").eq(nownow).fadeOut(400, function() {
		                $("#slides li").eq(0).fadeIn(500)
		            });
		            pagination.eq(NN).addClass("current").siblings("li").removeClass("current");
		            nownow = 0
		        }
		    }
		    TT = setTimeout(gogo, speed);
		}
		TT = setTimeout(gogo, speed);
	},

	//图片滚动-一个-自动
	skiImgAutoScroll:function(potions){
		var id;
		var defaults = {scrollTime:scrollTime, moveSpeed:time, skiImgBox:skiImgBox, ulId:ulId, rightBtnId:rightBtnId, leftBtnId:leftBtnId, marginRight:10};
		var expotion = $.extend(defaults,potions);
		var time = expotion.moveSpeed;
		var scrollTime = expotion.scrollTime;
		var marginRight = expotion.marginRight;
		var leftBtnId = expotion.leftBtnId;
		var rightBtnId = expotion.rightBtnId;
		var ulId = expotion.ulId;
		var skiImgBox = expotion.skiImgBox;
		var $lBtn = $(leftBtnId);
		var $rBtn = $(rightBtnId);
		var $ulScroll = $(ulId);
		var $skiImgBox = $(skiImgBox);
		var liWidth = $ulScroll.find("li").width()+marginRight;
		var liLength = $ulScroll.find("li").length;
		$lBtn.click(function(){
			$ulScroll.stop(false,true).animate({"left":"+="+liWidth+"px"},time,function(){
				var $lastLi = $ulScroll.find("li:last");
				$lastLi.hide();
				$lastLi.prependTo($ulScroll);
				$ulScroll.css("left","-"+liWidth+"px");
				$ulScroll.find("li:first").fadeIn("fast");
			});
			return false;
		});
		$rBtn.click(function(){
			$ulScroll.stop(false,true).animate({"left":"-="+liWidth+"px"},time,function(){
				var $fisrtLi = $ulScroll.find("li:first");
				$fisrtLi.hide();
				$fisrtLi.appendTo($ulScroll);
				$ulScroll.css("left","-"+liWidth+"px");
				$ulScroll.find("li:last").fadeIn("fast");
			});
			return false;
		});
		$skiImgBox.hover(function(){
			clearInterval(id)
		},function(){
			id = setInterval(scrollImg,scrollTime);
		}).trigger("mouseleave",scrollTime);
		function scrollImg(){
			$ulScroll.animate({"left":"-="+liWidth+"px"},time,function(){
				var $fisrtLi = $ulScroll.find("li:first");
				$fisrtLi.hide();
				$fisrtLi.appendTo($ulScroll);
				$ulScroll.css("left","-"+liWidth+"px");
				$ulScroll.find("li:last").fadeIn("fast");
			})
		}
	},

	//showAndHide
	showAndHide:function(hoverClass,showClass,iconClass,time){
		var timer= null;
		$(hoverClass).hover(function(){
			clearTimeout(timer);
			$(showClass).show();
			$(this).addClass(iconClass);
		},function(){
			timer=setTimeout(function(){
				$(showClass).hide();
				$(hoverClass).removeClass(iconClass);
			},time);
		});

		$(showClass).hover(function () {
			clearTimeout(timer);
			$(this).show();
			$(hoverClass).removeClass(iconClass);
		},function(){
			$(this).hide();
			$(hoverClass).removeClass(iconClass);
		});
	},

	//根据时间戳获取时间  如：1488939902000 -> 2017-03-08
	formatTime:function(timeStemp){
		var oDate = new Date(timeStemp);
		var Y = oDate.getFullYear();
		var M = oDate.getMonth()+1;
		var D= oDate.getDate();

		var h = oDate.getHours();
		var m = oDate.getMinutes();
		var s = oDate.getSeconds();

		return Y+'-'+$.toDbl(M)+'-'+$.toDbl(D)+' '+$.toDbl(h)+':'+$.toDbl(m)+':'+$.toDbl(s);
	},

	//获取时间
	getTime:function(){
		var oDate = new Date();
		var Y = oDate.getFullYear();
		var M = oDate.getMonth()+1;
		var D= oDate.getDate();

		var W = oDate.getDay();

		var h = oDate.getHours();
		var m = oDate.getMinutes();
		var s = oDate.getSeconds();

		var weeks = new Array("日", "一", "二", "三", "四", "五", "六");

		$('.cmn_date').text(Y+'年'+M+'月'+D+'日');
		$('.cmn_week').text('星期'+weeks[W]);
		$('.cmn_hour').text(h+'时'+m+'分'+s+'秒');
	},

	//时钟
	getClock:function(){
		var $Hour=$('.cmn_hour');
		var $Year=$('.cmn_date');
		var $Week=$('.cmn_week');

		var weeks=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

		function clock(){
			  var oDate = new Date();
			  var h=oDate.getHours();
			  var m=oDate.getMinutes();
			  var s=oDate.getSeconds();

			  var Y=oDate.getFullYear();
			  var M=oDate.getMonth()+1;
			  var D=oDate.getDate();

			  var W=oDate.getDay();

			  $Hour.text(ski.cmn.toDbl(h)+':'+ski.cmn.toDbl(m)+':'+ski.cmn.toDbl(s));
			  $Year.text(Y+'/'+ski.cmn.toDbl(M)+'/'+ski.cmn.toDbl(D));
			  $Week.text(weeks[W]);
		};
		clock();
		setInterval(clock,1000);
	},

	//倒计时
	countDown:function(id){
		var $countDown = $(id);
		var timer = null;
		function count(){
			var endTime=new Date("June 7, 2019 9:00:00"); //这是目标时间
			var startTime = new Date(); //这里是从现在开始，也可以从某个具体时间开始,如：var startTime = new Date("June 7, 2016 9:00:00");

			if(startTime >= endTime){
				clearInterval(timer);
				console.log('时间已经过去了！');
			}

			var leftSecond=parseInt((endTime.getTime()-startTime.getTime())/1000);

			if(leftSecond<0){leftSecond=0;}

			var d=ski.cmn.toDbl(parseInt(leftSecond/3600/24));
			var h=ski.cmn.toDbl(parseInt((leftSecond/3600)%24));
			var m=ski.cmn.toDbl(parseInt((leftSecond/60)%60));
			var s=ski.cmn.toDbl(parseInt(leftSecond%60));

			$countDown.text(d+"天"+h+"小时"+m+"分"+s+"秒");
		}

		count();
		timer = setInterval(count,1000);
	},

	//倒计时60s
	countDown60s:function(obj){
		var s = 12;
		var timer = null;

		settime(obj);

		function settime(obj) {
		    if (s == 0) {
		    	obj.addClass('code_num_canClick').text('重新获取验证码');
		        s = 12;
		        return;
		    } else {
		        obj.removeClass('code_num_canClick').text('重新发送(' + ski.cmn.toDbl(s) + ')');
		        s--;
		    }
		    clearTimeout(timer);
			timer = setTimeout(function(){
			    settime(obj);
			},1000);
		}
	},
	//原代码
	/*var countdown=60;
	function settime(obj) {
	    if (countdown == 0) {
	        obj.removeAttribute("disabled");
	        obj.value="免费获取验证码";
	        countdown = 60;
	        return;
	    } else {
	        obj.setAttribute("disabled", true);
	        obj.value="重新发送(" + countdown + ")";
	        countdown--;
	    }
		setTimeout(function() {
		    settime(obj);
		},1000)
	}*/


	//输入字数
	txtLimit:function(areaClass,curClass,maxClass){
		var $reply=$(areaClass);
		var $reply_b=$(curClass);
		var num = parseFloat($(maxClass).text());
		$reply.keyup(function(){
			var charNum =$(this).val().replace(/[^\x00-\xff]/g, "**").length;//返回字符串的实际长度, 一个汉字算2个长;
			var resNum = num-charNum;
			$reply_b.text(resNum);
			resNum <= 0?$reply_b.addClass('red'):$reply_b.removeClass('red');
		});
	},

	//赞动画
	zan:function(){
		var $zanBtn = $('.zan em');
		var $zanTxt = $('.zan b');
		$zanBtn.click(function() {
			var s = $(this);
			var iTxtNum = parseInt(s.siblings('b').text());
			if(!s.hasClass('zaned')){
				var _plus = $('<i>+1</i>');
				s.addClass('zaned').empty().append(_plus).siblings('b').text(iTxtNum+1);
				_plus.animate({top:'-24px',opacity:'0'});
			}else{
				return ;
			}
		});
	},

	//赞动画-可取消赞
	zanToggle:function(){
		var $zanBtn = $('.zan_traigger em');
		var $zanTxt = $('.zan_traigger b');
		$zanBtn.click(function() {
			var s = $(this);
			var iTxtNum = parseInt(s.siblings('b').text());
			if(!s.hasClass('zaned')){
				var _plus = $('<i>+1</i>');
				s.addClass('zaned').empty().append(_plus).siblings('b').text(iTxtNum+1);
				_plus.animate({top:'-24px',opacity:'0'});
			}else{
				var _minus = $('<i>-1</i>');
				s.removeClass('zaned').empty().append(_minus).siblings('b').text(iTxtNum-1);
				_minus.css({'top':'-24px'}).animate({top:'0px',opacity:'0'});
			}
		});
	},

	//鼠标移入方向
	hoverDirection:function(){
		var list = $(".list");

		list.each(function(){
		  var me = $(this),
		      mask = me.find(".mask");
		  var w = me.width(),
		      h= me.height();

		  me.on("mouseenter",function(e){
		    var direction = dir({
		      e : e,
		      obj : me,
		      w : w,
		      h : h
		    });
		    switch(direction){
		      case 0:
		        mask.css({
		          "left" : 0,
		          "top" : -h
		        });
		        moveIn(mask);
		        break;
		      case 1:
		        mask.css({
		          "left" : w,
		          "top" : 0
		        });
		        moveIn(mask);
		        break;
		      case 2:
		        mask.css({
		          "left" : 0,
		          "top" : h
		        });
		        moveIn(mask);
		        break;
		      case 3:
		        mask.css({
		          "left" : -w,
		          "top" : 0
		        });
		        moveIn(mask);
		        break;
		    }
		  });

		  me.on("mouseleave",function(e){
		    var direction = dir({
		      e : e,
		      obj : me,
		      w : w,
		      h : h
		    });
		    switch(direction){
		      case 0:
		        mask.stop(true).animate({
		          "left" : 0,
		          "top" : -h
		        },300);
		        break;
		      case 1:
		        mask.stop(true).animate({
		          "left" : w,
		          "top" : 0
		        },300);
		        break;
		      case 2:
		        mask.stop(true).animate({
		          "left" : 0,
		          "top" : h
		        },300);
		        break;
		      case 3:
		        mask.stop(true).animate({
		          "left" : -w,
		          "top" : 0
		        },300);
		        break;
		    }
		  });
		});

		function dir(opt){
		  var x=(opt.e.pageX - opt.obj.offset().left - (opt.w / 2)) * (opt.w > opt.h ? (opt.h / opt.w) : 1),
		      y=(opt.e.pageY - opt.obj.offset().top - (opt.h / 2)) * (opt.h > opt.w ? (opt.w / opt.h) : 1);
		  return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
		};

		function moveIn(obj){
		  obj.stop(true).animate({
		    "left":0,
		    "top":0
		  },300);
		};
	},

	//检测左侧导航
	testLeftBar:function(iTopH){

		var iTopH; //这个数字是顶部的高度
		var iMainH = $('.mainCon').height();
		var $LeftBar = $('.leftBar');
		var iLeftH = $LeftBar.height();
		function test(){
			var iWinH = $(window).height();
			if(iMainH > iWinH && iMainH > iLeftH){
				$LeftBar.height(iMainH);
			}else if(iLeftH <= iWinH || iLeftHeight <= iMainH){
				$LeftBar.height(iWinH-iTopH);
			}else{
				$LeftBar.height(iLeftH);
			}
		};
		test();
		$(window).resize(function(){
			test();
		});
	},

	//单行文字循环滚动-推荐
	scrollText:function(){
		var x, y, z, h, t;
		var timer = null;
		var iH = 20; //行高
		var box = $('.news_box');
		$('.swap').html($('.news_li').html());
		x = $('.news_li');
		y = $('.swap');
		h = $('.news_li li').length * iH;

		box.hover(function(){
			clearTimeout(timer);
		},function(){
			timer = setTimeout(b,3000);
		}).trigger("mouseleave");

		function b(){
			t = parseInt(x.css('top'));
			y.css('top',iH+'px');
			x.animate({top: t - iH + 'px'},500);
			if(Math.abs(t) == h-iH){
				y.animate({top:'0px'},500);
				z=x;
				x=y;
				y=z;
			}
			timer = setTimeout(b,3000);
		}
	},

	//新闻列表逐行显示-未按顺序-不推荐
	fadeInText:function(){
		var timer = null;
		$(".news").hover(function(){
			 clearInterval(timer);
		},function(){
			 timer = setInterval(function(){
					var ul = $(".list");
					var liHeight = ul.find("li:last").height();
					ul.animate({marginTop : liHeight +"px"},600,function(){
						ul.find("li:last").prependTo(ul);
						ul.find("li:first").hide();
						ul.css({marginTop:0});
						ul.find("li:first").fadeIn(500);
					});
			},3000);
		 }).trigger("mouseleave");
	},

	//鼠标移入元素显示此元素的title
	vtip:function(){
		var xOffset = -10;
		var yOffset = 15;

		$(".vtip").unbind().hover(
		    function(e) {
		        this.t = this.title;
		        this.title = '';
		        this.top = (e.pageY + yOffset); this.left = (e.pageX + xOffset);

		        $('body').append( '<p id="vtip">' + this.t + '</p>');
		        $('p#vtip').css("top", this.top+"px").css("left", this.left+"px").fadeIn(300);
		    },
		    function() {
		        this.title = this.t;
		        $("p#vtip").fadeOut(300).remove();
		    }
		).mousemove(
		    function(e) {
		        this.top = (e.pageY + yOffset); this.left = (e.pageX + xOffset);

		        $("p#vtip").css("top", this.top+"px").css("left", this.left+"px");
		    }
		);
	},

	//文本搜索-可以做成按钮的形式
	searchText:function(){
		$('#search_ipt').keyup(function(){
			var index = $.trim($('#search_ipt').val().toString());//去掉两头空格
			if(index == ''){
				$('.search_listem li').removeClass('on');return false;
			}
			var parent = $('.search_listem');
			$('.search_listem li').removeClass('on');
			//选择包含文本框值的所有加上focus类样式，并把它（们）移到ul的最前面
			$(".search_listem li:contains('" + index + "')").prependTo(parent).addClass('on');
		});
	},

	//圆环进度条
	circleProgress:function(){
		$('.circle').each(function(index, el) {
			var num = $(this).find('span').text() * 3.6;
			if (num<=180) {
				$(this).find('.pie_in_right').css('transform', "rotate(" + num + "deg)");
			} else {
				$(this).find('.pie_in_right').css('transform', "rotate(180deg)");
				$(this).find('.pie_in_left').css('transform', "rotate(" + (num - 180) + "deg)");
			};
		});
	},

	//打字机
	textMarquee:function(){
		var stringLength= showString.length;
		var t = $('.txtBox').text();
		$('.txtBox').text(t + showString.charAt(i));

		//document.txtBox.marquee1.value= document.txtBox.marquee1.value + showString.charAt(i);
		i++;
		var timeID= setTimeout("ski.cmn.textMarquee()",70);
		if (i >= stringLength){clearTimeout(timeID); i=0;}
	}

};

//公共函数执行
ski.cmn.vtip();


/**
 ***************************************
 * 扩展jQuery的常用方法
 * 基于 jquery-1.12.3.min.js
 ***************************************
 **/
(function($){
	$.extend({
		//可拖拽
		alertDrag:function(){
			$('body').delegate('.alertTip h6','mousedown',function(e){
				var $box = $(this).parent('.alertTip');
				var o = $box.offset();
				var x = e.pageX - o.left;
				var y = e.pageY - o.top;
				//防止超出屏幕
				var iBoxWidth = $box.width();
				var iBoxHeight = $box.height();
				var iMarL = Math.abs(parseInt($box.css("marginLeft")));
				var iMarT = Math.abs(parseInt($box.css("marginTop")));
				var iWinWidth = $(window).width();
				var iWinHeight = $(window).height();
				var scroll_h = $(window).scrollTop(); //注意有滚动高度

				$(document).bind('mousemove',function(ev){
					$box.stop();
					var _x = ev.pageX - x;
					var _y = ev.pageY - y - scroll_h;
					//防止超出屏幕的判断
					/*if(_x<0){_x=0}
					if(_x>iWinWidth-iBoxWidth){_x=iWinWidth-iBoxWidth}
					if(_y<0){_y=0}
					if(_y>iWinHeight-iBoxHeight){_y=iWinHeight-iBoxHeight}*/

					$box.animate({left:_x+iMarL+'px',top:_y+iMarT+'px'},0);
					return false;//防止出现选择文字的情况
				});
				$(document).mouseup(function(){
					$(this).unbind('mousemove');
				});
			});
		},

		//弹出提示框2秒
		alerts:function(txt,cls){
			var cls = cls?cls:cls='';
			var timer = null;
			var _html = '<p class="alerts '+cls+'" id="alerts">'+txt+'</p>';

			$('#alerts').remove();
			$('body').append(_html);
			var _as = $('#alerts');
			_as.fadeIn(100);
			clearTimeout(timer);
			timer = setTimeout(function(){
				_as.remove();
				clearTimeout(timer);
			},2000);
		},

		//确定提示框-模拟alert();只是一个提示不做其它用途
		alert:function(txt){
			var tipHtml = '<div class="alertTip_bg" id="alertTip_bg">'+
					'<div class="alertTip" id="alertTip">'+
						'<h6>提示</h6>'+
						'<p>'+txt+'</p>'+
						'<button>确定</button>'+
					'</div>'+
				'</div>';
			var $body = $('body');
			//可拖动
			this.alertDrag();
			//点确定消失
			$body.append(tipHtml).delegate('#alertTip > button', 'click', function() {
				$(this).parents('#alertTip_bg').remove();
				return;
			});
		},

		//弹出确认框-模拟confirm();
		confirm:function(txt){
			var tipHtml = '<div class="alertTip_bg" id="alertTip_bg">'+
					'<div class="alertTip" id="alertTip">'+
						'<h6>提示</h6>'+
						'<p>'+txt+'</p>'+
						'<button class="cancle">取消</button><button class="sure">确定</button>'+
					'</div>'+
				'</div>';
			var $body = $('body');
			$body.append(tipHtml);
			//可拖动
			this.alertDrag();
			//点cancle消失
			$body.delegate('#alertTip > .cancle', 'click', function() {
				$(this).parents('#alertTip_bg').remove();
				return;
			});
		},

		//n-m之间的随机数（默认0-10，包括n和m）
		rdm:function(n,m){
			n = n || 0;
			m = m || 10;
			return parseInt(Math.random()*((m-n)+1))+n;
		},

		//补零函数--返回的是String
		toDbl:function(n){
			return n<10?'0'+n:''+n;
		},

		//获取len长度的随机数字 --注意会出现1.0的情况
        getRnd: function (len) {
            if ($.isNullOrEmpty(len)) { len = 5; }
            return parseFloat(Math.random()).toFixed(len).toString().replace("0.", "");
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

        //小数四舍五入
        decRound: function (Decimal, i) {
            return Math.round(Decimal * Math.pow(10, i)) / Math.pow(10, i);
        },

//以下是对数组的操作方法

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

        //获取url中的参数值 -  如：www.colorski.com/test?sujectId=301&papaerId=3234     getUrlParam('paperId')获取到：3234
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

        //计算时间间隔，有正负之分
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
        //生成随机字符串32位-包括大小写字母和数字
        randomStr: function() {
		    var len = 32;
		    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		    var max = chars.length;
		    var str = '';
		    for (var i = 0; i < len; i++) {
		　　　　str += chars.charAt(Math.floor(Math.random() * max));
		    }

		    return str;
		},
		//获取url地址中的某个参数值  如xx?type=2&stage=5  getQueryString("stage")得到的值为 5
		getQueryString:function(paramName){
			var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		},
        //清除字符串中的html标签
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
        }


	});
})(jQuery);
