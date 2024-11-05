<script lang="ts">
	import {
		forumPosts,
		loadForumPosts,
		addForumPost,
		deleteForumPost,
		editForumPost
	} from '$lib/firestore/forumService';
	import { currentUser } from '$lib/auth/authService';

	let title = '';
	let description = '';
	let url = '';
	let editTitle = '';
	let editDescription = '';
	let editUrl = '';
	let editingPostId: string | null = null; // Track the post being edited

	// Automatically load forum posts
	$: loadForumPosts();

	// Add a new post, including userId for authorization
	const handleAddPost = async () => {
		const user = $currentUser;
		if (user && title && description && url) {
			await addForumPost(title, description, url, user.uid);
			title = '';
			description = '';
			url = '';
		} else {
			alert('Please log in to add a post');
		}
	};

	// Enter edit mode for a specific post
	const handleEdit = (
		postId: string,
		postTitle: string,
		postDescription: string,
		postUrl: string
	) => {
		editingPostId = postId;
		editTitle = postTitle;
		editDescription = postDescription;
		editUrl = postUrl;
	};

	// Save the edited post
	const handleSaveEdit = async () => {
		if (editingPostId && editTitle && editDescription && editUrl) {
			try {
				await editForumPost(editingPostId, editTitle, editDescription, editUrl);
				editingPostId = null;
				editTitle = '';
				editDescription = '';
				editUrl = '';
			} catch (error) {
				console.error('Error saving post:', error);
			}
		}
	};

	// Cancel edit mode
	const cancelEdit = () => {
		editingPostId = null;
		editTitle = '';
		editDescription = '';
		editUrl = '';
	};

	// Delete post function with authorization check
	const handleDeletePost = async (id: string, userId: string) => {
		const user = $currentUser;
		if (user?.uid === userId) {
			try {
				await deleteForumPost(id);
			} catch (error) {
				console.error('Error deleting post:', error);
			}
		} else {
			alert('You can only delete your own posts.');
		}
	};
</script>

<h1>Forum</h1>

<form on:submit|preventDefault={handleAddPost}>
	<div class="flex flex-col space-y-4">
		<input
			class="input input-bordered"
			type="text"
			bind:value={title}
			placeholder="Title"
			required
		/>
		<textarea
			class="textarea textarea-bordered"
			bind:value={description}
			placeholder="Description"
			required
		></textarea>
		<input class="input input-bordered" type="url" bind:value={url} placeholder="URL" required />
		<div>
			<button class="btn" type="submit">Add Post</button>
		</div>
	</div>
</form>

{#each $forumPosts as { id, title, description, url, userId }}
	<h2>Posts</h2>
	{#if editingPostId === id}
		<!-- Editing Mode -->
		<div class="flex flex-col space-y-4">
			<input
				class="input input-bordered"
				type="text"
				bind:value={editTitle}
				placeholder="Edit Title"
				required
			/>
			<textarea
				class="textarea textarea-bordered"
				bind:value={editDescription}
				placeholder="Edit Description"
				required
			></textarea>
			<input
				class="input input-bordered"
				type="url"
				bind:value={editUrl}
				placeholder="Edit URL"
				required
			/>

			<div>
				<button class="btn btn-primary" on:click={handleSaveEdit}>Save</button>
				<button class="btn" on:click={cancelEdit}>Cancel</button>
			</div>
		</div>
	{:else}
		<!-- Display Mode -->
		<a href={`/forum/${id}`}>{title}</a>
		<p>{description}</p>
		<a href={url} target="_blank">Visit Link</a>

		<!-- Show edit and delete buttons only to the original poster -->
		{#if $currentUser?.uid === userId}
			<div class="mt-6">
				<button
					class="btn btn-warning btn-sm"
					on:click={() => handleEdit(id, title, description, url)}>Edit</button
				>
				<button class="btn btn-error btn-sm" on:click={() => handleDeletePost(id, userId)}
					>Delete</button
				>
			</div>
		{/if}
	{/if}
{/each}
