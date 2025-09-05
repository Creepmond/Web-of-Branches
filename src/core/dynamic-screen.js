// TODO: Include screen slipperiness (sliding), mobile support, dynamic CSS stuff (Header's shadow is affected by movement)

const htmlDOM = document.querySelector('html');
const background = document.getElementById('background');
const userInterface = document.getElementById('ui-dynamic');

let initMouseCoord = { X: 0, Y: 0 };
let initBodyCoord = { X: 0, Y: 0 };

htmlDOM.addEventListener('mousedown', (event) => {
   initMouseCoord = { X: event.pageX, Y: event.pageY };
   initBodyCoord = { X: findWindowCoord('left'), Y: findWindowCoord('top') };

   window.addEventListener('mousemove', handleCoordinates);
});

function handleCoordinates(event) {
   const deltaCoord = {
      X: event.pageX - initMouseCoord.X,
      Y: event.pageY - initMouseCoord.Y
   }

   const bodyCoord = {
      X: initBodyCoord.X + deltaCoord.X,
      Y: initBodyCoord.Y + deltaCoord.Y
   };

   background.style.backgroundPosition = `${bodyCoord.X}px ${bodyCoord.Y}px`;
   userInterface.style.inset = `${bodyCoord.Y}px auto auto ${bodyCoord.X}px`;
}

htmlDOM.addEventListener('mouseup', () => {
  window.removeEventListener('mousemove', handleCoordinates);
});

/**
 * Finds the HTML inset value of the parameter.
 * @param {String} direction 
 * @returns {Number}
 */

export function findWindowCoord(direction) {
   return Number(getComputedStyle(userInterface)[direction].replace(/[a-z]+/, ''))
}