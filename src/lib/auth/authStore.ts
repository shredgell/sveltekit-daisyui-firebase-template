// src/lib/auth/authStore.ts

import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

// Writable stores for authentication state
export const currentUser = writable<User | null>(null);
export const authError = writable<string | null>(null);
export const isLoading = writable<boolean>(false);
