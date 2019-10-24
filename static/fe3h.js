var min_max

function selectVideo(){
    //change min_max based on video
    if ($("#dropdown").val() == 1) {
        min_max = 13
    } else if ($("#dropdown").val() == 2) {
        min_max = 13
    }
}

function parseTime() {
    var time = $("#time").val()
    var min_sec = time.split(":")
    var min = parseInt(min_sec[0])
    var sec = parseInt(min_sec[1])
    console.log(min, sec, min_max, min <= min_max, sec <= 59)
    if (min <= min_max && sec <= 59) {
        formattedTime = "00:" + ("0" + time).slice(-4)
        console.log(formattedTime)
        return formattedTime
    }
    return "error"
}
function createSS(time) {
    console.log(time)
    var data_to_save = {"time": time}  
    $.ajax({
        type: "POST",
        url: "send_time",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            console.log("about to append image", result["fname"])
            src = '/static/images/' + result["fname"]
            add_canvas(src)
            // var image = $('<img/>', {id: "screenshot", src: src})
            // $("#canvas-container").append(image)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}


const canvasWidth = 768,
    canvasHeight = 432
var ctx, backgroundImage, textBox

var Canvas = {
    Reload: function() {
        // Draw the content
        ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight)
        ctx.drawImage(textBox, 0, 0, canvasWidth, canvasHeight)
        Canvas.DrawText()
        console.log("drew everything")
    },
    DrawText: function() {
        console.log("drawing stuff")
        line1 = $('#line1').val()
        line2 = $('#line2').val()
        line3 = $('#line3').val()
        if ($('#line3').prop('disabled')) {
            ctx.font = "16pt Plantin"
            ctx.fillText(line1, 154, 350)
            ctx.fillText(line2, 154, 379)            
        } else {
            ctx.font = "10pt Plantin"
            ctx.fillText(line1, 154, 345)
            ctx.fillText(line2, 155, 367)
            ctx.fillText(line3, 154, 388)
        }
    }
}

function changeSize() {
    if ($('#line3').prop('disabled')) {
        $('#line3').prop('disabled', false)
        $('#text-size').text('switch to big text')
        console.log("input is now allowed")
        //redraw lines
        Canvas.Reload()
    } else {
        $('#line3').prop('disabled', true)   
        $('#text-size').text('switch to small text')
        console.log("input has been disabled")     
        //redraw lines
        Canvas.Reload()
    }
}

function add_canvas(bgSrc){
    // Get the specific canvas element from the HTML document
    var canvas = $('#image-canvas')[0]
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    ctx = canvas.getContext('2d')
    ctx.fillStyle = "#555049"

    //Set the src of all the images we want
    textBox = new Image()
    textBox.src = "/static/images/textbox_overlay.png"
    backgroundImage = new Image()
    backgroundImage.src = bgSrc
    //Load all the images onto the canvas
    $(backgroundImage).on('load', Canvas.Reload)
}

$(document).ready(function(){
    $('#line1').val("This is an FE:3H screenshot simulator.")
    add_canvas('/static/images/byleth768.png')
    $('#see-text').on('click', Canvas.Reload)
    $("#text-size").on('click', changeSize)

    min_max = 13 //default video's max minute
    $('#dropdown').on("change", selectVideo)
    $("#submit").on("click", function() {
        var time = parseTime()
        if (time != "error") {
            createSS(time)
        } else {
            $('#error-msg').text('not a valid time')
        }
    })
})