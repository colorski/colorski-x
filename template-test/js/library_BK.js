//实例：55-工作相关\videoCourse


var BK = window.BK || {};

BK.widget = {
	tab : function () {
		var target;
		$('[data-toggle="tab"]').find('li').click(function () {
			$('[data-toggle="tab"]').find('li').removeClass('active');
			$(this).addClass('active');
			$('.toggle-tab').addClass('none');
			target = $(this).attr('data-target');
			$("#"+target).removeClass('none');
		});
	},
	tabHover : function () {
		var target;
		$('[data-toggle="tabHover"]').find('li').hover(function() {
			$('[data-toggle="tabHover"]').find('li').removeClass('active');
			$(this).addClass('active');
			target = $(this).attr('target');
		    $('.toggle-tab-hover').addClass('none');
		    $('#'+target).removeClass('none');
		}, function() {});
	}
}

BK.fn = {
	//去除空格
	trim : function (value) {
		if (!value) {return "";}
		var regexp = /(^\s*)||(\s*$)/g;
		return value.replace(regexp, "");
	},
	//合并验证信息
	union : function (oldVal, newVal) {
		oldVal = oldVal || {};
		newVal = newVal == true ? {} : newVal;
		for (var k in newVal) {
			oldVal[k] = newVal[k];
		}
		return oldVal;
	},
	//通过name 获取元素
	getEleByName : function (nodes, name) {
		var nodeLists = [];

		for (var i=0, length=nodes.length; i<length; i++) {
			if (nodes[i] && nodes[i].name == name && BK.fn.getAttr(nodes[i], "display") != "none") {
				nodeLists.push(nodes[i]);
			}
		}
		return nodeLists;
	},
	removeClass : function (ele, className) {
		var className = ele.className;
		if (!className) return;
		aClassName = BK.fn.trim(className).split(" ");
		for (var i=0, length = aClassName.length; i<length; i++) {
			if (aClassName[i] == className) {
				aClassName.splice(i,1);
			}
		}
		return aClassName.join(" ");
	},
	next : function (ele) {
		var nextSibling = ele.nextSibling;
		while (nextSibling && nextSibling.nodeType !=1) {
			nextSibling = nextSibling.nextSibling;
		}
		return nextSibling;
	},
	getAttr : function (ele, attr) {
		if (!!ele.style[attr]) return ele.style[attr];
		var attr = ele.currentStyle ? ele.currentStyle[attr] : window.getComputedStyle(ele, null).getPropertyValue(attr);
		return attr || "";
	},
	isType : function (value) {
		if (value == null) return "";
		oGlobleTypes = oGlobleTypes || {};
		for (var key in oGlobleTypes) {
			if (oGlobleTypes[key] == Object.prototype.toString.call(value)) return key;
		}
	},
	forEach : function (data, iterator) {
		if (BK.fn.isType(data) == "object") {
			for (var key in data) {
				iterator.call(data, data[key], key, data);
			}
		} else {
			var i = 0,
				length = data.length;
			for (; i<length; i++) {
				iterator.call(data, data[i], i, data);
			}
		}
	},
	/**
	* 判断是否为ie 或者 小于等于ie某个版本
	* params Number version ie版本
	* return Boolean
	*/
	isIE : function (version) {
		if (typeof version == "Numeber" &&　window.attachEvent) {
			var userAgent = navigator.userAgent.split(";")[1].split(" ")[2];
			return parseInt(userAgent) <= version;
		}
		return window.addEventListener ? false : true;
	},
	resize : function () {
		//页面大小变化,刷新初始化页面
		var timer;
		$(window).resize(function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				window.location.reload();
			},250);
		});
	},
	/*
	* 绑定事件
	* params DOM element 绑定事件的元素  String event 事件类型
	* Function callback 回调函数 Boolean useCapture 是否在事件捕获阶段执行
	*/
	addEvents : function (element, event, callback, useCapture) {
		useCapture = useCapture || false;
		if (!BK.fn.isIE()) {
			element.addEventListener(event, function (e) {
				if (BK.fn.isType(callback) == "function") {
					callback.call(element, e);
				};
			}, useCapture);
		} else {
			element.attachEvent('on' + event, function (e) {
				if (BK.fn.isType(callback) == "function") {
					callback.call(element, e);
				};
			}, useCapture);
		}
	}
}

