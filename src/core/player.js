import { DC } from "../utility/constants.js";

window.player = {
   seed: DC.D1,
   studyBoughtBits: new Set(),
   lastHoveredStudy: [],
   option: {
      parallax: 1,
      tickrate: 33,
      zoomLevel: 1,
      physics: {
         isEnabled: true,
         screenSlipperiness: 0.95,
      },
   },
   hidden: {
      isTouchscreen: false,
   },
}