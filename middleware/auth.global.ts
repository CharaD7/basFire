import { getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = await getAuth();
  const { $currentUser } = await useNuxtApp();

  // log the state
  console.log('currentUser', $currentUser.value);
  console.log('auth', auth.currentUser?.displayName);

  // If user is logged in and is trying to access the login or signup page
  if ($currentUser.value && (to.path.startsWith('/login') || to.path.startsWith('/signup'))) {
    return navigateTo('/dashboard');
  }

  // If user is not logged in and trying to access login or signup page
  if (!$currentUser.value && to.path.startsWith('/dashboard')) {
    return navigateTo('/login');
  }
});