BK.ui = {
	placeholder : function () {
		var next;
		$('.password-group').focus(function () {
			$next = $(this).next('.password-group');
			if ($next.length) {
				$(this).addClass('none').next('.password-group').removeClass('none').focus();
			}
		});

		//判断浏览器是否小于ie8
		if (!BK.fn.isIE(8)) return;

		//获取body内的inputs
	    var inputs = document.getElementsByTagName('body')[0].getElementsByTagName('input');
	    var i = 0,
	        length = inputs.length,
	        val,
	        ele;

	    for (; ele = inputs[i++];) {
	        val = ele.getAttribute('placeholder');
	        //如果placeholder属性有值
	        if (ele.value == "" && !!val) {
	            fix.call(ele, val);
	        }
	    }

	    function fix (val) {
	        this.value = val;
	        //获取焦点，如果input value为placeholder，那么input value为空
	        this.onfocus = function () {
	            this.value == val ? this.value = "" : "";
	        }
	        //失去焦点，如果input value为空那么 input value为placeholder
	        this.onblur = function () {
	            this.value == "" ? this.value = val : "";
	        }
	    }
	},
	messageShow : function (url) {
		var val, date, $parent, msgId, uid, url, msgStatus, _this;
		$('.message-show').click(function () {
			_this = this;
			msgId = $(this).attr('data-id');
			uid=$(this).attr("data-uid");
			msgStatus = $(this).attr('data-status');
			if(msgStatus === '1'){
                msgModalShow.call(this);
			} else {
				$.post(url, {id:msgId,uid:uid}, function (data, state) {
					if (data && data == 1 && state == 'success') {
						msgModalShow.call(_this);
					};
				});
			}
		});
		function msgModalShow () {
			var _self = this;
			$.get("/template/message", function (data, state) {

				if (data && state == "success") {
					$('.messages-modal').html(data);
					$parent = $(_self).parent();
					$parent.addClass('old');
					val = $parent.find('.msg-content').text();
					date = $parent.find('.msg-date').text();
					$('.modal-date').html(date);
					$('.modal-body p').text(val);
					$('.messages-modal').fadeIn();
					$('#modal-shade').fadeIn();
				}
			});

		}
	}
}

