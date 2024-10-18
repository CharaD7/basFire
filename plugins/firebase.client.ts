import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const app = initializeApp({
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    databaseURL: config.public.firebaseDatabaeURL,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    storageBucket: config.public.firebaseStorageBucket
  });
  const auth = getAuth(app);
  const currentUser = ref<User | null>(null);

  nuxtApp.provide("firebaseApp", app);
  nuxtApp.provide("auth", auth);
  nuxtApp.provide("currentUser", currentUser);

  // Listen to auth state changes
  onAuthStateChanged(auth, (user: User | null) => {
    currentUser.value = user;
  });
});

