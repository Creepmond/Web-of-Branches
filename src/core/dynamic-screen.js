// TODO: (InProgress) Zoom support (mobile: two-finger, laptop: pad, pc: mouse wheel)
// TODO: Dynamic CSS stuff (Header's shadow is affected by movement) (optional)
//* Wow, this guy likes to trouble himself

const       htmlDOM = document.querySelector('html');
const    background = document.getElementById('background');
const userInterface = document.getElementById('user-interface');
// Set: .style.setProperty(name, value)
// Get: getComputedStyle(root).getPropertyValue(name)

let physics = { velocity: 0, angleAvg_rad: 0, direction: [] };
let mouseCoordHistory = [];

const VELOCITY_STRENGTH = 2;
const VELOCITY_THRESHOLD = 0.1;
const MAX_HISTORY_LENGTH = 5;

// Based on the initial translate of the #user-interface, you can see details on @/public/stylesheet/
// base.css at around line 64. I'm too lazy to just base it off from that, so it's better to just deal
// with this
const screenCoord = { X: -140, Y: -80 };

htmlDOM.addEventListener('pointerdown', handleStart);
htmlDOM.addEventListener('pointerup', handleEnd);
htmlDOM.addEventListener('touchend', handleEnd);

function handleStart(e) {
   if (e.pointerType === 'mouse') {
      player.hidden.isTouchscreen = false;
      
      htmlDOM.addEventListener('pointerup', handleEnd);
      htmlDOM.addEventListener('pointermove', handleMove);
   } else {
      player.hidden.isTouchscreen = true;

      htmlDOM.removeEventListener('pointerup', handleEnd);
      htmlDOM.addEventListener('touchmove', handleMove);
   }
}

function handleMove(e) {
   if (e.touches) e = e.touches[0];

   mouseCoordHistory.push({ X: e.clientX, Y: e.clientY, T: Date.now() });

   if (mouseCoordHistory.length < 2) return;
   if (mouseCoordHistory.length > MAX_HISTORY_LENGTH) mouseCoordHistory.shift();

   if (player.option.physics.isEnabled) calculatePhysics();

   calculateScreenMovement();
   plotScreenByCoord();
}

function handleEnd() {
   player.hidden.isTouchscreen
   ? htmlDOM.removeEventListener('touchmove', handleMove)
   : htmlDOM.removeEventListener('pointermove', handleMove);

   mouseCoordHistory = [];

   if (player.option.physics.isEnabled && player.option.physics.screenSlipperiness > 0)
      applyScreenSlipperiness()
}



function calculatePhysics() {
   // This actually is forEach but non-inclusive to the final length value, basically only done four
   // times a trigger when mouseCoordHistory is at full length (5). Probably could've done with
   // an if (...) { continue }, though I assume that wouldn't be as optimized
   for (let i = 1; i < mouseCoordHistory.length; i++) {
      const dx = mouseCoordHistory[i].X - mouseCoordHistory[i-1].X;
      const dy = mouseCoordHistory[i].Y - mouseCoordHistory[i-1].Y;
      const length = Math.hypot(dx, dy);

      if (length > 0)
         physics.direction.push({ X: dx / length, Y: dy / length });

      if (physics.direction.length > MAX_HISTORY_LENGTH)
         physics.direction.shift();
   }

   const avgDirection = { X: 0, Y: 0 };
   const dirLength = physics.direction.length;

   physics.direction.forEach(vector => {
      avgDirection.X += vector.X;
      avgDirection.Y += vector.Y;
   });

   if (dirLength > 0) {
      avgDirection.X / dirLength;
      avgDirection.Y / dirLength;
   }

   physics.angleAvg_rad = Math.atan2(avgDirection.Y, avgDirection.X);

   const init = mouseCoordHistory[0];
   const diff = mouseCoordHistory[mouseCoordHistory.length - 1];
   
   const delta = {
      X: diff.X - init.X,
      Y: diff.Y - init.Y,
      T: diff.T - init.T,
   };

   physics.velocity = ( Math.sqrt(delta.X ** 2 + delta.Y ** 2) ) / delta.T;
}

function calculateScreenMovement() {
   const L = mouseCoordHistory.length;
   const init = mouseCoordHistory[L - 2];
   const diff = mouseCoordHistory[L - 1];

   const delta = {
      X: diff.X - init.X,
      Y: diff.Y - init.Y,
   }

   screenCoord.X += delta.X;
   screenCoord.Y += delta.Y;
}

function applyScreenSlipperiness() {
   if (physics.velocity < VELOCITY_THRESHOLD) return;

   const angle = physics.angleAvg_rad;
   const velocity = physics.velocity * VELOCITY_STRENGTH;

   screenCoord.X += Math.cos(angle) * velocity;
   screenCoord.Y += Math.sin(angle) * velocity;

   plotScreenByCoord();

   physics.velocity *= player.option.physics.screenSlipperiness;

   //! For better PCs and such, this effect would last for longer, not sure if I care to apply it
   requestAnimationFrame(applyScreenSlipperiness)
}



function plotScreenByCoord() {
   const zoom = player.option.zoomLevel;
   const parallax = player.option.parallax;

   userInterface.style.translate =
      `${screenCoord.X * zoom}px ${screenCoord.Y * zoom}px`;

   background.style.backgroundPosition =
      `${screenCoord.X * parallax * zoom}px ${screenCoord.Y * parallax * zoom}px`;
}