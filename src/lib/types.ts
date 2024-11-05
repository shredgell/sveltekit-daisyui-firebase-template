// src/lib/types.ts

import type { User as FirebaseUser } from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';

export type Post = {
	id: string;
	title: string;
	description: string;
	url: string;
	userId: string;
};

export type UserItem = {
	id: string;
	text: string;
};

export type AuthUser = FirebaseUser & {
	displayName?: string | null; // Updated to allow null
	email?: string;
	uid: string;
	photoURL?: string | null; // Allow null here too for compatibility
};

export interface Submission {
	id: string;
	url: string;
	username: string;
	userImage: string;
	timestamp: Timestamp;
	userId: string;
}

export type AuthError = {
	message: string;
	code?: string;
};

export type Pagination = {
	currentPage: number;
	totalPages: number;
	pageSize: number;
};
