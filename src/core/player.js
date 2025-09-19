import { DC } from "../utility/constants.js";

window.player = {
   seed: DC.D1,
   studyBoughtBits: new Set(),
   option: {
      parallax: 0.8,
      tickrate: 33,
      zoomLevel: 1,
   },
   physics: {
      isEnabled: false,
      screenSlipperiness: 0.98,
   },
   last: {
      hoveredStudy: [],
      screenCoord: null,
   },
   hidden: {
      isTouchscreen: false,
   },
}