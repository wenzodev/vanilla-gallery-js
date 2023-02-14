const lightboxEnabled = document.querySelectorAll('.lightbox-enabled');
// create images as an array
const lightboxArray = Array.from(lightboxEnabled);
const lastImage = lightboxArray.length - 1;

const lightboxContainer = document.querySelector('.lightbox-container');
const lightboxImage = document.querySelector('.lightbox-img');

// Buttons
const lightboxBtns = document.querySelectorAll('.lightbox-btn');
const lightboxBtnLeft = document.querySelector('#left');
const lightboxBtnRight = document.querySelector('#right');
let activeImage;



//02.functions
const showLightBox = () => { lightboxContainer.classList.add('active') }

const hideLightBox = () => { lightboxContainer.classList.remove('active') }

const setActiveImage = (image) => {
    lightboxImage.src = image.dataset.imagesrc;
    activeImage = lightboxArray.indexOf(image);
    // hide the button when the last image has been loaded, using switch statement
    removeBtnInactiveClass();
    switch (activeImage) {
        case 0:
            lightboxBtnLeft.classList.add('inactive');
            break;
        case lastImage:
            lightboxBtnRight.classList.add('inactive');
            break;
        default:
            removeBtnInactiveClass();
    }
}

const removeBtnInactiveClass = () => {
    lightboxBtns.forEach(btn => {
        btn.classList.remove('inactive');
    })
}

const transitionSlidesLeft = () => {
    lightboxBtnLeft.focus();
    activeImage === 0 ? setActiveImage(lightboxArray[lastImage]) : setActiveImage(lightboxArray[activeImage].previousElementSibling);
    removeBtnAnimation();
}

const transitionSlidesRight = () => {
    lightboxBtnRight.focus();
    activeImage === lastImage ? setActiveImage(lightboxArray[0]) : setActiveImage(lightboxArray[activeImage].nextElementSibling);
    removeBtnAnimation();
}

const transitionSlideHandler = (moveItem) => {
    moveItem.includes('left') ? transitionSlidesLeft() : transitionSlidesRight();
}

const removeBtnAnimation = () => {
    lightboxBtns.forEach(btn => {
        setTimeout(function () { btn.blur(), 200 });
    })
}

//01. event listeners  
lightboxEnabled.forEach(image => {
    image.addEventListener('click', (e) => {
        showLightBox();
        setActiveImage(image);
    })
})

lightboxContainer.addEventListener('click', () => { hideLightBox() });

lightboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); //stop from closing all once clicked on button
        transitionSlideHandler(e.currentTarget.id)
    })
})

// keyboard navigation
window.addEventListener('keydown', (e) => {
    if (!lightboxContainer.classList.contains('active')) return;
    if (e.key.includes('Left') || (e.key.includes('Right'))) {
        e.preventDefault();
        transitionSlideHandler(e.key.toLowerCase());
    }
})