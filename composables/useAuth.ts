import {
  getAuth,
  createUserWithEmailAndPassword ,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { User } from "firebase/auth";

export const useAuth = () => {
  const { $auth, $currentUser } = useNuxtApp()

  const signUp = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword($auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error Signing Up: ", error);
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword($auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error Logging In: ", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut($auth);
    } catch (error) {
      console.error("Error Logging Out: ", error);
      throw error;
    }
  };

  return {
    signUp,
    login,
    logout
  };
}
