import { DC } from "@/utility/constants.js";

window.player = {
   seed: DC.D1,
   studyBoughtBits: new Set(),
   studyExposedBits: new Set(),
   permaStudy: {
      respecIsUnlocked: false,
   },
   option: {
      parallax: 0.4,
      tickrate: 33,
      zoomLevel: 1,
   },
   physics: {
      isEnabled: false,
      screenSlipperiness: 0.98,
   },
   last: {
      hoveredStudy: [],
      headerTab: 'Resources',
      screenCoord: { X: -140, Y: -80 },
   },
   hidden: {
      deviceScreenType: '',
      hasEverReachedBoundary: false,
   },
};