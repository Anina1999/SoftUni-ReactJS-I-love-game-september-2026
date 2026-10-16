import { auth } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail } = userCredential.user;

    return { uid, email: userEmail };
  } catch (error) {
    console.error('Грешка при регистрация:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail } = userCredential.user;

    return { uid, email: userEmail };
  } catch (error) {
    console.error('Грешка при вход:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Грешка при изход:', error);
    throw error;
  }
};
