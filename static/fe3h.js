var clicked = 0
function onPlayerStateChange(event) {
    if (event.data == 1 && clicked == 0) {
        $('#overlay').html('<img id="black" src="static/images/justblack.png" />')
        $("#spoiler-switch").html('<a href="#!">hide anti-spoilers bar</a>')
        clicked = 1
    }
}
function initIfLoaded() {
    yt_int = setInterval(function(){
        if(typeof YT === "object"){
            //init the video
            var video = new YT.Player('video', {events: {'onStateChange': onPlayerStateChange}})

            clearInterval(yt_int)
        }
    },500)
}
$.getScript("//www.youtube.com/player_api", initIfLoaded)


//values of default video
var hr_max = 1
var min_max = 41
var sec_max = 24
function selectVideo(){
    vid = $("#dropdown").val()
    //console.log("vid", vid)
    if (vid == "Sylvain") {
        $('#video').attr('src', "https://www.youtube.com/embed/tUTXN7vXTNI?mute=0&enablejsapi=1")
        hr_max = 1
        min_max = 41
        sec_max = 24
        initIfLoaded()
    } else if (vid == "Byleth-Edelgard") {
        $('#video').attr('src', "https://www.youtube.com/embed/L_-7jrLftjQ?mute=0&enablejsapi=1")
        hr_max = 0
        min_max = 17
        sec_max = 28
        initIfLoaded()
    }
}
function parseTime() {
    var time = $("#time").val()
    var min_sec = time.split(":")
    var hr, min, sec
    if (min_sec.length == 2) {
        hr = 0
        min = min_sec[0]
        sec = min_sec[1]
    } else {
        hr = parseInt(min_sec[0])
        min = parseInt(min_sec[1])
        sec = parseInt(min_sec[2])
    }
    //ex: max is 1:23:45, 1:22:59 = T&&(T||F) and 1:23:45 = T&&(F||T)
    console.log(hr, min, sec)
    if (hr <= hr_max && ((min < min_max && sec <= 59) || (min == min_max && sec <= sec_max))) {
        return time
    }
    return "error"
}
function createSS(time, vname) {
    console.log(time, vname)
    var data_to_save = {"time": time, "vname": vname}  
    $.ajax({
        type: "POST",
        url: "create_ss",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            console.log("about to update image", result["fname"])
            src = '/static/images/' + result["fname"]
            add_canvas(src)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}
function deleteSS() {
    //ajax request might not get sent!
    var bgimg = backgroundImage.src.split("/").slice(-1)[0]
    console.log("in deleteSS", bgimg)
    if(bgimg != 'byleth768.png') {
        var data_to_save = {"del_fname": bgimg}
        $.ajax({
            type: "POST",
            url: "delete_ss",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data_to_save),
            success: function(){
                console.log("I don't think I can see this anyway cuz the page was closed")
            },
            error: function(request, status, error){
                console.log("Error")
                console.log(request)
                console.log(status)
                console.log(error)
            }
        })
    }
}


var ctx, backgroundImage, textBox
var Canvas = {
    Reload: function() {
        // Draw the content
        ctx.drawImage(backgroundImage, 0, 0)
        //take image's textbox at edge and transform it to cover the text
        ctx.drawImage(backgroundImage, 460, 327, 34, 66, 154, 327, 309, 66)
        Canvas.DrawText()
    },
    DrawText: function() {
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
function add_canvas(bgSrc){
    // Get the specific canvas element from the HTML document
    var canvas = $('#image-canvas')[0]
    canvas.width = 768
    canvas.height = 432
    ctx = canvas.getContext('2d')
    ctx.fillStyle = "#555049"

    //Set the src of all the images we want
    backgroundImage = new Image()
    backgroundImage.src = bgSrc
    //Load all the images onto the canvas
    $(backgroundImage).on('load', Canvas.Reload)
}
function changeSize() {
    if ($('#line3').prop('disabled')) {
        $('#line3').prop('disabled', false)
        $('#text-size').text('switch to big text')
        //redraw lines
        Canvas.Reload()
    } else {
        $('#line3').prop('disabled', true)   
        $('#text-size').text('switch to small text')
        //redraw lines
        Canvas.Reload()
    }
}


$(document).ready(function(){
    $('#line1').val("Absolutely awful.")
    add_canvas('/static/images/byleth768.png')
    $('#see-text').on('click', Canvas.Reload)
    $("#text-size").on('click', changeSize)

    $('#dropdown').on("change", selectVideo)

    $("#submit").on("click", function() {
        var time = parseTime()
        if (time != "error") {
            $('#error-msg').empty()
            createSS(time, $('#dropdown').val())
        } else {
            $('#error-msg').text('not a valid time')
        }
    })

    //on video click, turn anti-spoilers on and add a div for toggling anti-spoiler mode
    $("#spoiler-switch").on('click', function() {
        if ($('#overlay').html().length != 0) {
            $('#overlay').html('')
            $("#spoiler-switch").html('<a href="#!">show anti-spoilers bar</a>')
        } else {
            $('#overlay').html('<img id="black" src="static/images/justblack.png" />')
            $("#spoiler-switch").html('<a href="#!">hide anti-spoilers bar</a>')
        }
    })
    $(window).on('beforeunload', deleteSS)
    //window.addEventListener('beforeunload', deleteSS)
})