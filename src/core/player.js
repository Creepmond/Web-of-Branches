import DC from "@/utility/constants.js";

window.player = {
   seed: DC.D1,
   studyBoughtBits: [], // Unfortunately, working with Sets in Vue is not supported, and with having to
   studyExposedBits: new Set(), // deal with update(), I'll have to let go of new Set() for
   // studyBoughtBits. However, perhaps studyExposedBits can be used like new Set()? I'm not sure, adding
   // the though here just in case though
   permaStudy: {
      respecIsUnlocked: false,
   },
   time: {
      played: DC.D0,
      bought5x1: DC.BIMAX,
   },
   last: {
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