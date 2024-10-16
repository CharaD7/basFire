<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
    <p class="mb-4">Welcome to your dashboard, {{ user?.email }}!</p>
    <button @click="handleLogout" class="btn btn-secondary">Logout</button>
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
