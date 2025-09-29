import { DC } from "@/utility/constants.js";

window.player = {
   seed: DC.D1,
   studyBoughtBits: new Set(),
   studyExposedBits: new Set(),
   option: {
      parallax: 0.4,
      tickrate: 33,
      zoomLevel: 1,
   },
   physics: {
      isEnabled: true,
      screenSlipperiness: 0.98,
   },
   last: {
      hoveredStudy: [],
      headerTab: 'Resources',
      screenCoord: null,
   },
   hidden: {
      isTouchscreen: false,
      hasEverReachedBoundary: false,
      studyAll_id: [],
      obfuscationUnicodePool: [],
   },
};