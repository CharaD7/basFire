import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const app = initializeApp({
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain as string,
    projectId: config.public.firebaseProjectId as string,
    databaseURL: config.public.firebaseDatabaseURL as string,
    messagingSenderId: config.public.firebaseMessagingSenderId as string,
    appId: config.public.firebaseAppId as string,
    storageBucket: config.public.firebaseStorageBucket as string
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

