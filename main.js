// Blur on scroll
$(window).scroll(function(){
    var scroll = $(window).scrollTop();
    $('.bg1').css({
        filter: "blur(" + (scroll/70) + "px)"
    })
})

// Pausar video cuando no se vea en la pantalla
let video = document.querySelector('video');
let isPaused = false; /* flag for auto-pausing of the video */
let firstTime = true;
let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {

        // Hace que el video se ponga automáticamente en play la primera vez que se carga la página
        if(entry.intersectionRatio==1 && firstTime){
            video.play();
            firstTime = false;
        }

        // Pausa el video si se deja de ver en la pantalla
        if(entry.intersectionRatio!=1  && !video.paused){
            video.pause(); isPaused = true;
        }
        else if(isPaused) { isPaused=false}

    });
}, {threshold: 1});
observer.observe(video);


/* Selecciona todos los contenedores que contengan un video como primer hijo y le añade a cada uno un escuchador 
 de eventos, el cual escucha cuando el mouse está encima o fuera del contenedor y le pone play o pause
 al video. Además vuelve el video al tiempo 0 cuando se saca el mouse. También le pondrá play siempre y cuando la opacidad del
 elemento sea de 1 (o sea que ya ocurrió el efecto de opacidad hecho en css)
 */
const autoplay = document.querySelectorAll('.container');
let out = true;
for(let i = 0; i<autoplay.length; i++){
    autoplay[i].addEventListener('mouseenter', 
    function(e){
        setTimeout(function() {
            if ($(autoplay[i]).css('opacity') == 1){
                autoplay[i].firstElementChild.play();
            }
        }, 1100);
    })
    autoplay[i].addEventListener('mouseleave', 
    function(e){
        autoplay[i].firstElementChild.pause();
        autoplay[i].firstElementChild.currentTime = 0;
    })
}

// Lazy loading para cargar las imágenes y videos con un retardo. LINK: https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/

if(!!window.IntersectionObserver){
    let observer2 = new IntersectionObserver((entries, observer2) => { 
        entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.src = entry.target.dataset.src;
            observer2.unobserve(entry.target);
        }
        });
    }, {rootMargin: "0px 0px 400px 0px"});
    // document.querySelectorAll('img').forEach(img => { observer2.observe(img) });
    document.querySelectorAll('video, img').forEach(media => { observer2.observe(media) });
}

