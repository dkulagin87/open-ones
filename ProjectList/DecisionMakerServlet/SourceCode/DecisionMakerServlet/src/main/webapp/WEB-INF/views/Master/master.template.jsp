<!--
 Screen: Manage master "Template"
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<script src="resources/handsontable/lib/jquery-1.10.2.js"></script>
<script src="resources/handsontable/jquery.handsontable.full.js"></script>
<script src="resources/handsontable/lib/jquery-ui/js/jquery-ui.custom.min.js"></script>

<link rel="stylesheet" media="screen" href="resources/handsontable/jquery.handsontable.full.css">
<link rel="stylesheet" media="screen" href="resources/handsontable/lib/jquery-ui/css/ui-bootstrap/jquery-ui.custom.css">

<link rel="stylesheet" href="resources/jstree/themes/default/style.min.css" />
<script src="resources/jstree/jstree.min.js"></script>

<form:form action="saveMasterTemplate" method="POST">
  <div id="jstree_demo_div" class="col_3">
  </div>
  <div class="col_9">

    <div>
      <label for="templates">Danh sách biểu mẫu</label>
        <div id="dataTable"></div>
        <div id="separator"></div>
        <a id="save" class="button" href="master.template">Lưu</a>
    </div>
  </div>
</form:form>
<script>
  $(function () {
    $('#jstree_demo_div').jstree({
    		  "core" : {
    			    "animation" : 0,
    			    "check_callback" : true,
    			    "themes" : { "stripes" : true },
    			    'data' : {
    			      'url' : function (node) {
    			        return node.id === '#' ?
    			          'master.department.getNodeRoot' : 'master.department.getNodeChildren';
    			      },
    			      'dataType' : 'JSON',
    			      'data' : function (node) {
    			        return { 'id' : node.id };
    			      }
    			    }
    			  },
    			  "types" : {
    			    "#" : {
    			      "max_children" : 1, 
    			      "max_depth" : 4, 
    			      "valid_children" : ["root"]
    			    },
    			    "root" : {
    			      "icon" : "",
    			      "valid_children" : ["default"]
    			    },
    			    "default" : {
    			      "valid_children" : ["default","file"]
    			    },
    			    "file" : {
    			      "icon" : "glyphicon glyphicon-file",
    			      "valid_children" : []
    			    }
    			  },
    			  "plugins" : [
    			    "contextmenu", "dnd", "search",
    			    "state", "types", "wholerow"
    			  ]
    }      
    );
    }
  );
</script>

<script>
    $(document).ready(function() {
        var container = $("#dataTable");
        var parent = container.parent();
        container.handsontable({
            startRows: 1,
            startCols: 3,
            rowHeaders: true,
            colHeaders: ['Mã biểu mẫu', 'Tên tên biểu mẫu', 'Ghi chú'],
            colWidths: [90, 150, 150],
            manualColumnResize: true,
            minSpareRows: 1
        });

        $("#save").click(function() {
            var tableData = container.handsontable('getData');

            var parentDepartment = '';

            var formDataJson = JSON.stringify({"parentDepartment": parentDepartment,  "data":tableData});
            
            $.ajax({
                type: "POST",
            	dataType: 'json',
                contentType: 'application/json',
                url: "saveMasterTemplate",
                data: formDataJson,
                success: function(res) {
                    // [TODO] Curren version: this statement is not invoked
                    window.location = "master.template";
                },
                error: function(res) {
                	// alert("Lỗi khi lưu dữ liệu. Hãy liên hệ người quản trị hệ thống.Data:" + res.data);
                    window.location = "master.template";
                }
            });
        });

        // Load current data of Template
        $.ajax({
            url: "master.template.load",
            dataType: 'json',
            type: 'GET',
            success: function (res) {
              var handsontable = container.data('handsontable');
              handsontable.loadData(res.data);
            },
            error: function() {
            	alert("Không thể lấy dữ liệu của Biểu mẫu. Hãy liên hệ người quản trị hệ thống.");
            }
          });
    });

</script>