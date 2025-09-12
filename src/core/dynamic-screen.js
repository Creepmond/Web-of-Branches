// TODO: Include screen slipperiness (sliding) (optional for users), zoom support, dynamic CSS stuff (Header's shadow is affected by movement) (optional for users). Motion Parallax (Background)
//* Wow, this guy likes to trouble himself

const htmlDOM = document.querySelector('html');
const background = document.getElementById('background');
const userInterface = document.getElementById('ui-dynamic');

let initMouseCoord = { X: 0, Y: 0 };
let initBodyCoord = { X: 0, Y: 0 };

htmlDOM.addEventListener('touchstart', () => { player.hidden.isTouchscreen = true; })
htmlDOM.addEventListener('mousedown', () => { player.hidden.isTouchscreen = false; })

htmlDOM.addEventListener('touchstart', handleStart);
htmlDOM.addEventListener('touchend', handleEnd);

htmlDOM.addEventListener('mousedown', handleStart);
htmlDOM.addEventListener('mouseup', handleEnd);

function handleStart(event) {
   const figure = player.hidden.isTouchscreen
      ? event.touches.first()
      : event;

   initMouseCoord = { X: figure.pageX, Y: figure.pageY };
   initBodyCoord = { X: findWindowCoord('left'), Y: findWindowCoord('top') };

   player.hidden.isTouchscreen
   ? htmlDOM.addEventListener('touchmove', handleCoordinates)
   : htmlDOM.addEventListener('mousemove', handleCoordinates);
}

function handleCoordinates(event) {
   const figure = player.hidden.isTouchscreen
      ? event.touches.first()
      : event;

   const deltaCoord = {
      X: figure.pageX - initMouseCoord.X,
      Y: figure.pageY - initMouseCoord.Y
   }

   const bodyCoord = {
      X: initBodyCoord.X + deltaCoord.X,
      Y: initBodyCoord.Y + deltaCoord.Y
   };

   background.style.backgroundPosition = `${bodyCoord.X}px ${bodyCoord.Y}px`;
   userInterface.style.inset = `${bodyCoord.Y}px auto auto ${bodyCoord.X}px`;
}

function handleEnd() {
   player.hidden.isTouchscreen
   ? htmlDOM.removeEventListener('touchmove', handleCoordinates)
   : htmlDOM.removeEventListener('mousemove', handleCoordinates);
}

/**
 * Finds the HTML inset value of the parameter.
 * @param {String} direction 
 * @returns {Number}
 */

export function findWindowCoord(direction) {
   return Number(getComputedStyle(userInterface)[direction].replace(/[a-z]+/, ''))
}