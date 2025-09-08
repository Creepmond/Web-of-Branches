// TODO: Include screen slipperiness (sliding) (optional for users), mobile support, zoom support, dynamic CSS stuff (Header's shadow is affected by movement) (optional for users). Motion Parallax (Background)
//* Wow, this guy likes to trouble himself

const htmlDOM = document.querySelector('html');
const background = document.getElementById('background');
const userInterface = document.getElementById('ui-dynamic');

let initMouseCoord = { X: 0, Y: 0 };
let initBodyCoord = { X: 0, Y: 0 };

htmlDOM.addEventListener('touchstart', (event) => {
   initMouseCoord = { X: event.touches[0].pageX, Y: event.touches[0].pageY };
   initBodyCoord = { X: findWindowCoord('left'), Y: findWindowCoord('top') };

   window.addEventListener('touchmove', handleCoordinates);
});

function handleCoordinates(event) {
   const touch = event.touches[0];

   const deltaCoord = {
      X: touch.pageX - initMouseCoord.X,
      Y: touch.pageY - initMouseCoord.Y
   }

   const bodyCoord = {
      X: initBodyCoord.X + deltaCoord.X,
      Y: initBodyCoord.Y + deltaCoord.Y
   };

   background.style.backgroundPosition = `${bodyCoord.X}px ${bodyCoord.Y}px`;
   userInterface.style.inset = `${bodyCoord.Y}px auto auto ${bodyCoord.X}px`;
}

htmlDOM.addEventListener('touchend', () => {
  window.removeEventListener('touchmove', handleCoordinates);
});

/**
 * Finds the HTML inset value of the parameter.
 * @param {String} direction 
 * @returns {Number}
 */

export function findWindowCoord(direction) {
   return Number(getComputedStyle(userInterface)[direction].replace(/[a-z]+/, ''))
}