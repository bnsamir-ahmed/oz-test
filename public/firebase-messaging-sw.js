importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyDWRwtK_Lesa0KGV194YxYMkT97rb5wHeA",
    authDomain: "oz-auth-e88ee.firebaseapp.com",
    projectId: "oz-auth-e88ee",
    storageBucket: "oz-auth-e88ee.appspot.com",
    messagingSenderId: "433322692092",
    appId: "1:433322692092:web:5d043013f8555e700ab679",
    measurementId: "G-KYFJ3DJ9NQ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
 
});