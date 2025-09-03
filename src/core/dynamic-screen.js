import { findWindowCoord, userInterface } from './coordinate.js'
// TODO: Include screen slipperiness (sliding), mobile support, dynamic CSS stuff (Header's shadow is affected by movement)

const htmlDOM = document.querySelector('html');
const bodyDOM = document.querySelector('body');

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

   bodyDOM.style.backgroundPosition = `${bodyCoord.X}px ${bodyCoord.Y}px`;
   userInterface.style.inset = `${bodyCoord.Y}px auto auto ${bodyCoord.X}px`;
}

htmlDOM.addEventListener('mouseup', () => {
  window.removeEventListener('mousemove', handleCoordinates);
});