// src/lib/firestore/forumService.ts

import { writable } from 'svelte/store';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import type { Post } from '../types'; // Import the Post type

// Store to keep the list of forum posts
export const forumPosts = writable<Post[]>([]);
const forumCollection = collection(db, 'forumPosts');

// Fetch all forum posts
export const loadForumPosts = async () => {
	try {
		const snapshot = await getDocs(forumCollection);
		forumPosts.set(
			snapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					title: data.title,
					description: data.description,
					url: data.url,
					userId: data.userId // Include userId in the fetched posts
				} as Post;
			})
		);
	} catch (error) {
		console.error('Error fetching forum posts:', error);
	}
};

// Edit an existing forum post
export const editForumPost = async (
	id: string,
	newTitle: string,
	newDescription: string,
	newUrl: string
) => {
	try {
		const postDoc = doc(db, 'forumPosts', id);
		await updateDoc(postDoc, { title: newTitle, description: newDescription, url: newUrl });
		forumPosts.update((posts) =>
			posts.map((post) =>
				post.id === id
					? { ...post, title: newTitle, description: newDescription, url: newUrl }
					: post
			)
		);
	} catch (error) {
		console.error('Error editing forum post:', error);
	}
};

// Add a new forum post with userId
export const addForumPost = async (
	title: string,
	description: string,
	url: string,
	userId: string
) => {
	try {
		const docRef = await addDoc(forumCollection, { title, description, url, userId });
		forumPosts.update((posts) => [...posts, { id: docRef.id, title, description, url, userId }]);
	} catch (error) {
		console.error('Error adding forum post:', error);
	}
};

// Delete a forum post by ID
export const deleteForumPost = async (id: string) => {
	try {
		const postDoc = doc(db, 'forumPosts', id);
		await deleteDoc(postDoc);
		forumPosts.update((posts) => posts.filter((post) => post.id !== id));
	} catch (error) {
		console.error('Error deleting forum post:', error);
		throw error;
	}
};

// Fetch a single forum post by ID
export const getForumPostById = async (id: string): Promise<Post | null> => {
	try {
		const postDoc = await getDoc(doc(db, 'forumPosts', id));
		if (postDoc.exists()) {
			const data = postDoc.data();
			return {
				id: postDoc.id,
				title: data.title,
				description: data.description,
				url: data.url,
				userId: data.userId
			} as Post;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error fetching forum post:', error);
		return null;
	}
};
