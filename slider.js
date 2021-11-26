$(() => {
    let arr = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"]
    let src = 0
    let timer
    let slider = $("#slider")
    slider
        .css({
            position: 'relative',
            width: "80%",
            height: "60vh",
            margin: "10vh auto",
            boxShadow: "0 0 10px #000",
            background: `url('img/${arr[src]}') center/cover`,
            overflow: "hidden"
        })
        .append('<div id="slide"></div>')
        .append('<div id="thumb"></div>')
        .click(function(e) {
            change( (e.pageX > $(window).width() / 2) ? 1 : -1 )
        })
        .mouseenter(function() {
            clearTimeout(timer)
        })
        .mouseleave(function() {
            timer = setTimeout(change, 3000)
        })

    let slide = $('#slide')
    slide.css({
        position: "absolute",
        width: "100%",
        height: "100%",
    })

    let thumb = $('#thumb')
    thumb.css({
        position: 'absolute',
        width: '100%',
        bottom: 0,
        textAlign: 'center'
    })

    arr.forEach( image => thumb.append(`<img src="img/${image}" />`) )
    $('#thumb > img')
        .css({
            width: '25px',
            height: '25px',
            border: '2px solid #FFF',
            borderRadius: '50%',
            margin: '7px'
        })
        .click(function(e) {
            e.stopPropagation()
            src = $(this).index() - 1
            change(1)
        })

    timer = setTimeout(change, 3000)

    function change(direction = 1) {
        clearTimeout(timer)
        src += direction
        if ( src < 0 ) src = arr.length - 1
        if ( src >= arr.length ) src = 0
        slide
            .css({
                left: direction * slider.width(),
                background: `url('img/${arr[src]}') center/cover`
            })
            .animate({
                left: 0
            }, 1000, function() {
                slider.css({
                    background: `url('img/${arr[src]}') center/cover`
                })
            })
        timer = setTimeout(change, 3000)
    }
})