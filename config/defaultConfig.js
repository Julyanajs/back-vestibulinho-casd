const currentYear = new Date().getFullYear();
const startingCandidateNumberCASDVEST = (currentYear+1)%100 * 10000;
const startingCandidateNumberCASDINHO = (currentYear+1)%100 * 10000 + 10000;

module.exports = {
   "dbConfig": {
      "url": "mongodb://localhost:27017"
   },
   "port": 5000,
   "currentYear": currentYear,
   "startingCandidateNumberCASDVEST": startingCandidateNumberCASDVEST,
   "startingCandidateNumberCASDINHO": startingCandidateNumberCASDINHO
}