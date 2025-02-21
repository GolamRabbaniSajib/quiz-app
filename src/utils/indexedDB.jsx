import { openDB } from "idb";

const DB_NAME = "quizAppDB";
const STORE_NAME = "quizScores";

// Initialize the database
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

// Save quiz score to IndexedDB
export const saveScore = async (score, totalQuestions, timestamp) => {
  const db = await initDB();
  await db.add(STORE_NAME, { score, totalQuestions, timestamp });
};

// Get all saved quiz scores from IndexedDB
export const getScores = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};
