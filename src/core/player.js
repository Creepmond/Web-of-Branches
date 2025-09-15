import { DC } from "../utility/constants.js";

window.player = {
   seed: DC.D1,
   studyBoughtBits: new Set(),
   lastHoveredStudy: [],
   option: {
      tickrate: 33,
      zoomLevel: 1,
   },
   hidden: {
      isTouchscreen: false,
   },
}