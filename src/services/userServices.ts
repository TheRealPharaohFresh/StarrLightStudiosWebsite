import { db } from '../config/firebaseConfig';
import { doc, setDoc, deleteDoc} from 'firebase/firestore';
import {deleteUser as firebaseDeleteUser} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';


export const createUser = async (userId: string, userData: { name: string; email: string; age?: number }) => {
    if (!userId) throw new Error("User ID is required");

    if (!db) throw new Error("Firebase is not configured (Firestore unavailable)");

   
    if (userData.age !== undefined && typeof userData.age !== 'number') {
        throw new Error("Age must be a valid number");
    }

    try {
        await setDoc(doc(db, 'users', userId), userData);
        console.log('✅ User created successfully:', userData);
    } catch (error) {
        console.error('❌ Error creating user:', error);
        throw error; 
    }
};

export const deleteUser = async (userId: string) => {
    if (!userId) throw new Error("User ID is required");

    if (!db || !auth) throw new Error("Firebase is not configured (Auth/Firestore unavailable)");

    try {
        // Delete user from Firestore
        await deleteDoc(doc(db, 'users', userId));

        // Delete user from Firebase Authentication
        const user = auth.currentUser;
        if (user && user.uid === userId) {
            await firebaseDeleteUser(user);
        }

        console.log('✅ User deleted successfully');
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        throw error;
    }
};