BK.modal = {
	//公用弹窗
	dialog : function () {

		/*checkbox 组件*/
		var checkedStatus,
			$checkbox;
		$('.checbox-group td p').click(function (e) {
			$checkbox = $(this).closest('tr').find('[type="checkbox"]');
			checkedStatus = $checkbox.prop('checked');
			$checkbox.prop('checked', !checkedStatus);
		});
	},
	//公用提示类弹窗
	hint : function (message, callback, time) {
		time = time || 1500;
		var $hint = $('.modal-msg');
		var $shade = $('#modal-shade');
		$hint.fadeIn();
		$hint.find('p').html(message);
		$shade.fadeIn();
		// setTimeout(function () {
		// 	$hint.fadeOut();
		// 	$shade.fadeOut();
		// 	if (BK.fn.isType(callback) == 'function') callback();
		// }, time);
	},
	login : function (params, callback) {

		//enter 快捷键登陆
		document.getElementById('password').onkeydown = function (event) {
		  	var event = event || window.event ;
		  	var keyCode = event.keyCode || e.which;
		  	if (keyCode == 13) {
		        login();
		  	};
		}

		$(".new-login").click(function(e){
			e.preventDefault();
            //placeholder bug
            $('.validate').find('.password-group').eq(0).addClass('none');
            $('.validate').find('.password-group').eq(1).removeClass();

            //验证
            var _this = this;
            BK.validator.call(this, {
            	rules : {
            		"password" : true
            	},
            	success	: function () {
            		$(".new-login").text('正在登录...');
            		login.call(_this);
            	}
            });
		});

	  	var email,
			password,
			url,
			$parent,
			site;
		function login () {
			$parent = $(this).parents('form');
			site = $parent.attr('data-site');
		    email = $parent.find("#email").val();
		    password = $parent.find("#password").val();
			var next_autologin = $("input[name='next_autologin']").is(':checked');
		    url = params.login;

		    $.post(url,{email:email,password:password,next_autologin:next_autologin},function(data,state){
		        if (state == 'success') {
		                if(data=='error'){
		                	if (site) {
		                		$(".new-login").text('快速登录');
		                		BK.modal.hint("输入的账号或者密码有误！");
		                	} else {
		                		$("#Prompt1").text('输入的账号或者密码有误！');
		                	}
                            $("#login").text('快速登录');
		                }else{
		                	if (typeof callback == "function") {
		                		callback();
		                		return;
		                	}
                            //判断是否为登录的错误提示页面
                            //如果是登录并跳转到首页,如果不是在当前页面登录并刷新
                            var url = window.location.href;
                          if(url.indexOf("error/login") > 0 ) {
                                location.href = '/';
                            }else{
                            	location.reload();
                            }
		                }
		           }
		    });
		}
	},
	register : function (params) {

		//注册
		var tab,
			param;
		$("#register").click(function(e){
			e.preventDefault();

		  	tab = $('.data-toggle-tab').find('.active').attr('data-target');
		  	var name = $("#name").val();
		  	var email = $("#email1").val();
		  	var phone = $("#phone").val();
		  	var password = $("#password1").val();
		  	var verify = $("#verify").val();
            if($('#Protocol').is(':checked')){
                var Protocol ='1';
            }else{
                var Protocol ='0';
            }
		   	url = params.register;
		    if (tab == 'register-phone') {
		    	BK.validator.call(this, {
		    		rules : {
		    			"phone" : true,
		    			"verify" : {
		    				"groupBox" : ".group-box"
		    			},
		    			"nickname" : {
		    				"max" : 6,
		    				"min" : 2
		    			},
		    			"password" : true
		    		},
	    			success : function () {
	    				//手机注册
	    				param = {
    						password : password,
    						username : name,
    						verify : verify,
    						phone : phone,
    						que : 1,
    						Protocol : Protocol
    					};

	    				$("#register").text('正在注册...');
    				 	$.post(url, param, function(data, state){
    				    	if (state == 'success') {
    				        	if(data=='success'){
    				          	location = location;
    				        	}else{
    				          	$("#Prompt").text(data);
    				                  $("#register").text('立即注册');
    				          	}
    				      	}
    					});
	    			}
		    	});
		    } else {
		    	//邮箱注册
		    	param = {
    				email : email,
    				password : password,
    				username : name,
    				que : 0,
    				Protocol : Protocol
    			};
		    	BK.validator.call(this, {
		    		rules : {
		    			"email" : true,
		    			"nickname" : {
		    				"max" : 20,
		    				"min" : 1
		    			},
		    			"password" : true
		    		},
	    			success : function () {
			            $.post(url, param, function(data, state){
		                    if (state == 'success') {
		                        if(data=='success'){
                                    location = location;
		                        }else{
		                            $("#Prompt").text(data);
		                            $("#register").text('立即注册');
		                        }
		                    }
			            });
	    			}
	    		});
		    }
		});
	},
	loginShow : function () {
		$("#login-window").fadeIn();
		$('.regist-tab').addClass('none');
		$("#modal-shade").fadeIn();
	},
	registerShow : function () {
		$("#login-window").fadeIn();
		$('.login-tab-box').addClass('none');
		$('.regist-tab').removeClass('none');
		$("#modal-shade").fadeIn();
	},
	//头部导航各种事件
	headerEvents : function (params) {
		var ele;
		$('[data-show="login-tab"], .live-register').click(function () {
			$('#login-window>div').addClass('none');
			ele ='.' + $(this).attr('data-show');
			$(ele).removeClass('none');
			$('[data-ele="login"]').fadeIn();
			$('#modal-shade').fadeIn();
		});
		BK.widget.tab();
		BK.widget.tabHover();

		$('body').delegate('[data-dismiss="modal"]', 'click', function () {
			$('[data-ele="modal"]').fadeOut();
			$('[data-ele="video"]').fadeOut();
			$('#modal-shade').fadeOut();
			$('.login-msg').fadeOut();
			$('.modal-msg').fadeOut();
			$('[data-ele="video"]').fadeOut();
			$('[data-ele="login"]').fadeOut();
			$('#modal-shade').fadeOut();
			$('#a1').html('');
			//视频room
			//增加关闭iframe的框
			$('[data-ele="video-room"]').fadeOut();
			$('#iframe-win').attr('src','');
			//$('.link-window').removerClass('opacity0');

			//视频room
		});

		$('.register-btn').click(function () {
			$('#login-window>div').addClass('none');
			$('.regist-tab').removeClass('none');
		});
		$('.login-show').click(function () {
			$('#login-window>div').addClass('none');
			$('.login-tab').removeClass('none');
		});

		$('.data-toggle-tab').find('li').click(function () {
			$('.login-input').find('input').val('');
		});
		var href;
		$('.logined-continue').click(function () {
			$('.login-msg').fadeOut();
			$('#modal-shade').fadeOut();
			location = location;
		});

		$('.top-nav li').hover(function () {
			$(this).find('.pull-down-menu').stop().slideDown(400);
		}, function () {
			$('.pull-down-menu').stop().slideUp(400);
		});

		var $active,
			$avtiveUi = $('.nav-ul .active');
		$('.ui-hover').hover(function () {
			$('.ui-hover').removeClass('active');
			$active = $(this);
			$active.addClass('active');
		}, function () {
			$('.ui-hover').removeClass('active');
			//$active.removeClass('active');
		});

		$('.nav').hover(function () {}, function () {
			$avtiveUi.addClass('active');
		});

		//header nav
		$('.sub-nav').hover(function () {
			$(this).find('.slide-down').stop().slideDown();
		}, function () {
			$('.slide-down').stop().slideUp();
		});

		//ie6+
		var $dt,
			$dd,
			$right = $('.slide-right');
		$('.slide-item').hover(function () {
			$right.removeClass('sub-hover');
			$(this).find('.slide-right').addClass('sub-hover');
			$dt = $(this).find('dt');
			$dd = $(this).find('dd');
			$dt.css('color', '#fff');
			$dd.css('color', '#fff');
		}, function () {
			$right.removeClass('sub-hover');
			$dt.css('color', '#2c9bc7');
			$dd.css('color', '#222');
		});

		//发送验证码
		//$("#Send_verify_register").click(function(){
		//	alert(111111111);return false;
		//     var phone = $("#phone").val();
		//     if (phone == "") {
		//     	$("#Prompt").html("手机号不能为空!");
		//     	return;
		//     }
		//     //url =''
		//     //$.post(url,{phone:phone},function(data){
		//     //        if (data.state ==1) {
		//     //              if(data.msg=='0000'){
         //     //                         timeout();
		//     //                 $("#Prompt").text('手机验证码已经发送到您的手机，请注意接收。');
		//     //              }else{
		//     //                  $("#Prompt").text(data.msg);
		//     //               }
		//     //        }
		//     //    });
		//	$.ajax({
		//		type: 'POST',
		//		url: '/send_verify_register',
		//		data: {phone:phone},
		//		dataType: 'json',
		//		headers: {
		//			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		//		},
		//		success: function(data){
		//			if (data.state ==1) {
		//				if(data.msg=='0000'){
		//					timeout();
		//					$("#Prompt").text('手机验证码已经发送到您的手机，请注意接收。');
		//				}else{
		//					$("#Prompt").text(data.msg);
		//				}
		//			}
		//		},
		//		error: function(xhr, type){
		//			alert('Ajax error!')
		//			// console.log(xhr);
		//			// alert(xhr);
		//		}
        //
		//	});
		//});

		function timeout () {
			var timer,
				num = 60;
			setTimeout(function () {
				$('#Send_verify').addClass('none');
				$('.send_disabled').removeClass('none');
				$('.send_disabled').text(num + '秒');
				num --;
				if (num > 0) {
					timer = setTimeout(arguments.callee, 1000);
				} else {
					reset();
				}
				function reset () {
					clearTimeout(timer);
					$('#Send_verify').removeClass('none');
					$('.send_disabled').addClass('none');
					num = 60;
				}
			});
		}
	}
}

