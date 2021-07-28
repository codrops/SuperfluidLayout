import { preloadImages } from './utils';
import { Menu } from './menu';
import { TextReveal } from './textReveal';
import { TextLinesReveal } from './textLinesReveal';
import { ImgReveal } from './imgReveal';
import { gsap } from 'gsap';

// DOM elements:
let DOM = {
    frame: document.querySelector('.frame')
};
// menu button
DOM.menuCtrl = document.querySelector('.menu-link');
// menu container
DOM.menuWrap = document.querySelector('.menu');
// text content elements
DOM.textContent = {
    heading: document.querySelector('.heading'),
    primary: document.querySelector('.content-primary'),
    secondary: document.querySelector('.content-secondary')
};
// image
DOM.img = document.querySelector('.deco');

// page state
let state = 0;

// text lines reveal obj
const textLinesReveal = new TextLinesReveal([DOM.textContent.primary, DOM.textContent.secondary]);

// Image reveal obj
const imgReveal = new ImgReveal(DOM.img);

// Other text animations
const textReveal = new TextReveal([DOM.textContent.heading, DOM.menuCtrl]);

// Menu
const menu = new Menu(DOM.menuWrap);


// show the initial texts and images
const showContent = () => {
    textReveal.in();
    // show texts (slide in)
    textLinesReveal.in();
    // show image
    imgReveal.in();
    // also show frame
    toggleFrame();
};

// hide the initial texts, images, and frame
const hideContent = () => {
    // hide texts
    textReveal.out();
    // hide texts (lines)
    textLinesReveal.out();
    // hide image(s)
    imgReveal.out();
    // also hide frame
    toggleFrame();
};

// show/hide frame elements
const toggleFrame = () => {
    gsap.to(DOM.frame, {
        duration: 1,
        ease: 'expo',
        opacity: Number(!state)
    });
};

// Clicking the menu button will open the menu
DOM.menuCtrl.addEventListener('click', () => {
    if ( state !== 0 ) return;
    state = 1;
    hideContent();
    menu.open();
});

// Close the menu and back to initial page
menu.DOM.closeCtrl.addEventListener('click', () => {
    if ( state !== 1 ) return;
    state = 0;
    showContent();
    menu.close();
});

// Preload images
preloadImages('.deco__img, .panel__img').then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');
    // show content
    showContent();
});