// src/lib/auth.ts

import { writable } from 'svelte/store';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

// Define the type for the currentUser store
export const currentUser = writable<User | null>(null);

// Listen for authentication state changes
onAuthStateChanged(auth, (user: User | null) => {
	currentUser.set(user);
});