//大白验证插件 1.0
BK.validate = {
	verifyMsg : {
		"email" : {
			"emptyMsg" : "邮箱不能为空!",
			"regexp" : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
			"errorMsg" : "请使用正确的邮件格式"
		},
		"number" : {
			"regexp" : /^[0-9]*$/,
			"errorMsg" : "请使用正确的数字格式"
		},
		"phone" : {
			"regexp" : /^\d{11}$/,
			"errorMsg" : "请使用正确的手机格式"
		}
	},
	init : function (params) {

		var item,
			length,
			value,
			regexp,
			parent,
			nodeLists,
			className,
			verifyNodes,
			verifyFormat,
			_this = this,
			newVerify = {},
			classError = "verifyError",
			maxLength,
			errorMsg,
			thisParent,
			verifyParams;

		params = params || {};
		$('.verifyError').removeClass('verifyError');
		$('.errorShow').remove();

		verifyParams = params.rules || params;
		verifyFormat = verifyFormat(verifyParams);
		verifyNodes = getNodes(verifyFormat);

		//验证插件 各种校验方法
		var fns = {
			regexp : function (item, cur, val) {
				return cur['regexp'].test(value) ? true : error.call(item, cur, cur['errorMsg']);
			},
			max : function (item, cur, val) {
				return val.length <= cur['max'] ? true : error.call(item, cur, "超过最大长度" + cur['max']);
			},
			min : function (item, cur, val) {
				return val.length >= cur['min'] ? true :  error.call(item, cur, "小于最小长度" + cur['min']);
			}
		}
		var s = verify(verifyNodes);

		return s;

		//验证元素的格式 提示信息
		function verifyFormat (params) {
			for (var key in params) {
				newVerify[key] =BK.fn.union(BK.validate.verifyMsg[key], params[key]);
			}
			return newVerify;
		}

		//获取要验证的元素
		function getNodes (verifyFormat) {
			parent = _this.parentNode;
			while(parent && parent.tagName != "FORM"){
				parent = parent.parentNode;
			}
			if (!parent) return;
			nodeLists = {};
			for (var k in verifyFormat) {
				nodeLists[k] = BK.fn.getEleByName(parent.getElementsByTagName('input'), k);
			}
			return nodeLists;
		}

		//验证各元素
		function verify (nodeLists) {
			nodeLists = nodeLists || [];
			for (var key in nodeLists) {
				length = nodeLists[key].length;
				if (!length) {
					break;
				}
				//input type text password 等
				else if (length == 1) {
					item = nodeLists[key][0];
					value = BK.fn.trim(item.value);
					if (value == "") {
						error.call(item, verifyFormat[key], verifyFormat[key]['emptyMsg']);
						return false;
					} else {
						var verifyNum = 0,
							cur =  verifyFormat[key];
						for (var k in cur) {
							if (fns[k] && !fns[k](item, cur, value)) return false;
						}
					}
				}
				//radio checkbox 等
				else {
					//最后处理
				}
			}
			if (BK.fn.isType(params["success"]) == "function") {
				params["success"]();
			}
			return true;
		}
		function error (cur, msg) {

			msg = msg || "必填项";
			//获得焦点
			this.type != "checkbox" && this.type != "radio" ? this.focus() : "";

			//边框变为红色
			className = this.className ? this.className +" "+ classError : classError;
			this.className = className;

			var dom = document.createElement("div");
			dom.innerHTML = msg;
			dom.className = "errorShow";
			thisParent = this.parentNode;

			//错误提示信息
			if (cur['groupBox']) {
				thisParent = $(this).closest(cur['groupBox'])[0].parentNode;
				thisParent.insertBefore(dom, BK.fn.next($(this).closest(cur['groupBox'])[0]));
				return false;
			}
			thisParent.insertBefore(dom, BK.fn.next(this));
			return false;
		}
	}
}
//重新声明验证方法
BK.validator = BK.validate.init;

