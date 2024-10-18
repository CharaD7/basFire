import { type User, getAuth } from 'firebase/auth';
import { type Ref } from 'vue';

declare module '#app' {
  interface NuxtApp {
    $auth: ReturnType<typeof getAuth>;
    $currentUser: Ref<User | null>;
  }
}
