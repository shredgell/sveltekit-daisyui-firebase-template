// src/lib/auth/authService.ts

import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { currentUser, authError, isLoading } from './auth/authStore';

// Function to handle user login
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

// Function to handle user logout
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

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
	if (typeof window !== 'undefined') {
		currentUser.set(user);
		if (user) {
			localStorage.setItem('authUser', JSON.stringify(user));
		} else {
			localStorage.removeItem('authUser');
		}
	}
});

// Restore currentUser from localStorage if available (browser-only)
if (typeof window !== 'undefined') {
	const storedUser = localStorage.getItem('authUser');
	if (storedUser) {
		currentUser.set(JSON.parse(storedUser));
	}
}
