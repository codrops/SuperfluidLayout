const imagesLoaded = require('imagesloaded');

// Preload images
const preloadImages = (selector) => {
    return new Promise((resolve, reject) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

// wrap each element of an array
// elems - the array of elements to wrap
// wrapType - type of wrapper ('div', 'span' etc)
// wrapClass - wrapper class(s) 
const wrapLines = (elems, wrapType, wrapClass) => {
    elems.forEach(char => {
          // add a wrap for every char (overflow hidden)
          const wrapEl = document.createElement(wrapType);
          wrapEl.classList = wrapClass;
          char.parentNode.appendChild(wrapEl);
          wrapEl.appendChild(char);
      });
  }

export {preloadImages, wrapLines};