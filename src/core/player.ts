import DC from "@/utility/constants.js";

interface PlayerData {
   seed: Decimal
   // Unfortunately, working with Sets in Vue is not supported, and with having to deal with update(),
   // hence why studyBoughtBits is an array while studyExposedBits is a Set()
   studyBoughtBits: Array<any>
   studyExposedBits: Set<any>
   time: {
      played: Decimal
      bought5x1: Decimal 
   }
   hidden: {
      deviceScreenType: string
      hasEverReachedBoundary: boolean
   }
   last: {
      metapanelName: string
      metapanelId: any
      headerTab: string
      screenCoord: { X: number, Y: number }
   }
   option: {
      parallax: number
      tickrate: number
      zoomLevel: number
      showNews: boolean
   }
   physics: {
      isEnabled: boolean
      screenSlipperiness: number
   }
}

const player: PlayerData = {
   seed: DC.D1,
   studyBoughtBits: [], 
   studyExposedBits: new Set(),
   time: {
      played: DC.D0,
      bought5x1: DC.BIMAX,
   },
   hidden: {
      deviceScreenType: '',
      hasEverReachedBoundary: false,
   },
   last: {
      //// timePlayed: null,
      metapanelName: '',
      metapanelId: null,
      //// respeccedStudy: [],
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