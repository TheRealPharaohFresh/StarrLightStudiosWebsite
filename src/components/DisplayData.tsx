// useCurrentUser.tsx (custom hook)
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

interface CurrentUser {
  name: string;
  email: string;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const safeAuth = auth;
    const safeDb = db;

    if (!safeAuth || !safeDb) {
      setUser(null);
      return;
    }

    const unsubscribe = onAuthStateChanged(safeAuth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(safeDb, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as CurrentUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};


