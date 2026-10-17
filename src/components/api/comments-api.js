import { serverTimestamp } from 'firebase/firestore';
import {
  addDocument,
  getDocumentsWhere,
} from '../../utils/firestoreService';

const COLLECTION = 'comments';

export const getAll = async (gameId, { signal } = {}) => {
  return getDocumentsWhere(COLLECTION, 'game_id', gameId, { signal });
};

export const create = async (commentData) => {
  return addDocument(COLLECTION, {
    ...commentData,
    created_at: serverTimestamp(),
  });
};
