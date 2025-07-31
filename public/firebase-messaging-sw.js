// Firebase Cloud Messaging Service Worker
// This file is required for Firebase Cloud Messaging to work

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCyQF3zw-JCSpcEX7Sp3qQueaNu3svoxM8",
  authDomain: "edchurch-6ea6c.firebaseapp.com",
  projectId: "edchurch-6ea6c",
  storageBucket: "edchurch-6ea6c.appspot.com",
  messagingSenderId: "363746448963",
  appId: "1:363746448963:web:2bc342fe13ee3146e426f6",
  measurementId: "G-REMHLHLQ2L"
});

const messaging = firebase.messaging();

// Optional: Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}); 