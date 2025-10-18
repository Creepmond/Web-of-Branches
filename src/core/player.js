import DC from "@/utility/constants.js";

const player = {
   seed: DC.D1,
   // Unfortunately, working with Sets in Vue is not supported, and with having to deal with update(),
   // hence why studyBoughtBits is an array while studyExposedBits is a Set()
   studyBoughtBits: [], 
   studyExposedBits: new Set(),
   // I don't think I need this
   time: {
      played: DC.D0,
      bought5x1: DC.BIMAX,
   },
   last: {
      timePlayed: null,
      metapanelName: '',
      metapanelId: null,
      respeccedStudy: [],
      headerTab: 'Resources',
      screenCoord: { X: -140, Y: -80 },
   },
   option: {
      parallax: 0.4,
      tickrate: 33,
      zoomLevel: 1,
      showGlobalStat: true,
   },
   physics: {
      isEnabled: false,
      screenSlipperiness: 0.98,
   },
   hidden: {
      deviceScreenType: '',
      hasEverReachedBoundary: false,
   },
};

export default player;
//// window.player = player;