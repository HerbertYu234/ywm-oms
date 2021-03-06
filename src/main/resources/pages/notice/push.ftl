<html>
<head>
    <title>消息推送</title>
    <!-- iCheck -->
    <link href="/js/lib/iCheck/skins/flat/green.css" rel="stylesheet">
    <script src="/js/lib/iCheck/icheck.min.js"></script>
</head>

<body>

<!-- page content -->
<div class="right_col" role="main">
    <div>
        <div class="page-title">
            <div class="title_left">
                <h3>前端消息推送</h3>
            </div>
        </div>
        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-4">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>当前在线(${(online?size)!0}人)
                            <small>from websocket</small>
                        </h2>
                    <#--<ul class="nav navbar-right panel_toolbox">
                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                    </ul>-->
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        <div class="">
                            <ul class="to_do" id="onlineUsers">
                                <#if online?? && online?size gt 0 >
                                    <li>
                                        <p><input type="checkbox" value="@all" class="flat"> 所有人（@all）</p>
                                    </li>
                                    <#list online?keys as key>
                                    <li>
                                        <p><input type="checkbox" value="${key}" class="flat"> ${key} </p>
                                    </li>
                                    </#list>
                                </#if>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-8">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>消息推送给
                            <small id="receivers"></small>
                        </h2>
                        <ul class="nav navbar-right panel_toolbox">
                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>

                    <div class="x_content">
                    <#--<div id="editor-one" class="editor-wrapper"></div>-->
                    <#--<br/>-->
                    <#--<div class="ln_solid"></div>-->

                        <form class="form-horizontal form-label-left">
                            <div class="item form-group">
                                <label class="control-label col-md-2 col-sm-2 ">消息内容:</label>
                                <div class="col-md-10 col-sm-10 ">
                                    <textarea rows="5" name="content"
                                              class="resizable_textarea form-control"></textarea>
                                </div>
                            </div>
                            <div class="item form-group">
                                <div class="col-md-12 col-sm-12 offset-md-6">
                                <#--<button class="btn btn-primary" type="button">Cancel</button>-->
                                <#--<button class="btn btn-primary" type="reset">Reset</button>-->
                                    <button type="button" id="btn_publish" class="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>


    </div>
</div>
<!-- /page content -->

<script>

    $(function () {
        init_iCheck(function () {

            $("#onlineUsers input[type='checkbox']").off("ifChecked").on("ifChecked", function (event) {
                var checked = $(this).prop("checked");
                console.log("change", checked, $(this));

                if (checked) {
                    $(this).closest("li").siblings("li").find("input[type='checkbox']").iCheck('uncheck');
                    $("#receivers").text($(this).closest("p").text());
                    return false;
                }
            });

            $("#onlineUsers input[type='checkbox']").off("ifUnchecked").on("ifUnchecked", function (event) {
                var checked = $(this).prop("checked");
                console.log("change", checked, $(this));
                $("#receivers").text("");
            });

        });

        //发送
        $("#btn_publish").click(function () {
            let msg = $("textarea[name='content']").val();
            let users = [];

            if (!msg) {
                alert("请输入消息内容");
                return;
            }

            if (!users || users.length < 1) {
                alert("请选择推送人员！");
                return;
            }

            $("#onlineUsers input[type='checkbox']:checked").each(function (i, element) {
                users.push($(this).val());
            });
            users = users.includes("@all") ? "@all" : users.join("|");

            YWM.Api.notice.publish(msg, users).then(function () {
                alert("发送成功！");
                window.location.reload();
            })
        });

    });

</script>
</body>
</html>