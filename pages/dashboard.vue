<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
    <p v-if="user" class="mb-4">Welcome to your dashboard, {{ user?.email }}!</p>
    <p v-else>Loading user information...</p>
    <Button @click="handleLogout" class="bg-red-500 text-white hover:bg-red-600">Logout</Button>
  </div>
</template>

<script setup>
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };
</script>
