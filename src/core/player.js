import { DC } from "../utility/constants.js";

window.player = {
   seed: DC.D1,
   studyBoughtBits: new Set(),
   lastHoveredStudy: [],
   option: {
      tickrate: 33,
      zoomLevel: 1,
      physics: {
         isEnabled: false,
         screenSlipperiness: 0,
      },
   },
   hidden: {
      isTouchscreen: false,
   },
}