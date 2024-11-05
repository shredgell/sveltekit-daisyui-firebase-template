// src/lib/firestore/submissionService.ts

import { db } from '../firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { currentUser } from '$lib/auth/authService';
import type { Submission, AuthUser } from '$lib/types';
import type { Writable } from 'svelte/store';

const submissionCollection = collection(db, 'submissions');

// Load all submissions and update the provided writable store
export const loadSubmissions = async (submissions: Writable<Submission[]>) => {
	try {
		const snapshot = await getDocs(submissionCollection);
		const submissionList = snapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<Submission, 'id'>)
		}));
		submissions.set(submissionList);
	} catch (error) {
		console.error('Error loading submissions:', error);
	}
};

// Add a new submission to the database
export const addSubmission = async (url: string) => {
	try {
		let user: AuthUser | null = null;

		// Retrieve current user and cast explicitly
		currentUser.subscribe((value) => {
			user = value as AuthUser | null;
		})();

		if (user) {
			const submission: Omit<Submission, 'id'> = {
				url,
				username: user.displayName ?? 'Anonymous',
				userImage: user.photoURL ?? '',
				timestamp: Timestamp.now(),
				userId: user.uid
			};
			await addDoc(submissionCollection, submission);
		} else {
			console.error('No authenticated user found.');
		}
	} catch (error) {
		console.error('Error adding submission:', error);
	}
};
