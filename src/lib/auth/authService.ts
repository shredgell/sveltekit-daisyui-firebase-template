// src/lib/auth/authService.ts

import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { currentUser, authError, isLoading } from './authStore';
import { generateUserList } from '$lib/firestore/userItemsService';
import type { AuthUser, AuthError } from '$lib/types';

export { currentUser, authError, isLoading };

// Function to handle user login
export const login = async () => {
	isLoading.set(true);
	authError.set(null);
	try {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user as AuthUser;
		currentUser.set(user);

		if (typeof window !== 'undefined') {
			localStorage.setItem('authUser', JSON.stringify(user));
		}
	} catch (error: unknown) {
		console.error('Login Error:', error);
		const authErrorMsg: AuthError = {
			message: error instanceof Error ? error.message : 'An unknown error occurred during login.'
		};
		authError.set(authErrorMsg.message);
	} finally {
		isLoading.set(false);
	}
};

// Function to handle user logout
export const logout = async () => {
	isLoading.set(true);
	authError.set(null);
	try {
		await signOut(auth);
		currentUser.set(null);

		if (typeof window !== 'undefined') {
			localStorage.removeItem('authUser');
		}
	} catch (error: unknown) {
		console.error('Logout Error:', error);
		const authErrorMsg: AuthError = {
			message: error instanceof Error ? error.message : 'An unknown error occurred during logout.'
		};
		authError.set(authErrorMsg.message);
	} finally {
		isLoading.set(false);
	}
};

// Initialize authentication state and listen for changes
export const initAuth = () => {
	onAuthStateChanged(auth, (user) => {
		if (typeof window !== 'undefined') {
			currentUser.set(user as AuthUser);
			if (user) {
				localStorage.setItem('authUser', JSON.stringify(user));
				generateUserList(); // Fetch user list on login
			} else {
				localStorage.removeItem('authUser');
			}
		}
	});

	// Restore user from localStorage if available
	if (typeof window !== 'undefined') {
		const storedUser = localStorage.getItem('authUser');
		if (storedUser) {
			currentUser.set(JSON.parse(storedUser) as AuthUser);
			generateUserList();
		}
	}
};
