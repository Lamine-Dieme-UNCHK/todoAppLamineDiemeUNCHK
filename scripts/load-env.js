var fs = require("fs");
var dotenv = require("dotenv");

// Charger les variables d'environnement depuis le fichier `.env`
dotenv.config();

// Générer un fichier Angular d'environnement
var environmentFileContent = `
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
  },
};
`;

// Écrire dans le fichier Angular d'environnement
fs.writeFileSync("./src/environments/environment.ts", environmentFileContent);
console.log("Environment variables generated successfully.");
