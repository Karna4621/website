    console.log('test');
    const track =document.querySelector('.carousel__track');
    //console.log(track);
    const slides=Array.from(track.children);
    
    const nextButton =document.querySelector('.carousel__button--right');
    const previousButton =document.querySelector('.carousel__button--left');
    const dotsNav = document.querySelector('.carousel__nav');
    const dots = Array.from(dotsNav.children);
    
    const slideWidth=slides[0].getBoundingClientRect().width;

    const setSlidePosition=(slide,index)=>{
        slide.style.left = slideWidth * index + 'px'
    };
    slides.forEach(setSlidePosition);

const moveToSlide = (track,currentSlide,targetSlide) => {
track.style.transform = 'translateX(-' + targetSlide.style.left  + ')';
currentSlide.classList.remove('current-slide');
targetSlide.classList.add('current-slide');
}

const updateDots =(currentDot,targetDot) =>{

    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}
const hideShowArrows = (slides,previousButton,nextButton,targetIndex)=>{
if(targetIndex === 0){
    previousButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
} else if(targetIndex === slides.length-1){
    previousButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
}else{
    previousButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
}
}

previousButton.addEventListener('click', e => {

    const currentSlide=track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    console.log('prevSlide');
    const currentDot=dotsNav.querySelector('.current-slide');
    const  prevDot=currentDot.previousElementSibling;
    const prevIndex=slides.findIndex(slide=>slide === prevSlide);
    moveToSlide(track,currentSlide,prevSlide);
    updateDots(currentDot,prevDot);
    hideShowArrows(slides,previousButton,nextButton,prevIndex);

});

nextButton.addEventListener('click', e=>
{
 const currentSlide = track.querySelector('.current-slide');
 const nextSlide = currentSlide.nextElementSibling;
 moveToSlide(track,currentSlide,nextSlide);
 const amountToMove = nextSlide.style.left;
 const currentDot=dotsNav.querySelector('.current-slide');
 const  nextDot=currentDot.nextElementSibling;
 const nextIndex=slides.findIndex(slide=>slide === nextSlide);
 updateDots(currentDot,nextDot);
 hideShowArrows(slides,previousButton,nextButton,nextIndex);
 //track.style.transform='translateX(-' + amountToMove + ')';
 //currentSlide.classList.remove('current-slide');
 //targetSlide.classList.add('current-slide')
});


dotsNav.addEventListener('click',e=>{
    const targetDot = e.target.closest('button');
     if (!targetDot) return;
     const currentSlide=track.querySelector('.current-slide');
     //console.log(currentSlide);

     const currentDot = dotsNav.querySelector('.current-slide');
     const targetIndex = dots.findIndex(dot => dot === targetDot);  
     const targetSlide = slides[targetIndex];
     
     moveToSlide(track,currentSlide,targetSlide);
     updateDots(currentDot,targetDot);
     hideShowArrows(slides,previousButton,nextButton,targetIndex);
     
});

function plusSlides(n){
    clearInterval(myTimer);
    if (n < 0){
      showSlides(slideIndex -= 1);
    } else {
     showSlides(slideIndex += 1); 
    }
    if (n === -1){
      myTimer = setInterval(function(){plusSlides(n + 2)}, 4000);
    } else {
      myTimer = setInterval(function(){plusSlides(n + 1)}, 4000);
    }
  }

  function showSlides(n){
    var i;
    /*var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");*/
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
window.addEventListener("load",function() {
    
    const currentSlide=track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const slideIndex=slides.findIndex(slide=> slide === currentSlide );
    console.log(slideIndex);    
    showSlides(slideIndex);
    myTimer = setInterval(function(){plusSlides(1)}, 4000);
    console.log(myTimer);
})
