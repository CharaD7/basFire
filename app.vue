<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>

const router = useRouter();
const { $currentUser } = useNuxtApp();

onMounted(() => {
  if ($currentUser.value) {
    router.push('/dashboard');
  } else {
    router.push('/login');
  }
});
</script>
