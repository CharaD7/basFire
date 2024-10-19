export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $currentUser } = useNuxtApp();

  // log the state
  console.log('currentUser', $currentUser.value);
  
  // If user is logged in and is trying to access the login or signup page
  if ($currentUser.value && to.path.startsWith('/login') && to.path.startsWith('/signup')) {
    return navigateTo('/dashboard');
  }

  // If user is not logged in and trying to access login or signup page
  if (!$currentUser.value && (to.path.startsWith('/dashboard'))) {
    return navigateTo('/login');
  }
});
