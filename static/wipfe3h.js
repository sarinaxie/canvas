const canvasWidth = 768,
    canvasHeight = 432

function init(){
    // Set the src of all the images we want
    //Load all the images onto the canvas

    // Set up the canvas

    // Get the specific canvas element from the HTML document
    var canvas = $('#image-canvas')[0]
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    ctx = canvas.getContext('2d')
    ctx.font = "bold 11pt Garamond"
    ctx.fillStyle = "#555049"

    // Reset to defaults

    // Assign HTML functions to elements
    //I prob won't need it
}
$(document).ready(function(){
    init()
    
    var backgroundImage = new Image()
    backgroundImage.src = "/static/images/byleth768.png"
    console.log("hi")

    $(backgroundImage).on('load', function(){
        console.log("hi2")
        ctx.drawImage(backgroundImage,0,0,canvasWidth,canvasHeight);   
        ctx.fillText("Hello World", 10, 50)
    })
    
    
    
})