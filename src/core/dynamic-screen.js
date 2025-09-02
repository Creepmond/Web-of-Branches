// TODO: Include screen slipperiness (sliding), mobile support, dynamic CSS stuff (Header's shadow is affected by movement)

// The reason isBeingDragged is used, is for tracking whether what's being tracked is solely the htmlDOM,
// rather than another html tag like <div>, <span>, <button>, etc.
let isBeingDragged = false;

const htmlDOM = document.querySelector('html');
const bodyDOM = document.querySelector('body');
const userInterface = document.getElementById('ui-dynamic');

let initMouseCoord = { X: 0, Y: 0 };
let initBodyCoord = { X: 0, Y: 0 };

htmlDOM.addEventListener('mousedown', (event) => {
   if (event.target !== htmlDOM) return;
   isBeingDragged = true;

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
  if (!isBeingDragged) return;

  window.removeEventListener('mousemove', handleCoordinates);

  isBeingDragged = false;
});

function findWindowCoord(direction) {
   return Number(getComputedStyle(userInterface)[direction].replace(/[a-z]+/, ''))
}