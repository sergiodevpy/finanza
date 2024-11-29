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
  //entorno desarrollo toma del local
  if (QENV == "DEV") {
    return {
      FIREBASE_CONFIG: {
        apiKey: ENV[`${QENV}_APIKEY`],
        authDomain: ENV[`${QENV}_AUTHDOMAIN`],
        projectId: ENV[`${QENV}_PROJECTID`],
        storageBucket: ENV[`${QENV}_STORAGEBUCKET`],
        messagingSenderId: ENV[`${QENV}_MESSAGINGSENDERID`],
        appId: ENV[`${QENV}_APPID`],
      },
    };
  }
  //entorno producción que tome del sitio
  if (QENV == "PROD") {
    return {
      FIREBASE_CONFIG: {
        apiKey: process.env.PROD_APIKEY,
        authDomain: process.env.PROD_AUTHDOMAIN,
        projectId: process.env.PROD_PROJECTID,
        storageBucket: process.env.PROD_STORAGEBUCKET,
        messagingSenderId: process.env.PROD_MESSAGINGSENDERID,
        appId: process.env.PROD_APPID,
      },
    };
  }
};
