function parseTime() {
    var min = $("#min").val()
    var formattedMin = ("0" + min).slice(-2)
    var sec = $("#sec").val()
    var formattedSec = ("0" + sec).slice(-2)
    console.log(formattedMin, formattedSec)
    return "00:00:08"
}
function sendTime() {
    console.log("startcapture")
    var time=parseTime()
    var data_to_save = {"time": time}  
    $.ajax({
        type: "POST",
        url: "send_time",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            console.log("about to append image")
            var image = $('<img/>', {id: "screenshot", src: "/static/images/byleth.png"})
            $("#ssdiv").append(image)
            console.log("appended")
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
    }

function selectVideo(){
    //TODO change if statement to selecting the name of the video file from an array
    if ($('#dropdown').val() == "2") {
        var time_select_div = $('<div/>', {
            id: 'time-select'
        })
        var max = '13'
        var min_input = $('<input/>', {
            id: 'min',
            type: 'number',
            min: '0',
            max: max
        })
        var sec_input = $('<input/>', {
            id: 'min',
            type: 'number',
            min: '0',
            max: '59'
        })
        time_select_div.append(min_input, sec_input)
        $("#time").append(time_select_div)
    }
}
$(document).ready(function(){
    // vanilla JS:
    // const timeElem = document.getElementById("time");
    // timeElem.addEventListener("click", sendTime, false);
    $('#submit').on("click", sendTime)

    $('#dropdown').on("change", selectVideo)
})