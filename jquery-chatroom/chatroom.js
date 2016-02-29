$(document).ready(function() {

  $("Button1").click(function() {
    var $content = $("#txtContent");
    if ($content.val() != "") {
      SendContent($content.val());
    }
    else {
      alert("发送内容不能为空");
      $content.focus();
      return false;
    }
  });

  InitFace();
  $("table tr td img").click(function() {
    var strContent = $("#txtContent").val() + "<:" + this.id + ":>";
    $("txtContent").val(strContent);
  });

  AutoUpdContent();

  var hander = setInterval("AutoUpdContent", 5000);

  $("#divMsg").ajaxStart(function() {
    $(this).show().html("正在发送数据...");
  });
  $("#divMsg").ajaxStop(function() {
    $(this).html("已完成").hide();
  })

  function InitFace() {
    var strHTML = "";
    for (var i=1; i<10; i++) {
      strHTML += "";
      $("#divFace").html(strHTML);
    }
  }

  function GetMessageList() {
    $.ajax({
      type: "GET",
      url: "index.php",
      data: 'action=ChaList&d=' + new Date(),
      success: function(data) {
        $("#divContent").html(data);
      }
    });
  }

  function GetOnLineList() {
    $.ajax({
      type: "GET",
      url: "index.php",
      data: 'action=OnLineList&d=', new Date(),
      success: function(data) {
        $("#divOnline").html(data);
      }
    });
  }

  function AutoUpdContent() {
    GetMessageList();
    GetOnlineList();
  }

  function SendContent(content) {
    $.ajax({
      type: "GET",
      url: "index.php",
      data: "action=SendContent=" + new Date() + "&content=" + content,
      success: function(data) {
        GetMessageList();
        $("#txtContent").val();
      }
      else {
        alert("发送失败");
        return false;
      }
    })
  }

});
