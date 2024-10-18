<template>
  <div class="mx-auto p-4 flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="transform -translate-y-4"
      :style="{ transition: 'opacity 0.5s, transform 0.5s' }"
    >
      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>

        <CardContent>
          <form @submit.prevent="handleLogin" class="space-y-4" @keyup.enter="handleLogin">
            <div class="grid w-full items-center gap-4">
              <!-- Email field -->
              <div class="flex mb-4 flex-col space-y-1.5">
                <Label for="email" class="block mb-2">Email</Label>
                <Input
                  type="email"
                  id="email"
                  v-model="email"
                  required
                  class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
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
                  class="w-full mb-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <Button class="bg-indigo-500 text-white hover:bg-indigo-600 w-full hover:cursor-pointer" type="submit" @click="handleLogin">Login</Button>
          </form>
        </CardContent>

        <CardFooter class="flex justify-between">
          <p class="text-sm text-muted-foreground">
            Don't have an account? <NuxtLink class="text-blue-500 hover:underline" to="/signup">Sign Up</NuxtLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  </div>
  <div class="fixed top-4 right-4 z-50">
    <TransitionGroup name="alert">
      <Alert v-if="showSuccessAlert" key="success" variant="default" class="mb-2 border-2 rounded-md p-2 border-green-500 text-green-500">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Login successful! Redirecting to dashboard...
        </AlertDescription>
      </Alert>
      <Alert v-if="showErrorAlert" key="error" variant="destructive" class="mb-2 border-2 rounded-md p-2 border-red-500 text-red-500">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {{ errorMessage }}
        </AlertDescription>
      </Alert>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">

const { login } = useAuth();

const email = ref('');
const password = ref('');
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    const userCredentials = await login(email.value, password.value);
    if (userCredentials) {
      showSuccessAlert.value = true;
      setTimeout(() => {
        navigateTo('/dashboard');
      }, 1500);
    }
  } catch (error) {
    console.error('Login Error:', error);
    showErrorAlert.value = true;
    errorMessage.value = 'Invalid email or password. Please try again.';
    email.value = '';
    password.value = '';
  } finally {
    setTimeout(() => {
      showSuccessAlert.value = false;
      showErrorAlert.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
