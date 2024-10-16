export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  
  if (to.path === '/dashboard' && !auth.user) {
    return navigateTo('/login');
  }

  if ((to.path === '/login' || to.path === '/signup') && auth.user) {
    return navigateTo('/dashboard');
  }
});
