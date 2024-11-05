// src/lib/firestore/userItemsService.ts

import type { UserItem } from '../types';
import { writable } from 'svelte/store';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

// Writable store for user items
export const userList = writable<UserItem[]>([]);

// Reference to the 'userItems' collection
const userCollection = collection(db, 'userItems');

// Fetch and populate the user list
export const generateUserList = async () => {
	try {
		const snapshot = await getDocs(userCollection);
		userList.set(
			snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as { id: string; text: string })
		);
	} catch (error) {
		console.error('Error fetching user list:', error);
	}
};

// Add a new item
export const addItem = async (text: string) => {
	try {
		const docRef = await addDoc(userCollection, { text });
		userList.update((items) => [...items, { id: docRef.id, text }]);
	} catch (error) {
		console.error('Error adding item:', error);
	}
};

// Edit an existing item
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

// Delete an item
export const deleteItem = async (id: string) => {
	try {
		const itemDoc = doc(db, 'userItems', id);
		await deleteDoc(itemDoc);
		userList.update((items) => items.filter((item) => item.id !== id));
	} catch (error) {
		console.error('Error deleting item:', error);
	}
};
