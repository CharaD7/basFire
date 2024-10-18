<template>
  <div class=" mx-auto p-4 flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="transform -translate-y-4"
      :style="{ transition: 'opacity 0.5s, transform 0.5s' }"
    >
      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter your credentials to create an account.</CardDescription>
        </CardHeader>

        <CardContent>
          <form @submit.prevent="handleSignUp" class="space-y-4" @keyup.enter="handleSignUp">
            <div class="grid w-full items-center gap-4">
              <!-- Email field -->
              <div class="flex mb-4 flex-col space-y-1.5">
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
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 hover:cursor-pointer"
              @click="handleSignUp"
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
  <div class="fixed top-4 right-4 z-50">
    <TransitionGroup name="alert">
      <Alert v-if="showSuccessAlert" key="success" variant="default" class="mb-2 border-2 rounded-md p-2 border-green-500 text-green-500">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Account created successfully! Redirecting to dashboard...
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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showSuccessAlert = ref(false)
const showErrorAlert = ref(false)
const errorMessage = ref('')

const handleSignUp = async () => {
  if (password.value !== confirmPassword.value) {
    showErrorAlert.value = true
    errorMessage.value = 'Passwords do not match'
    return
  }

  try {
    const auth = getAuth()
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    showSuccessAlert.value = true
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 2000)
  } catch (error: any) {
    showErrorAlert.value = true
    errorMessage.value = getErrorMessage(error)
  }
}

const getErrorMessage = (error: any): string => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already in use'
    case 'auth/invalid-email':
      return 'Invalid email address'
    case 'auth/weak-password':
      return 'Password is too weak'
    default:
      return 'An error occurred during sign up'
  }
}
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
