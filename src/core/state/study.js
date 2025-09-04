class StudyState {
   constructor(config) {
      this.config = config;
   }

   get coordinates() {
      return this.config.map(study => study.coordinate);
   }

   get coordinatesLevel() {
      return this.config.map(study => study.coordinate[0]);
   }
}

const Study = new StudyState(Data.regularStudy);
export default Study;