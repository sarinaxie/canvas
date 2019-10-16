$(document).ready(function(){
    //doesn't work for dropdown navbar items
    //dropdown inactive items should get a "gray" class
    $('nav li').each(function(){
        console.log(window.location.pathname, $(this).find('a'), $(this).find('a').attr('href'))
        if(window.location.pathname.indexOf($(this).find('a').attr('href')) > -1) {
            $(this).toggleClass('active')
        }  
    })
})