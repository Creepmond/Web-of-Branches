// TODO: Include screen slipperiness (sliding) (optional for users), zoom support (mobile: two-finger, laptop: pad, pc: mouse wheel), dynamic CSS stuff (Header's shadow is affected by movement) (optional for users). Motion Parallax (Background)
//* Wow, this guy likes to trouble himself

const htmlDOM = document.querySelector('html');
const root = document.documentElement;
// Set: .style.setProperty(name, value)
// Get: getComputedStyle(root).getPropertyValue(name)

htmlDOM.addEventListener('pointerdown', (e) => {
   console.log(e.pointerType, e.type);

   htmlDOM.addEventListener('pointermove', logEvent)
});

htmlDOM.addEventListener('pointerup', (e) => {
   console.log(e.pointerType, e.type)

   htmlDOM.removeEventListener('pointermove', logEvent)
}) 

function logEvent(e) {
   console.log(e.pointerType, e.type)
}