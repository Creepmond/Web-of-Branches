// TODO: Include screen slipperiness (sliding) (optional for users), zoom support (mobile: two-finger, laptop: pad, pc: mouse wheel), dynamic CSS stuff (Header's shadow is affected by movement) (optional for users). Motion Parallax (Background)
//* Wow, this guy likes to trouble himself

const htmlDOM = document.querySelector('html');

htmlDOM.addEventListener('pointerdown', (e) => {
   console.log({
      layer: [e.layerX, e.layerY],
      page: [e.pageX, e.pageY],
      client: [e.clientX, e.clientY],
      offset: [e.offsetX, e.offsetY],
      screen: [e.screenX, e.screenY],
      ifYouReallyWantIt: e,
   });
});