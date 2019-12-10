<!DOCTYPE html>
<html lang="en">
<head>
    <title>文章列表 </title>
</head>

<body class="nav-md">

<!-- page content -->
<div class="right_col" role="main">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Tables
                    <small>Some examples to get you started</small>
                </h3>
            </div>

            <div class="title_right">
                <div class="col-md-5 col-sm-5   form-group pull-right top_search">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for...">
                        <span class="input-group-btn">
                      <button class="btn btn-default" type="button">Go!</button>
                    </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row" style="display: block;">
            <div class="clearfix"></div>

            <div class="col-md-12 col-sm-12  ">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Table design
                            <small>Custom design</small>
                        </h2>
                        <ul class="nav navbar-right panel_toolbox">
                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                            </li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#">Settings 1</a>
                                    <a class="dropdown-item" href="#">Settings 2</a>
                                </div>
                            </li>
                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>

                    <div class="x_content">

                        <p>Add class <code>bulk_action</code> to table for bulk actions options on row select</p>

                    <#--<div class="row">-->
                    <#--<div class="col-md-6">-->
                    <#--<div class="btn-group">-->
                    <#--<button class="btn btn-success" type="button">新建</button>-->
                    <#--<button class="btn btn-info" type="button">删除</button>-->
                    <#--<button class="btn btn-primary" type="button">Haha</button>-->
                    <#--</div>-->

                    <#--<div class="columns columns-right btn-group pull-right"><button class="btn btn-default" type="button" name="refresh" title="刷新"><i class="fa fa-refresh icon-refresh"></i></button></div>-->
                    <#--<div class="pull-right search"><input class="form-control" type="text" placeholder="搜索"></div>-->
                    <#--</div>-->
                    <#--</div>-->

                        <div class="fixed-table-toolbar">
                            <div class="bs-bars pull-left">
                                <div class="btn-group hidden-xs" id="toolbar">
                                    <a class="btn btn-success" title="发表文章" href="${wolf.context}/article/edit"> <i
                                            class="fa fa-pencil fa-fw"></i>
                                    </a>
                                    <button id="btn_batch_delete" type="button" class="btn btn-danger" title="删除选中"><i
                                            class="fa fa-trash-o fa-fw"></i>
                                    </button>
                                    <button id="btn_status_undeploy" type="button" class="btn btn-dark" title="批量取消发布"><i
                                            class="fa fa-bullhorn fa-fw"></i>
                                    </button>
                                    <button id="btn_status_deploy" type="button" class="btn btn-info" title="批量发布"><i
                                            class="fa fa-send-o fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="columns columns-right btn-group pull-right">
                                <button class="btn btn-dark" type="button" name="refresh" title="刷新"><i
                                        class="fa fa-refresh icon-refresh"></i>
                                </button>
                            </div>
                            <div class="pull-right search">
                                <input class="form-control" type="text" placeholder="搜索">
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table id="datatable" class="table table-striped jambo_table bulk_action">
                                <thead>
                                <tr class="headings">
                                    <th>
                                        <input type="checkbox" id="check-all" class="flat">
                                    </th>
                                    <th class="column-title">标题</th>
                                    <th class="column-title">更新时间</th>
                                    <th class="column-title">Order</th>
                                    <th class="column-title">作者</th>
                                    <th class="column-title">状态</th>
                                    <th class="column-title">是否置顶</th>
                                    <th class="column-title no-link last"><span class="nobr">操作</span>
                                    </th>
                                    <th class="bulk-actions" colspan="7">
                                        <a class="antoo" style="color:#fff; font-weight:500;">批量操作 ( <span
                                                class="action-cnt"> </span> ) <i class="fa fa-chevron-down"></i></a>
                                    </th>
                                </tr>
                                </thead>

                                <tbody id="article-container">
                                <#--<tr class="even pointer">
                                    <td class="a-center ">
                                        <input type="checkbox" class="flat" name="table_records">
                                    </td>
                                    <td class=" ">121000040</td>
                                    <td class=" ">May 23, 2014 11:47:56 PM</td>
                                    <td class=" ">121000210 <i class="success fa fa-long-arrow-up"></i></td>
                                    <td class=" ">John Blank L</td>
                                    <td class=" ">Paid</td>
                                    <td class="a-right a-right ">$7.45</td>
                                    <td class=" last"><a href="#">View</a>
                                    </td>
                                </tr>
                                <tr class="odd pointer">
                                    <td class="a-center ">
                                        <input type="checkbox" class="flat" name="table_records">
                                    </td>
                                    <td class=" ">121000039</td>
                                    <td class=" ">May 23, 2014 11:30:12 PM</td>
                                    <td class=" ">121000208 <i class="success fa fa-long-arrow-up"></i>
                                    </td>
                                    <td class=" ">John Blank L</td>
                                    <td class=" ">Paid</td>
                                    <td class="a-right a-right ">$741.20</td>
                                    <td class=" last"><a href="#">View</a>
                                    </td>
                                </tr>-->

                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /page content -->

