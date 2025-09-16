// TODO: (InProgress) Include screen slipperiness (sliding) (optional for users)
// TODO: (InProgress) Zoom support (mobile: two-finger, laptop: pad, pc: mouse wheel)
// TODO: Dynamic CSS stuff (Header's shadow is affected by movement) (optional).
// TODO: (Might be difficult with the HTML structure) Motion Parallax (Background)
//* Wow, this guy likes to trouble himself

const htmlDOM = document.querySelector('html');
const root = document.documentElement;
// Set: .style.setProperty(name, value)
// Get: getComputedStyle(root).getPropertyValue(name)

let physics = { velocity: 0, angle: 0 };
let mouseCoordHistory = [];

const coordHistory = [];

htmlDOM.addEventListener('pointerdown', handleStart);
htmlDOM.addEventListener('pointerup', handleEnd);
htmlDOM.addEventListener('pointercancel', handleEnd);

function handleStart(e) {
   mouseCoordHistory.push(
      { X: e.clientX, Y: e.clientY, T: Date.now() }
   );

   htmlDOM.addEventListener('pointermove', handleMove)

   player.hidden.isTouchScreen = e.pointerType === 'touch' ? true : false;
}

function handleMove(e) {
   mouseCoordHistory.push(
      { X: e.clientX, Y: e.clientY, T: Date.now() }
   );

   if (mouseCoordHistory.length > 10) mouseCoordHistory.shift();
   if (mouseCoordHistory.length < 2) return;

   let initMouseCoord = mouseCoordHistory[0];
   let diffMouseCoord = mouseCoordHistory[mouseCoordHistory.length - 1];

   const delta = {
      X: diffMouseCoord.X - initMouseCoord.X,
      Y: diffMouseCoord.X - initMouseCoord.Y,
      Interval: diffMouseCoord.T - initMouseCoord.T,
   };

   physics.angle = Math.atan2(delta.Y, delta.X) * 180 / Math.PI;

   //! Bit of warning here as we use the fifth and first coord here, though Interval is applied
   //  so I'm not as sure if it still remains accurate
   physics.velocity =
      ( Math.sqrt(delta.X ** 2 + delta.Y ** 2) ) / delta.Interval;

   console.log(physics, mouseCoordHistory);
}

function handleEnd(e) {
   htmlDOM.removeEventListener('pointermove', handleMove)
   
   mouseCoordHistory = [];
}





// document.querySelector('#user-interface').style.translate = `${-140 * player.option.zoomLevel}px ${-80 * player.option.zoomLevel}px`; im going to sleep