<template>
  <div class="container mx-auto p-4 flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="transform -translate-y-4"
      :style="{ transition: 'opacity 0.5s, transform 0.5s' }"
    >
      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>

        <CardContent>
          <form @submit.prevent="handleSignUp" class="space-y-4">
            <div class="grid w-full items-center gap-4">
              <!-- Email field -->
              <div clsas="flex mb-4 flex-col space-y-1.5">
                <Label for="email" class="block mb-2">Email</Label>
                <Input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="Enter your email"
                  required
                  class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <!-- Password field -->
              <div class="flex mb-4 flex-col space-y-1.5">
                <Label for="password" class="block mb-2">Password</Label>
                <Input
                  type="password"
                  id="password"
                  v-model="password"
                  placeholder="Enter your password"
                  required
                  class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <!-- Confirm Password field -->
              <div class="flex mb-4 flex-col space-y-1.5">
                <Label for="confirmPassword" class="block mb-2">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <Button
              type="submit"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              @click="handleSignup"
            >Sign Up</Button>
          </form>
        </CardContent>

        <CardFooter>
          <p class="text-sm text-muted-foreground">
            Already have an account? <NuxtLink class="text-blue-500 hover:underline" to="/login">Login</NuxtLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { signUp } = useAuth();
  const router = useRouter();

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const mounted = ref(false);

  const handleSignUp = async () => {
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match');
      return
    }
    try {
      const userCredentials = await signUp(email.value, password.value);
      console.log('userCredentials', userCredentials);
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };
</script>
