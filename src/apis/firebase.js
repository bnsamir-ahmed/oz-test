// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDWRwtK_Lesa0KGV194YxYMkT97rb5wHeA",
  authDomain: "oz-auth-e88ee.firebaseapp.com",
  projectId: "oz-auth-e88ee",
  storageBucket: "oz-auth-e88ee.appspot.com",
  messagingSenderId: "433322692092",
  appId: "1:433322692092:web:5d043013f8555e700ab679",
  measurementId: "G-KYFJ3DJ9NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging = getMessaging();

export const requestForToken = async () => {
    return getToken(messaging, { vapidKey: process.env.VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          return currentToken;
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
    .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});