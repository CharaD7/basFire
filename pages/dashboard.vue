<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
    <p v-if="user" class="mb-4">Welcome to your dashboard, {{ displayName }}!</p>
    <p v-else>Loading user information...</p>
    <Button @click="handleLogout" class="bg-red-500 text-white hover:bg-red-600">Logout</Button>
  </div>
</template>

<script setup>
import { getAuth, updateProfile } from 'firebase/auth';

const { logout } = useAuth();
const user = ref(null);
const displayName = ref('');

const handleLogout = async () => {
  try {
    await logout();
    navigateTo('/login');
  } catch (error) {
    console.error('Logout Error:', error);
  }
};

const setDisplayName = (email) => {
  return email.replace(/@.*$/,"");
};

onMounted(async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    user.value = currentUser;
    if (!currentUser.displayName) {
      const newDisplayName = setDisplayName(currentUser.email);
      try {
        await updateProfile(currentUser, { displayName: newDisplayName });
        console.log('Display name updated successfully');
      } catch (error) {
        console.error('Error updating display name:', error);
      }
    }
    displayName.value = currentUser.displayName || setDisplayName(currentUser.email);
  } else {
    // If no user is logged in, redirect to login page
    navigateTo('/login');
  }

  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
      displayName.value = firebaseUser.displayName || setDisplayName(firebaseUser.email).replace(/@.*$/,"");
    }
  });
});
</script>
