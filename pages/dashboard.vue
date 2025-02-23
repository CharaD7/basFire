<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
    <p v-if="user" class="mb-4">Welcome to your dashboard, {{ displayName }}!</p>
    <p v-else>Loading user information...</p>
    <Button @click="handleLogout" class="bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer">Logout</Button>
  </div>
</template>

<script setup>
import { getAuth, updateProfile, onAuthStateChanged } from 'firebase/auth';

const { $currentUser } = useNuxtApp();
const user = ref($currentUser.value);
const displayName = ref('');
const router = useRouter();

const handleLogout = async () => {
  const { logout } = useAuth();
  try {
    await logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout Error:', error);
  }
};

const setDisplayName = (email) => {
  return email.replace(/@.*$/,"");
};

onMounted(() => {

  const auth = getAuth();

  if (user.value) {
    displayName.value = user.value.displayName || setDisplayName(user.value.email);
  }

  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
      if (!firebaseUser.displayName) {
        const newDisplayName = setDisplayName(firebaseUser.email);
        try {
          await updateProfile(firebaseUser, { displayName: newDisplayName });
          console.log('Display name updated successfully');
        } catch (error) {
          console.error('Error updating display name:', error);
        }
      }
      displayName.value = firebaseUser.displayName || setDisplayName(firebaseUser.email);
    }
  });
});

</script>
