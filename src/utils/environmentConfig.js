const ENV = require("dotenv").config().parsed;
/*
  Use an environment variable set in package.json scripts to determine
  the applications runtime environment. Add more switch cases as
  need for additional environments. Remember, Firebase recomends supporting
  separate Firebase project for different application environments: httpsq://firebase.google.com/docs/projects/multiprojects#support_different_environments
*/

module.exports = (QENV) => {
  if (!["DEV", "STAGE", "PROD"].includes(QENV)) {
    throw Error("Unknonw or not supplied environment variable");
  }
  console.log('logorojectid_log', ENV[`${QENV}_PROJECTID`])
  return {
    /*FIREBASE_CONFIG: {
      apiKey: ENV[`${QENV}_APIKEY`],
      authDomain: ENV[`${QENV}_AUTHDOMAIN`],
      projectId: ENV[`${QENV}_PROJECTID`],
      storageBucket: ENV[`${QENV}_STORAGEBUCKET`],
      messagingSenderId: ENV[`${QENV}_MESSAGINGSENDERID`],
      appId: ENV[`${QENV}_APPID`],
    },*/
    FIREBASE_CONFIG: {
      apiKey: `process.env.${QENV}_APIKEY`,
      authDomain: `process.env.${QENV}_AUTHDOMAIN`,
      projectId: `process.env.${QENV}_PROJECTID`,
      storageBucket: `process.env.${QENV}_STORAGEBUCKET`,
      messagingSenderId: `process.env.${QENV}_MESSAGINGSENDERID`,
      appId: `process.env.${QENV}_APPID`,
    },
  };
};
