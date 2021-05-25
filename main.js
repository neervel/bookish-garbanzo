let taskElem, title, desc, ready, arr;
const baseUrl = 'http://localhost:3000/todo/';

$("#get").on('click', () => {
  $(".getTask").html('');
  $.ajax({
    url: baseUrl + 'get?id=' + $("#id").val().trim(),
    method: 'GET',
    contentType: 'application/json',
    success: function (data) {
      data = data[0];
      title = data['title'];
      desc = data['description'];
      id = data['_id'];
      ready = data['isComplete'] ? '<span class="task__ready ok">✔</span>' : '<span class="task__ready not_ok">✖</span>';
      taskElem = $('<div class="task"><h1 class="task__title">' + title + '</h1><p class="task__desc">Description: ' + desc + '</p><span>IsComplete: ' + ready + '</span><p class="task__id">ID: ' + id + '</p></div>')
      $(".getTask").append(taskElem)
    }, error: function () {
      $(".alert-danger").animate({ 'top': "0" });
    }
  });
  $("#id").val('');
})

function getAll() {
  $(".allTasks").html('');
  $.ajax({
    url: baseUrl + 'get',
    method: 'GET',
    contentType: 'application/json',
    success: function (data) {
      if (Object.keys(data).length == 0) {
        $(".allTasks").text("There are no any tasks")
      } else {
        $.each(data, (index, value) => {
          title = value['title'];
          desc = value['description'];
          id = value['_id'];
          ready = value['isComplete'] ? '<span class="task__ready ok">✔</span>' : '<span class="task__ready not_ok">✖</span>';
          taskElem = $('<div class="task"><h1 class="task__title">' + title + '</h1><p class="task__desc">Description: ' + desc + '</p><span>IsComplete: ' + ready + '</span><p class="task__id">ID: ' + id + '</p></div>')
          $(".allTasks").append(taskElem)
        })
      }
    }
  });
}

// $("#getAll").on('click', () => {
//   getAll();
// })

$("#clear").on('click', () => { $(".allTasks").html(''); })

$('#del').on('click', () => {
  $.ajax({
    url: baseUrl + 'delete?id=' + $("#delId").val().trim(),
    method: 'DELETE',
    contentType: 'application/json',
    success: function (result) {
      $(".alert-success").animate({ 'top': "0" });
      // getAll();
    }, error: function (msg) {
      $(".alert-danger").animate({ 'top': "0" });
    }
  });
  $("#delId").val('');
})

$("#create").on('click', () => {
  if ($("#createTitle").val() || $("#createDesc").val()) {
    let arr = {
      "title": $("#createTitle").val().trim(),
      "description": $("#createDesc").val().trim(),
      "isComplete": $("#createIsComplete").prop('checked'),
    }
    $.ajax({
      url: baseUrl + "create/",
      type: 'POST',
      data: JSON.stringify(arr),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      async: true,
      success: function (msg) {
        $(".alert-success").animate({ 'top': "0" });
        $("#createTitle").val('');
        $("#createDesc").val('');
        $("#createIsComplete").prop('checked', '');
        // getAll();
      }, error: function (msg) {
        $(".alert-danger").animate({ 'top': "0" });
      }
    })
  }
});

$("#patch").on('click', () => {
  $.ajax({
    url: baseUrl + 'get?id=' + $("#patchId").val().trim(),
    method: 'GET',
    contentType: 'application/json',
    success: function (data) {
      data = data[0];
      title = data['title'];
      desc = data['description'];
      arr = {
        "id": $("#patchId").val().trim(),
        "title": $("#patchTitle").val().trim() ? $("#patchTitle").val().trim() : title,
        "description": $("#patchDesc").val().trim() ? $("#patchDesc").val().trim() : desc,
        "isComplete": $("#patchIsComplete").prop('checked'),
      }
      $.ajax({
        url: baseUrl + "patch/",
        type: 'PATCH',
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (msg) {
          $(".alert-success").animate({ 'top': "0" });
          $("#patchId").val('');
          $("#patchTitle").val('');
          $("#patchDesc").val('');
          $("#patchIsComplete").prop('checked', '');
          // getAll();
        }, error: function (msg) {
          $(".alert-danger").animate({ 'top': "0" });
        }
      });
    }, error: function () {
      $(".alert-danger").animate({ 'top': "0" });
    }
  });
})


new Vue({
  el: '#allTasks',
  data(){
    return{
      tasks: {}
    };
  },
  mounted(){
    axios
    .get(baseUrl + 'get')
    .then (response => (this.tasks = response['data']))
  }
})

$("#close").on('click', () => { $(".alert-success").animate({ 'top': "-64px" }); })
$("#closeWarn").on('click', () => { $(".alert-danger").animate({ 'top': "-64px" }); })