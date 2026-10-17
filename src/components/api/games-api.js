import { serverTimestamp } from 'firebase/firestore';
import {
  addDocument,
  getDocumentsOrdered,
} from '../../utils/firestoreService';

const COLLECTION = 'games';

export const getAll = async ({ signal } = {}) => {
  return getDocumentsOrdered(COLLECTION, 'created_at', 'desc', undefined, { signal });
};

export const create = async (gameData) => {
  return addDocument(COLLECTION, {
    ...gameData,
    created_at: serverTimestamp(),
  });
};