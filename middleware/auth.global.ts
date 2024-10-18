export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $currentUser } = useNuxtApp();

  // log the state
  console.log('currentUser', $currentUser.value);
  
  // Restrict access to page if user is not logged in and is trying to access a page
  if ($currentUser.value && to.path.startsWith('/login') && to.path.startsWith('/signup')) {
    return navigateTo('/dashboard');
  }

  // If user is logged in and trying to access login or signup page
  if (!$currentUser.value && (to.path.startsWith('/dashboard'))) {
    return navigateTo('/login');
  }
});
