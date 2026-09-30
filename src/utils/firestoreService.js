import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';


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

export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`Грешка при обновяване в ${collectionName} с ID ${docId}:`, error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Грешка при изтриване от ${collectionName} с ID ${docId}:`, error);
    throw error;
  }
};
