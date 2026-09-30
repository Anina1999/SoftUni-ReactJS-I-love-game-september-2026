import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';


export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Грешка при четене от ${collectionName}:`, error);
    throw error;
  }
};

export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id; 
  } catch (error) {
    console.error(`Грешка при добавяне в ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocument = async (path, data) => {
  try {
    await updateDoc(doc(db, path), data);
  } catch (error) {
    console.error(`Грешка при обновяване на ${path}:`, error);
    throw error;
  }
};

export const deleteDocument = async (path) => {
  try {
    await deleteDoc(doc(db, path));
  } catch (error) {
    console.error(`Грешка при изтриване на ${path}:`, error);
    throw error;
  }
};

export const getDocumentsOrdered = async (collectionName, field, direction = 'desc') => {
  const q = query(collection(db, collectionName), orderBy(field, direction));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data()}));
}

export const getDocument = async (path) => {
  try {
    const snapshot = await getDoc(doc(db, path));
    if (!snapshot.exists()) {
      throw new Error(`Документът ${path} не съществува`);
    }
    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error(`Грешка при четене на ${path}:`, error);
    throw error;
  }
};
