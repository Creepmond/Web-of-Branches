import DC from "@/utility/constants.js";

// The player object is a bit too complicated to worry about types

const player: any = {
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
   hidden: {
      deviceScreenType: '',
      hasEverReachedBoundary: false,
   },
   last: {
      timePlayed: null,
      metapanelName: '',
      metapanelId: null,
      /*
      respeccedStudy: [],
      */
      headerTab: 'Resources',
      screenCoord: { X: -140, Y: -80 },
   },
   option: {
      parallax: 0.4,
      tickrate: 33,
      zoomLevel: 1,
      showNews: true,
   },
   physics: {
      isEnabled: false,
      screenSlipperiness: 0.98,
   },
};

export default player;
//// window.player = player;