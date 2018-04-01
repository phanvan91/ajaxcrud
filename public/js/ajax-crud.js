$(document).ready(function(){
    $("body").on('click','.open-modal',function(){
       var task_id = $(this).val();
       $.get('http://ajaxcrud.test/task/'+task_id,function(data){
           $('#task_id').val(data.id);
            $("#task").val(data.task);
            $("#description").val(data.description);
            $("#btn-save").val("update");
           $('#myModal').modal('show');
        });
    });

    $("#btn-add").on('click',function(){
        $("#btn-save").val("add");
       $("#frmTasks").trigger("reset");
       $('#myModal').modal('show');
    });

    $("#btn-save").on('click',function(e){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });

        e.preventDefault();

        var state = $('#btn-save').val();
        if(state == "add"){
            $.ajax({
                type: 'POST',
                url : 'http://ajaxcrud.test/create',
                data : {task: $('#task').val(), description: $('#description').val()},
                dataType: 'json',
                success: function (data){
                    console.log(data);
                    var task = '<tr id="task' + data.id + '"> <td> '+data.id+' </td> <td> '+data.task+' </td> <td> '+data.description+' </td>';
                    task+= '<td> <button class="btn btn-warning btn-xs btn-detail open-modal" value="'+data.id+'">Edit</button> <button class="btn btn-danger btn-xs btn-delete delete-task" value="'+data.id+'">Delete</button> </td> ';
                    task+= '</tr>';
                    $('#tasks-list').append(task);
                    $('#frmTasks').trigger("reset");
                    $('#myModal').modal('hide');
                },error: function (data) {
                    console.log('Error:', data);
                }
            });
        }
        else if(state == "update"){
            var taskid = $("#task_id").val();
            $.ajax({
               type: 'PUT',
               url : 'http://ajaxcrud.test/update/'+taskid,
                data : {task: $('#task').val(), description: $('#description').val()},
                dataType:'json',
                success:function(data){

                    var task = '<tr id="task' + data.id + '"><td>' + data.id + '</td><td>' + data.task + '</td><td>' + data.description + '</td>';
                    task += '<td><button class="btn btn-warning btn-xs btn-detail open-modal" value="' + data.id + '">Edit</button> ';
                    task += '<button class="btn btn-danger btn-xs btn-delete delete-task" value="' + data.id + '">Delete</button></td></tr>';
                    $("#task"+taskid).replaceWith(task);
                    $('#frmTasks').trigger("reset");
                    $('#myModal').modal('hide');
                    console.log(data);
                },error: function (data) {
                    console.log('Error:', data);
                }
            });
        }
    });

    $(".delete-task").on('click',function(){
       var task_id = $(this).val();
       $.ajax({
           type : 'GET',
          url : 'http://ajaxcrud.test/del/'+task_id,
           success : function (data){
               $("#task" + task_id).remove();
           },
           error : function (data) {
               console.log(data);
           }
       });
    });
});