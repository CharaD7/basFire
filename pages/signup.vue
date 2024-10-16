<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Sign Up</h1>
    <form @submit.prevent="handleSignUp" class="space-y-4">
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

      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
    <p class="mt-4">
      Already have an account? <NuxtLink class="text-blue-500" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup>
  const { signUp } = useAuth();
  const router = useRouter();

  const email = ref('');
  const password = ref('');

  const handleSignUp = async () => {
    try {
      const userCredentials = await signUp(email.value, password.value);
      console.log('userCredentials', userCredentials);
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };
</script>
