import { getDocumentsOrdered } from '../../utils/firestoreService';

const COLLECTION = 'games';

export const getAll = async ({ signal } = {}) => {
  return getDocumentsOrdered(COLLECTION, 'created_at', 'desc', undefined, { signal });
};