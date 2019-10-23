var min_max

function selectVideo(){
    $("#time-select").empty()
    //TODO change if statement to selecting the name of the video file from an array
    if ($('#dropdown').val() == "2") {
        min_max = '13'
        var min_input = $('<input/>', {
            id: 'min',
            type: 'number',
            min: '0',
            max: min_max
        })
        var sec_input = $('<input/>', {
            id: 'sec',
            type: 'number',
            min: '0',
            max: '59'
        })
        $("#time-select").append(min_input, sec_input)
        $("#min").val("0")
        $("#sec").val("0")
    }
}

function parseTime() {
    var min = $("#min").val()
    var formattedMin = ("0" + min).slice(-2)
    var sec = $("#sec").val()
    var formattedSec = ("0" + sec).slice(-2)
    return "00:" + formattedMin + ":" + formattedSec
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
    $('#submit').on("click", function() {
            if (parseInt($('#min').val()) <= min_max && parseInt($('#sec').val()) <= 59){
            console.log('min sec length valid')
            var time = parseTime()
            createSS(time)
        } else {
            $('#error-msg').text('not a valid time')
        }
    })
    $('#dropdown').on("change", selectVideo)

    $('#see-text').on('click', Canvas.Reload)
    $("#text-size").on('click', changeSize)
})