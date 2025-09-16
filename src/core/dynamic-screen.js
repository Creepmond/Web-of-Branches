// TODO: (InProgress) Include screen slipperiness (sliding) (optional for users)
// TODO: (InProgress) Zoom support (mobile: two-finger, laptop: pad, pc: mouse wheel)
// TODO: Dynamic CSS stuff (Header's shadow is affected by movement) (optional).
// TODO: (Might be difficult with the HTML structure) Motion Parallax (Background)
//* Wow, this guy likes to trouble himself

const htmlDOM = document.querySelector('html');
const root = document.documentElement;
// Set: .style.setProperty(name, value)
// Get: getComputedStyle(root).getPropertyValue(name)

let mouseCoord = { X: 0, Y: 0, T: 0 };

htmlDOM.addEventListener('pointerdown', handleStart);
htmlDOM.addEventListener('pointerup', handleEnd);
htmlDOM.addEventListener('pointercancel', handleEnd);

let arrayOfVelocities = [];

function handleStart(e) {
   arrayOfVelocities = [];

   mouseCoord = { X: e.clientX, Y: e.clientY, T: Date.now() };
   htmlDOM.addEventListener('pointermove', handleMove)

   player.hidden.isTouchScreen = e.pointerType === 'touch' ? true : false;
}

function handleMove(e) {
   const diffMouseCoord = { X: e.clientX, Y: e.clientY, T: Date.now() }
   const delta = {
      X: diffMouseCoord.X - mouseCoord.X,
      Y: diffMouseCoord.X - mouseCoord.Y,
      Interval: diffMouseCoord.T - mouseCoord.T,
   };
   const velocity =
      ( Math.sqrt(delta.X ** 2 + delta.Y ** 2) ) / delta.Interval;

   arrayOfVelocities.push(velocity)
}

function handleEnd(e) {
   htmlDOM.removeEventListener('pointermove', handleMove)

   console.log(arrayOfVelocities)
}





// document.querySelector('#user-interface').style.translate = `${-140 * player.option.zoomLevel}px ${-80 * player.option.zoomLevel}px`; im going to sleep