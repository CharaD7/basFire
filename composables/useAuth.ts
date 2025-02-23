import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { User, UserCredential } from "firebase/auth";

export const useAuth = () => {
  const { $auth } = useNuxtApp()

  const signUp = async (email: string, password: string): Promise<{ user: User; uid: string }> => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword($auth, email, password);
      return {
        user: userCredential.user,
        uid: userCredential.user.uid
      };
    } catch (error) {
      console.error("Error Signing Up: ", error);
      throw error;
    }
  };

  const login = async (email: string, password: string ): Promise<{ user: User; uid: string }> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword($auth, email, password);
      return {
        user: userCredential.user,
        uid: userCredential.user.uid
      };
    } catch (error) {
      console.error("Error Logging In: ", error);
      throw error;
    }
  };

  return {
    signUp,
    login,
  };
}