//数据类型格式
var aGlobleTypes = "Object Function Array Date RegExp String Number Boolean".split(" ");
var oGlobleTypes = {};
var i = 0,
	length = aGlobleTypes.length;
for (; i<length; i++) {
	oGlobleTypes[aGlobleTypes[i].toLowerCase()] = "[object "+ aGlobleTypes[i] +"]";
}


BK.time = {
	loginedCount : function () {
		var loginNum = 3,
			timer;

		$('.login-msg').fadeIn();
		$("#modal-shade").fadeIn();

		//loginedTimeout ();
		function loginedTimeout () {
			$('.timer-second').html(loginNum);
			if (loginNum < 1) {
				clearTimeout(timer);
				window.location.href = "/";
				return;
			};
			loginNum --;
			timer = setTimeout(arguments.callee, 1000);
		}
	},
	/*课程列表倒计时*/
	countdown : function (nowTime) {
		var url,
			now,
			will,
			diff,
			day,
			hour,
			min,
			ms,
			dayMs,
			hourMs,
			dom,
			timer,
			ele,
			$wait,
			text,
			startTime,
			endTime,
			courseStatus = '开始',
			num = 1,
			courseType = 1,
			$startCount = $('.startCount'),
			$countdown = $('.countdown'),
			$intoRoom = $("#into-room");

			$couserWait = $('.wait:visible').closest('.course-item');
			$couserstarting = $('.link-into:visible').closest('.course-item');

			//没有开始的课程
			startTime = parseInt($couserWait.attr('data-start'));
			endTime = parseInt($couserWait.attr('data-end'));

			$wait = $('.wait:visible:eq(0)');
			text = $wait.closest('.course-item').find('.mid-courseHour').text();

			//有开始的课程
			if (parseInt($couserstarting.attr('data-end'))) {
				courseType = 0;
				startTime = parseInt($couserstarting.attr('data-end'));
				courseStatus = '结束';
				$("#not-start").addClass('none');
				url = $('.link-into:visible').find('a').attr('href');
				text = $('.link-into:visible:eq(0)').closest('.course-item').find('.mid-courseHour').text();
				$intoRoom.removeClass('none').attr('href', url);
			};

			$('.courseHour').html(text);

			//无课程
			if (!$couserWait.length && !$couserstarting.length) {
				return;
			};

		timerCount();
		function timerCount () {
			num += 1;
			now = nowTime + num;
			diff = startTime - now;
			day = Math.floor(diff/86400);
			dayMs = 86400*day;
			hour = Math.floor((diff-dayMs)/3600);
			hourMs = 3600*hour;
			min = Math.floor((diff-dayMs-hourMs)/60);
			ms = Math.floor((diff-dayMs-hourMs-min*60));
			dom = '<span>还有</span><em>'+format(day)+'</em><span>天</span>'
				  + '<em>'+format(hour)+'</em><span>小时</span>'
				  + '<em>'+format(min)+'</em><span>分钟</span>'
				  + '<em>'+format(ms)+'</em><span>秒 '+courseStatus+'</span>';

			if (day < 0 && courseType) {
				clearTimeout(timer);
				dom = '<span>还有</span><em>00</em><span>天</span>'
					  + '<em>00</em><span>小时</span>'
					  + '<em>00</em><span>分钟</span>'
					  + '<em>00</em><span>秒</span> '+courseStatus+'</span>';
				$countdown.html(dom);
				startTime = endTime;
				courseStatus = '结束';
				courseType = 0;

				$("#into-room").removeClass('none');
				$('#not-start').addClass('none');
				$('.wait:eq(0)').addClass('none').next().removeClass('none');
				url = $('.link-into:visible').find('a').attr('href');
				$intoRoom.removeClass('none').attr('href', url);
				timer = setTimeout(arguments.callee, 1000);
				return;
			} else if (day < 0 && !courseType) {
				clearTimeout(timer);
				$('.link-into:visible').addClass('none').next('.playback').removeClass('none');
				getNextCourseTimes();
				timer = setTimeout(arguments.callee, 1000);
				return;
			}

			$countdown.html(dom);
			timer = setTimeout(arguments.callee, 1000);
		}

		var dataStart,
			dataEnd,
			text;
		function getNextCourseTimes () {
			$("#not-start").removeClass('none');
			$intoRoom.addClass('none');
			//这个课程结束，下个课程开始倒计时
			var $wait = $('.wait:visible:eq(0)');
			if (!$wait.length) {
				clearTimeout(timer);
				return;
			}
			text = $wait.closest('.course-item').find('.mid-courseHour').text();
			$('.courseHour').html(text);
			startTime = $wait.closest('.course-item').attr('data-start');
			endTime = $wait.closest('.course-item').attr('data-end');
			now = now || nowTime;
			courseStatus = '开始';
			courseType = 1;
		}

		//事件格式化
		function format (num) {
			return num >= 10 ? num : '0'+num;
		}

	}


}