<script>
    $(document).ready(function () {

        YWM.Api.article.page().then(function (pageArticle) {
            console.log("***this",this);
            let _temp = template.compile(`
                {{if contents}}
                {{each contents article index}}
                {{set odd_even = index % 2 == 0 ? "even" : "odd"}}
                <tr class="{{odd_even}} pointer" data-id={{article.id}}>
                    <td class="a-center ">
                        <input type="checkbox" class="flat" name="table_records">
                    </td>
                    <td class=" ">{{article.title}}</td>
                    <td class=" ">May 23, 2014 11:47:56 PM</td>
                    <td class=" ">121000210 <i class="success fa fa-long-arrow-up"></i></td>
                    <td class=" ">John Blank L</td>
                    <td class=" ">{{article.statusName}}</td>
                    <td class="a-right a-right ">{{article.top?"是":"否"}}</td>
                    <td class="last">
                        <a href="${wolf.context}/article/{{article.editorType=='SIMPLEMDE'?'edit_md':'edit'}}?id={{article.id}}">编辑</a>
                        <a href="${wolf.context}/article/delete/{{article.id}}">删除</a>
                    </td>
                </tr>
                {{/each}}
                {{/if}}
                `.trim());
            $("#article-container").append(_temp({contents: pageArticle.content}));

            init_DataTables();
            init_iCheck();
        }).catch(function () {});


        //批量删除
        $("#btn_batch_delete").click(function () {

        });

        //批量发布
        $("#btn_status_deploy").click(function () {
            let ids = getTableActiveIds();
            YWM.Api.article.batchChangeStatus(YWM.Constant.ArticleStatus.DEPLOY,ids).then(function () {
                window.location.reload();
            })
        });

        //批量取消发布
        $("#btn_status_undeploy").click(function () {
            let ids = getTableActiveIds();
            YWM.Api.article.batchChangeStatus(YWM.Constant.ArticleStatus.UNDEPLOY,ids).then(function () {
                window.location.reload();
            })
        });

    });


    function getTableActiveTr() {
        return $(".bulk_action input[name='table_records']:checked").closest("tr");
    }

    function getTableActiveIds() {
        let ids = [];
        getTableActiveTr().each(function (index, tr) {
            let id = $(tr).data("id");
            if(id && !ids.includes(id)){
                ids.push(id);
            }
        });
        return ids;
    }


    function init_DataTables() { //http://www.datatables.net
        console.log('run_datatables');

        if (typeof ($.fn.DataTable) === 'undefined') {
            return;
        }
        console.log('init_DataTables');

        var handleDataTableButtons = function () {
            if ($("#datatable-buttons").length) {
                $("#datatable-buttons").DataTable({
                    dom: "Blfrtip",
                    buttons: [
                        {
                            extend: "copy",
                            className: "btn-sm"
                        },
                        {
                            extend: "csv",
                            className: "btn-sm"
                        },
                        {
                            extend: "excel",
                            className: "btn-sm"
                        },
                        {
                            extend: "pdfHtml5",
                            className: "btn-sm"
                        },
                        {
                            extend: "print",
                            className: "btn-sm"
                        },
                    ],
                    responsive: true
                });
            }
        };

        TableManageButtons = function () {
            "use strict";
            return {
                init: function () {
                    handleDataTableButtons();
                }
            };
        }();

        $('#datatable').dataTable({ //https://www.datatables.net/manual/
            searching: false,
            scrollX: false,
            lengthChange: false,
            language: {
               emptyTable: "empty table"
            }
        });

        $('#datatable-keytable').DataTable({
            keys: true
        });

        $('#datatable-responsive').DataTable();

        $('#datatable-scroller').DataTable({
            ajax: "js/datatables/json/scroller-demo.json",
            deferRender: true,
            scrollY: 380,
            scrollCollapse: true,
            scroller: true
        });

        $('#datatable-fixed-header').DataTable({
            fixedHeader: true
        });

        var $datatable = $('#datatable-checkbox');

        $datatable.dataTable({
            'order': [[1, 'asc']],
            'columnDefs': [
                {orderable: false, targets: [0]}
            ]
        });
        $datatable.on('draw.dt', function () {
            $('checkbox input').iCheck({
                checkboxClass: 'icheckbox_flat-green'
            });
        });

        TableManageButtons.init();

    };
</script>
</body>
</html>
