// src/lib/stores/authStore.ts

import { writable } from 'svelte/store';
import { auth, googleProvider } from '$lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

// Initialize writable stores
export const user = writable<User | null>(null);
export const authError = writable<string | null>(null);
export const isLoading = writable<boolean>(false);

// Authentication functions
export const login = async () => {
	isLoading.set(true);
	authError.set(null);
	try {
		const result = await signInWithPopup(auth, googleProvider);
		user.set(result.user);
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
		user.set(null);
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

// Listen for authentication state changes
onAuthStateChanged(auth, (currentUser) => {
	user.set(currentUser);
});
