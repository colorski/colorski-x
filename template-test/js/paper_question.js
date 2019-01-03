var cid;
var gid;
var requestURI;
var isSchool;
Teacher.paper.paper_question = {
    typeCur: $(".current-type"),
    treeList: $(".tree-list"),
    nodelist: $(".node-list .list li a"),
    questionList: $(".question-list"),
    typeOption: $(".type-list ul"),
    typeItem: $(".type-list a"),
    typeList: $(".type-list"),
    mainMenu: $(".child-menu"),
	filterLink: $(".filter-box a"),
	filterTimeAndQcont: $(".question-item-top .pxbtn"),
    mainContent: $(".child-content .content-wrap"),
    init: function (ccid) {
        cid = ccid;
        gid = ccid;
        Teacher.paper.paper_question.get_category(this.typeCur.data("cselect")),
        Teacher.paper.paper_common.randerQuestion = Teacher.paper.paper_question.randerQuestion,
        Teacher.paper.paper_question.page(1),
        this.treeList.on("click", ".item", function () {
            var this_a = this;
            Teacher.paper.paper_question.treeItemClick(this_a)
        }),
        this.questionList.on("click", ".question-content", function () {
            var this_a = this;
            Teacher.paper.paper_question.getQuestionAnswer(this_a)
        }),
        this.questionList.on("click", ".addAllPaper", function (event) {
            var this_a = this;
            return event.stopPropagation(), 
            Teacher.paper.paper_question.addQuestionsClick(this_a), !1
        }),
        this.questionList.on("click", ".control-btn", function () {
            var this_a = this;
            Teacher.paper.paper_question.addQuestionClick(this_a)
        }),
        this.typeItem.click(function () {
            var this_a = this, thisText = $(this_a).text();
            $(this_a).parent().parent().siblings("a").children("span").text(thisText)
        }),
        this.nodelist.click(function () {
            var this_a = this;
            if (requestURI == "question") {
                cid = $(this).attr("category_id");
            } else if (requestURI == "course") {
                gid = $(this).attr("category_id");
            }
            Teacher.paper.paper_question.page(1);
        }),
        this.typeOption.click(function () {
            Teacher.paper.paper_question.typeOption.hide()
        }),
        this.typeList.hover(
            function () {            
                var this_a = this;
                $(this_a).children(".current-type").addClass("hover"), $(this_a).children("ul").children().length > 0 ? $(this_a).children("ul").show() : $(this_a).children("ul").hide()
            }, 
            function () {
                var this_a = this;
                $(this_a).children(".current-type").removeClass("hover"), $(this_a).children("ul").hide()
            }
        ),
        this.filterLink.live("click", function () {
            var this_a = this;
            Teacher.paper.paper_question.filterQuestionClick(this_a)
        }),
        this.filterTimeAndQcont.live("click", function () {
	        var this_a = this;
	        Teacher.paper.paper_question.filterTimeAndQcontClick(this_a)
        })
    },
    getUrlData: function (ele) {
        ele = ele || 1;
        var nselectVal = $(".tree-list .active").data() || {nselect: $(".current-type").data("cselect")}, finalData = $.extend({page: ele}, nselectVal, $(".current-type").data(), $(".filter-box .p2 .active").eq(0).data(), $(".filter-box .p2 .active").eq(1).data(), cid,{orderType:$(".question-item-top .active").attr("ordertype"),orderField:$(".question-item-top .active").attr("id")});
        return finalData
    },
    randerQuestion: function () {
    },
    treeItemClick: function (this_a) {
        if ($(this_a).hasClass("active"))
            return !1;
        this.treeList.find("a").removeClass("active"), $(this_a).addClass("active");
        Teacher.paper.paper_question.page(1)
    },
    treeListClick: function (this_a) {
        var thisId = $(this_a).data("url_id"), thisClass = $(this_a).attr("class"), thisStatus = thisClass.split(" ")[1], thisChild = $(this_a).parent("div").siblings("ul"), statusText = thisStatus.split("-"), changeStatus = function () {
            return "plus" == statusText[1] ? statusText[0] + "-subtract" : "subtract" == statusText[1] ? statusText[0] + "-plus" : void 0
        };
        "plus" == statusText[1] && 0 == thisChild.length && this.get_category(thisId, $(this_a).parent("div")), "item" != statusText[1] && ($(this_a).removeClass(thisStatus).addClass(changeStatus()), thisChild.toggle())
    }, //将试题加入试卷当中
    addQuestionClick: function (this_a) {
        var qid = $(this_a).data("question_id"), sid = $(".subject-chose").data("subject"), qorigin = $(this_a).data("question_origin");
        void 0 == qorigin && (qorigin = paperQuestionOrigin);
        var category_id = $(this_a).data("category_id");
        void 0 == category_id && (category_id = 0);
        var course_id = $(this_a).data("course_id");
        void 0 == course_id && (course_id = 0);
        isSchool = $("#source .active").attr("data-qschool");//全国or本校
        var qdata = {
            qid: qid,
            sid: sid,
            qorigin: qorigin,
            category_id: category_id,
            course_id: course_id,
            isSchool : isSchool
        }, index = $(".control-btn").index(this_a);
        $(this_a).children("span:visible").length > 0 ? ($(".control-btn").eq(index).removeClass("control-btn").addClass("control-btn-2"), this.add_question(qdata, index, function () {
            $(".control-btn-2").removeClass("control-btn-2").addClass("control-btn")
            $(this_a).find("span").attr("style", "display:none;");
            $(this_a).find("em").attr("style", "display:block;");
        })) : ($(".control-btn").eq(index).removeClass("control-btn").addClass("control-btn-2"), this.remove_question(qid, sid, qorigin, index, function () {
            $(".control-btn-2").removeClass("control-btn-2").addClass("control-btn")
            $(this_a).find("span").attr("style", "display:block;");
            $(this_a).find("em").attr("style", "display:none;");
        }))
    }, //将本业所有试题加入试卷当中
    addQuestionsClick: function (this_a) {
        var sid = $(".subject-chose").data("subject"), index = $(".control-btn").index(this), qids = "";
	    isSchool = $("#source .active").attr("data-qschool");//全国or本校
	    isSchool=isSchool?isSchool:0;
        $(".question-list .question-box").each(function (index) {
            var id = $(this).attr("data-question_id"), category_id = $(this).attr("data-category_id");
            void 0 == category_id && (category_id = 0);
            var course_id = $(this).attr("data-course_id");
            void 0 == course_id && (course_id = 0), qids += "#" + id + "," + category_id + "," + course_id;

        });
        var qorigin = $(this_a).data("question_origin");
        void 0 == qorigin && (qorigin = paperQuestionOrigin);
        var qdata = {qids: qids, sid: sid, qorigin: qorigin,isSchool : isSchool};
        $(".all_in").removeClass("all_in").addClass("all_in_2"), this.add_questions(qdata, index, function () {
            $(".all_in_2").removeClass("all_in_2").addClass("all_in")
            $(".add-b").find("span").attr("style", "display:none;");
            $(".add-b").find("em").attr("style", "display:block;");
        })
    },
    filterQuestionClick: function (this_a) {
        if ("active" == $(this_a).attr("class"))
            return !1;
        $(this_a).parents("ul").find("a").removeClass("active"), $(this_a).addClass("active");
        Teacher.paper.paper_question.page(1)
    },
	filterTimeAndQcontClick: function (this_p) {
		//先移除所有的样式
		Teacher.paper.paper_question.filterTimeAndQcont.removeClass('active').removeClass('pxdown').removeClass('pxup');
		var _this = $(this_p);

		var ordertype = _this.attr("ordertype") == 'desc' ? 'asc' : 'desc';
		var cssOrderType = ordertype == 'desc'?'pxdown':'pxup';

		_this.attr("ordertype", ordertype).addClass(cssOrderType).addClass('active');

		Teacher.paper.paper_question.page(1)
	},

    get_category: function (cnselectVal, element) {
        return !1
    },
    add_question: function (qdata, index, unlock) {
        ZENG.msgbox.show(" 正在加入试卷，请稍后...", 6, 100000), $.post("/paper/paperQuestion/addQuestion", qdata, function (data) {
            ZENG.msgbox.hide(), unlock(), 1 == data.errorcode ? ($(".control-btn").eq(index).addClass("add-b"), $(".control-btn").eq(index).removeClass("add-false"), Teacher.paper.paper_common.randerCart(Teacher.paper.paper_question.question_cart_json_2_html(data.question_cart))) : $.tiziDialog({content: data.error})
        }, "json");
    },
    add_questions: function (qdata, index, unlock) {
        ZENG.msgbox.show(" 正在加入试卷，请稍后...", 6, 100000), $.post("/paper/paperQuestion/addQuestions", qdata, function (data) {
            ZENG.msgbox.hide(), unlock(), 1 == data.errorcode ? ($(".add-false").addClass("add-b").removeClass(".add-false"), Teacher.paper.paper_common.randerCart(Teacher.paper.paper_question.question_cart_json_2_html(data.question_cart))) : (Teacher.paper.paper_common.randerCart(Teacher.paper.paper_question.question_cart_json_2_html(data.question_cart)), Teacher.paper.paper_common.randerQuestion(), $.tiziDialog({content: data.error}))
        }, "json");
    },
    question_cart_json_2_html: function (data) {
        var content = '';
        if (data.percent) {
            content += '<p> 已选题目(<span id="choseQCount">' + data.qcount + '</span>)';
        } else {
            content += '<p> 已选题目(<span>0</span>)';
        }

        content += '<a href="javascript:;" class="empty-btn">全部清空</a>';
        content += '</p>';
        content += '<div class="question-table" id="que_tab">';
        content += '<table class="data-table"><tbody>';

        if (data && data.tclist && data.percent) {
            for (var index in data.tclist) {
                var obj = data.tclist[index];
                var pcent = data.percent[index];

                content += '<tr>';

                content += '<td class="first-col"  id="left-question-cart-name' + obj.id + '">';
                content += obj.name;
                content += '</td>';

                content += '<td qid="' + obj.qid + '" class="second-col">';
                content += obj.count;
                content += '</td>';

                content += '<td class="third-col">';
                content += '<div class="percent-line" style="width:' + (parseInt(pcent.percent) / 2) + 'px;">';
                content += '<div class="percent-text">';
                content += '<span>' + pcent.percent + '</span>%';
                content += '</div>';
                content += '</div>';
                content += '</td>';

                content += '<td class="forth-col">';
                content += '<a href="javascript:;" qtype="' + obj.id + '" data-id="' + obj.id + '" qid="' + obj.qid + '" class="del-btn">删除</a>';
                content += '</td>';

                content += '</tr>';
           
                }else{
                	//本题型的试题加入试卷的个数为0时，隐藏本题型的数目
                }
                
            }
        } else {
            for (var index in data.qtlist) {
                var obj = data.qtlist[index];

                ontent += '<tr>';

                content += '<td class="first-col"  id="left-question-cart-name">';
                content += obj.name;
                content += '</td>';

                content += '<td class="second-col">0</td>';

                content += '<td class="third-col">';
                content += ' <div class="percent-line" style="width: 0px;">';
                content += '<div class="percent-text"> <span>0</span>% </div>';
                content += ' </div>';
                content += '</td>';

                content += '<td class="forth-col"><a href="###" class="del-btn">删除</a></td>';

                content += '</tr>';
            }
        }
        content += '</tbody></table>';
        content += '</div>';

        return content;
    },
    remove_question: function (qidVal, sidVal, qorigin, index, unlock) {
        ZENG.msgbox.show(" 正在移除，请稍后...", 6, 100000), $.post("/paper/paperQuestion/removeQuestion", {qid: qidVal, sid: sidVal, qorigin: qorigin}, function (data) {
            ZENG.msgbox.hide(), unlock(), 1 == data.errorcode ? ($(".control-btn").eq(index).addClass("add-b"), $(".control-btn").eq(index).removeClass("add-false"), Teacher.paper.paper_common.randerCart(Teacher.paper.paper_question.question_cart_json_2_html(data.question_cart))) : $.tiziDialog({content: data.error})
        }, "json");
        //根据试题id异步查询分析与答案
    }, getQuestionAnswer: function (this_a) {
        var qid = $(this_a).data("question_id");
        var sid = $(".subject-chose").data("subject");
        if ($("#ans_" + qid).hasClass("firster")) {
            ZENG.msgbox.show(" 正在加载中，请稍后...", 6, 100000), $.post("/paper/paperQuestion/getQuestionAnaLysis", {"questionOrResourcesId": qid, "subjectId": sid, "questionOrResources": 1}, function (data) {

                if (parseInt(data.status) == 1) {
                    //var str ="<div>"+data.analysis+"</div><div>"+data.answer+"</div>";
                    var str = data.analysis + data.answer;
                    ZENG.msgbox.hide(), $("#ans_" + qid).empty().append(str), initPicture(qid);
                }
                //超出校外查看答案限制次数时提示
                if (parseInt(data.status) == 2) {
                    var str = "<div class='danger-color'>您的查看答案次数过于频繁，请稍后再来！</div>";
                    ZENG.msgbox.hide(), $("#ans_" + qid).empty().html(str), initPicture(qid);
                }
                ZENG.msgbox.hide();
            }, "json");
            $("#ans_" + qid).removeClass('firster');
        }

        if ($("#ans_" + qid).is(":hidden")) {
            $("#ans_" + qid).show();
        } else {
            $("#ans_" + qid).hide();
        }
    }
    , //试题列表分页显示试题
    page: function (page) {
        if (page == 1) {
            var cidd = 0;
            if (requestURI == "question") {
                cidd = cid;
            } else if (requestURI == "course") {
                cidd = gid;
            }
            isSchool = $("#source .active").attr("data-qschool");//全国or本校
            $.post("/paper/paperQuestion/getQuestionCount?cid=" + cidd + "&requestURI=" + requestURI+"&isSchool=" + isSchool, this.getUrlData(page), function (data) {
                $(".bold").html(data.counts);
                $(".sum").html("共" + data.counts + "条记录");
                var pageCount1 = parseInt(data.counts);
                if (pageCount1 % 20 == 0) {
                    pageCount1 = parseInt(pageCount1 / 20);
                }
                if (pageCount1 % 20 != 0) {
                    pageCount1 = parseInt(pageCount1 / 20) + 1;
                }
                $("#pageajax").myPagination({
                    pageCount: pageCount1,
                    debug: false,
                    ajax: {
                        on: false,
                        onClick: function (page) {
                            Teacher.paper.paper_question.page(page);
                        }
                    }

                });
            }, "json");
        }
        this.get_question(this.getUrlData(page));

    },
    paperFavorit: function () {
        $(".paperFavorit").live("click", function () {
            if ($(this).toggleClass("paperFavoritClick"), $(this).hasClass("paperFavoritClick")) {
                var cont = '<form class="paperFavoritForm" action="#" method="post" onsubmit="return false;"><p>请选择分组：</p><div>初中语文&nbsp;&nbsp;<select><option>所有未分组</option></select></div></form>';
                $.tiziDialog({
                    id: "paperFavoritHaveError",
                    title: "将题目收藏到我的题库",
                    content: cont,
                    icon: null,
                    width: 400,
                    ok: function () {
                        return $(".paperFavoritForm").submit(), !1
                    },
                    cancel: !0,
                    close: function () {
                    }
                })
            }
        })
    },
    haveErrorUploadImages: function () {
        var that = this, fbupload = $(".haveErrorForm").find(".fbupload");
        fbupload.each(function () {
            var node = $(this), loading = staticUrlName + "image/answerquestion/loading.gif", upload_id = node.attr("id");
            $("#" + upload_id).uploadify({
                formData: $.tizi_token({session_id: $.cookies.get(baseSessID)}, "post"),
                swf: staticBaseUrlName + staticVersion + "lib/uploadify/2.2/uploadify.swf",
                uploader: baseUrlName + "upload/feedback?id=" + upload_id,
                multi: !1,
                buttonClass: "choseFileBtn",
                buttonText: "上传图片",
                fileTypeExts: "*.jpg; *.png;*.gif",
                fileSizeLimit: "2048KB",
                fileObjName: upload_id,
                button_image_url: baseUrlName + "quit",
                width: 102,
                height: 28,
                overrideEvents: ["onSelectError", "onDialogClose"],
                onUploadStart: function () {
                    $(".haveErrorForm ." + upload_id).html('<img src="' + loading + '" class="imgloading"/>')
                },
                onSWFReady: function () {
                },
                onFallback: function () {
                    $(".imgTips").html(noflash)
                },
                onSelectError: function (file, errorCode) {
                    switch (errorCode) {
                        case - 110:
                            $.tiziDialog({content: "文件 [" + file.name + "] 过大！每张图片不能超过2M"});
                            break;
                        case - 120:
                            $.tiziDialog({content: "文件 [" + file.name + "] 大小异常！不可以上传大小为0的文件"});
                            break;
                        case - 130:
                            $.tiziDialog({content: "文件 [" + file.name + "] 类型不正确！不可以上传错误的文件格式"})
                    }
                    return !1
                },
                onUploadSuccess: function (file, data) {
                    var json = JSON.parse(data), upload_id_img = $(".haveErrorForm ." + upload_id);
                    if (1 == json.code) {
                        var img_path = json.img_path;
                        that.drawImage(img_path, 92, 71, upload_id), upload_id_img.removeClass("red"), upload_id_img.addClass("upladpicSpan").removeClass("upladpic")
                    } else
                        upload_id_img.html("<b>" + json.msg + "</b>"), upload_id_img.addClass("red");
                    upload_id_img.siblings(".clearpic").show(), upload_id_img.siblings(".clearpic").on("click", function () {
                        upload_id_img.find("img").remove(), upload_id_img.siblings(".clearpic").hide(), upload_id_img.removeClass("red"), upload_id_img.removeClass("upladpicSpan").addClass("upladpic")
                    })
                },
                onUploadComplete: function () {
                }
            })
        })
    },
    drawImage: function (src, width, height, upload_id) {
        var image = new Image, Img = new Image;
        image.src = src, image.onload = function () {
            image.width > width || image.height > height ? (w = image.width / width, h = image.height / height, w > h ? (Img.width = width, Img.height = image.height / w) : (Img.height = height, Img.width = image.width / h)) : (h = image.height / height, Img.width = image.width / h, Img.height = height), $(".haveErrorForm ." + upload_id).html('<img src="' + src + '" class="picture_urls" width="' + Img.width + '" height="' + Img.height + '"/>')
        }
    }
};

function returnTop() {
    $('html, body,.content,.exam_list,.mainContainer .paperDetails,.mainContainer,.question-box').animate({
        scrollTop: '0px',
    }, 'slow');
}

