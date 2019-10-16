function parseTime() {
    return "00:00:18"
}
function sendTime() {
    console.log("startcapture")
    var time=parseTime($("#time").value)
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

$(document).ready(function(){
    // vanilla JS:
    // const timeElem = document.getElementById("time");
    // timeElem.addEventListener("click", sendTime, false);
    $('#time').on("click", sendTime)
})