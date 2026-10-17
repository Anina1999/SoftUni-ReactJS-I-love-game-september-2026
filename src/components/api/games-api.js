import { serverTimestamp } from 'firebase/firestore';
import {
  addDocument,
  getDocument,
  getDocumentsOrdered,
  updateDocument,
} from '../../utils/firestoreService';

const COLLECTION = 'games';

export const getAll = async ({ signal } = {}) => {
  return getDocumentsOrdered(COLLECTION, 'created_at', 'desc', undefined, { signal });
};

export const getOne = async (gameId, { signal } = {}) => {
  return getDocument(`${COLLECTION}/${gameId}`, { signal });
};

export const create = async (gameData) => {
  return addDocument(COLLECTION, {
    ...gameData,
    created_at: serverTimestamp(),
  });
};

export const edit = async (gameId, gameData) => {
  return updateDocument(`${COLLECTION}/${gameId}`, gameData);
};