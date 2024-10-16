<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- Email field -->
      <div>
        <label for="email" class="block mb-2">Email</label>
        <input type="email" id="email" v-model="email" required class="input input-bordered w-full" />
      </div>

      <!-- Password field -->
      <div>
        <label for="password" class="block mb-2">Password</label>
        <input type="password" id="password" v-model="password" required class="input input-bordered w-full" />
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p class="mt-4">
    </p>
    Don't have an account? <NuxtLink class="text-blue-500" to="/signup">Sign Up</NuxtLink>
  </div>
</template>

<script setup>
  const { login } = useAuth();
  const router = useRouter();

  const email = ref('');
  const password = ref('');
  
  
  const handleLogin = async () => {
    try {
      const userCredentials = await login(email.value, password.value);
      console.log('userCredentials', userCredentials);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };
</script>
