var displaySubmissions = function(subs){
    $("#submissions").empty()
    $.each(subs, function(i, record){
        var row_div = $('<div>')

        var text_div = $('<div>')
        $(text_div).addClass("d-inline-block align-top col-sm-8 word-wrap")
        $(text_div).text(record["text"])

        var x_button = $('<button>')
        $(x_button).attr("id", record["id"])
        $(x_button).addClass("d-inline-block align-top btn btn-warning btn-sm ")
        $(x_button).text("X")

        $(row_div).append(text_div).append(x_button)
        $("#submissions").append(row_div)
    })
}
var saveEntry = function(text){
    console.log("insave")
    var data_to_save = {"text": text}  
    $.ajax({
        type: "POST",
        url: "save_entry",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            var all_subs = result["subs"]
            subs = all_subs
            displaySubmissions(subs)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}
var deleteEntry = function(id){
    var id_data = {"id": id}
    $.ajax({
        type: "POST",
        url: "delete_entry",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(id_data),
        success: function(result){
            var all_subs = result["subs"]
            subs = all_subs
            displaySubmissions(subs)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

$(document).ready(function(){
    displaySubmissions(subs)
    
    $("#submit_button").click(function(){  
        console.log("i cluck submit")
        var text = $("#submission_textarea").val()
        saveEntry(text)
        $("#submission_box").val("")
        $("#submission_box").focus()
    })

    $("#submissions").on("click",".btn-warning", function() {
        deleteEntry($(this).attr('id'))
      })
})