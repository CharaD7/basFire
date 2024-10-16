import {
  getAuth,
  createUserWithEmailAndPassword ,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { ref, onMounted } from "vue";

export const useAuth = () => {
  const user = ref(null);
  const auth = getAuth();

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
    } catch (error) {
      console.error("Error Signing Up: ", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
    } catch (error) {
      console.error("Error Logging In: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (error) {
      console.error("Error Logging Out: ", error);
      throw error;
    }
  };

  onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
    });
  });

  return {
    user,
    signUp,
    login,
    logout
  };
}
