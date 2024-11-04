// src/lib/auth.ts

import { writable } from 'svelte/store';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import type { User } from 'firebase/auth';

// Initialize writable stores
export const currentUser = writable<User | null>(null);
export const authError = writable<string | null>(null);
export const isLoading = writable<boolean>(false);
export const userList = writable<{ id: string; text: string }[]>([]);

const userCollection = collection(db, 'userItems');

// Authentication functions
export const login = async () => {
	isLoading.set(true);
	authError.set(null);
	try {
		const result = await signInWithPopup(auth, googleProvider);
		currentUser.set(result.user);

		// Save to localStorage if in browser environment
		if (typeof window !== 'undefined') {
			localStorage.setItem('authUser', JSON.stringify(result.user));
		}
	} catch (error: unknown) {
		console.error('Login Error:', error);
		if (error instanceof Error) {
			authError.set(error.message);
		} else {
			authError.set('An unknown error occurred during login.');
		}
	} finally {
		isLoading.set(false);
	}
};

export const logout = async () => {
	isLoading.set(true);
	authError.set(null);
	try {
		await signOut(auth);
		currentUser.set(null);

		// Remove from localStorage if in browser environment
		if (typeof window !== 'undefined') {
			localStorage.removeItem('authUser');
		}
	} catch (error: unknown) {
		console.error('Logout Error:', error);
		if (error instanceof Error) {
			authError.set(error.message);
		} else {
			authError.set('An unknown error occurred during logout.');
		}
	} finally {
		isLoading.set(false);
	}
};

// CRUD functions for user list using Firestore
generateUserList();

async function generateUserList() {
	try {
		const snapshot = await getDocs(userCollection);
		userList.set(
			snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as { id: string; text: string })
		);
	} catch (error) {
		console.error('Error fetching user list:', error);
	}
}

export const addItem = async (text: string) => {
	try {
		const docRef = await addDoc(userCollection, { text });
		userList.update((items) => [...items, { id: docRef.id, text }]);
	} catch (error) {
		console.error('Error adding item:', error);
	}
};

export const editItem = async (id: string, newText: string) => {
	try {
		const itemDoc = doc(db, 'userItems', id);
		await updateDoc(itemDoc, { text: newText });
		userList.update((items) =>
			items.map((item) => (item.id === id ? { ...item, text: newText } : item))
		);
	} catch (error) {
		console.error('Error editing item:', error);
	}
};

export const deleteItem = async (id: string) => {
	try {
		const itemDoc = doc(db, 'userItems', id);
		await deleteDoc(itemDoc);
		userList.update((items) => items.filter((item) => item.id !== id));
	} catch (error) {
		console.error('Error deleting item:', error);
	}
};

// Listen for authentication state changes
onAuthStateChanged(auth, (user: User | null) => {
	if (typeof window !== 'undefined') {
		currentUser.set(user);
		if (user) {
			localStorage.setItem('authUser', JSON.stringify(user));
			generateUserList(); // Fetch user list on login
		} else {
			localStorage.removeItem('authUser');
			userList.set([]); // Clear user list on logout
		}
	}
});

// Restore currentUser from localStorage if available (browser-only)
if (typeof window !== 'undefined') {
	const storedUser = localStorage.getItem('authUser');
	if (storedUser) {
		currentUser.set(JSON.parse(storedUser));
		generateUserList();
	}
}
