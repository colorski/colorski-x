"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 学习陈楠的代码--1.ajax获取数据    2.把数据写入页面
 * @联系 ww
 * @邮箱 290518066@qq.com
 * @基于 jquery-1.12.3.min.js
 ***************************************
 **/

<script type="text/javascript">
	var data_handle;
	data_handle = {
		getData : function(n){
			$.ajax({
				type: "POST",
				url: "/market/getData",
				data : {page:n},
				dataType:"json",
				//contentType : 'application/json;charset=utf-8', //设置请求头信息--在注册登录时可能会用到
				success: function(data){
					data_handle.processData(data);

					//滚动到最顶出
					$('html, body').animate({
						scrollTop: $("#_tab_mkt").offset().top
					}, 500);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){}
			});
		},
		processData : function(data){
			if(data && data.objs) {
				var content = '';
				for (var item in data.objs) {
					var obj = data.objs[item];

					content += '<tr>';

					content += '<td>'+obj.workerName+'</td>';                               //业务人员姓名
					content += '<td>'+obj.contactsName+'</td>';                             //联系人姓名
					content += '<td>'+obj.contactsTitle+'</td>';                            //联系人职务
					content += '<td>'+obj.customerName+'</td>';                            //客户名称
					content += '<td>'+(obj.connected ? '接通' : '未接通')+'</td>';              //是否接通

					if(obj.connected && obj.duration > 0){
						content += '<td>'+obj.duration+'</td>';                                 //通话时长
						content += '<td>'+obj.beginTime+'</td>';                                //通话开始时间
						content += '<td>'+obj.endTime+'</td>';                                  //通话结束时间
						content += '<td><a href="javascript:;" canplay="0"  onclick="data_handle.downLoadAndPlay(this);">播放</a> <a href="javascript:;" onclick="data_handle.stopPlay(this);">停止</a><input type="hidden" name="mediaKey" value="'+obj.mediaKey+'"><input type="hidden" name="data-id" value="'+obj.id+'"/></td>';
					}else{
						content += '<td>0</td>';
						content += '<td> </td>';
						content += '<td> </td>';
						content += '<td> </td>';
					}

					content += '</tr>';
				}
				$("#_tab_mkt tbody").empty().append(content);


				$('#list_page').pager({
					recordcount: data.count,
					pagesize: data.pageSize,
					pagenumber:data.page,
					buttonClickCallback:function(n) {
						data_handle.getData(n);
					},
					firsttext: '首页',
					prevtext: '前一页',
					nexttext: '下一页',
					lasttext: '尾页',
					gotext:'跳转',
					recordtext: '共{0}页,{1}条记录'
				});

			}
		},
		downLoadAndPlay : function(obj){
			var mediaKey = $(obj).parents("td").find("input[name='mediaKey']").val();
			var canplay = $(obj).attr("canplay");
			var canclick = $(obj).attr("canclick");

			if(canclick == "no") {
				return ;
			}
			if(canplay == 1) {
				$(obj).parents("td").find("audio")[0].play();
				return;
			}

			$(obj).attr("canclick", "no");
			$.ajax({
				type: "POST",
				url: "/market/downLoad",
				data : {mediaKey:mediaKey},
				dataType:"json",
				success: function(data){
					if(data.result == 'error'){
						alert('无法播放');
					}else{
						var contenttt = '';
						contenttt += '<audio src="'+data.result+'" autoplay="autoplay">'
						contenttt += '</audio>';
						$(obj).parent().append(contenttt);
						$(obj).attr("canplay", 1);
						$(obj).attr("canclick", "yes");
					}
				},
				error: function(){
					window.location.href = "/market/";
				}
			});
		},
		stopPlay : function(obj){
			$(obj).parents("td").find("audio")[0].pause();
		}
	}


	$(function () {
		data_handle.getData(0);
	});
</script>