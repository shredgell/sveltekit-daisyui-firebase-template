<script lang="ts">
	import { getForumPostById, deleteForumPost, editForumPost } from '$lib/firestore/forumService';
	import { page } from '$app/stores';
	import { currentUser } from '$lib/auth/authService';
	import type { Post } from '$lib/types';

	let post: Post | null = null;
	let error: string | null = null;
	let isOriginalPoster = false;
	let isEditing = false; // Edit mode state

	// Temporary fields for editing
	let editTitle = '';
	let editDescription = '';
	let editUrl = '';

	// Reactive statement to load the post based on postId from URL
	$: postId = $page.params.id;

	$: if (postId) {
		loadPost(postId);
	}

	// Load the post data and check if the current user is the original poster
	async function loadPost(postId: string) {
		try {
			const fetchedPost = await getForumPostById(postId);
			post = fetchedPost;

			const user = $currentUser;
			isOriginalPoster = !!user && fetchedPost?.userId === user.uid;
			if (isOriginalPoster && post) {
				// Set temporary fields with current post data for editing
				editTitle = post.title;
				editDescription = post.description;
				editUrl = post.url;
			}
		} catch (e) {
			console.error('Error fetching post:', e);
			error = 'Failed to load post';
		}
	}

	// Handle post deletion
	const handleDeletePost = async () => {
		if (isOriginalPoster && confirm('Are you sure you want to delete this post?')) {
			try {
				await deleteForumPost(postId);
				alert('Post deleted successfully');
			} catch (deleteError) {
				console.error('Error deleting post:', deleteError);
				alert('Failed to delete post.');
			}
		}
	};

	// Enter edit mode
	const enableEditMode = () => {
		isEditing = true;
	};

	// Save the edited post
	const handleSaveEdit = async () => {
		if (post && editTitle && editDescription && editUrl) {
			try {
				await editForumPost(post.id, editTitle, editDescription, editUrl);
				post = { ...post, title: editTitle, description: editDescription, url: editUrl };
				isEditing = false; // Exit edit mode
			} catch (error) {
				console.error('Error saving post:', error);
				alert('Failed to save post.');
			}
		}
	};

	// Cancel edit mode
	const cancelEdit = () => {
		isEditing = false;
		editTitle = post?.title || '';
		editDescription = post?.description || '';
		editUrl = post?.url || '';
	};
</script>

{#if !post && !error}
	<p>Loading post...</p>
{:else if error}
	<p>{error}</p>
{:else if post}
	<a href="/forum">Back to Forum</a>
	{#if isOriginalPoster}
		<div class="mt-6">
			<button on:click={enableEditMode} class="btn btn-warning btn-sm">Edit</button>
			<button on:click={handleDeletePost} class="btn btn-error btn-sm">Delete</button>
		</div>
	{/if}
	<hr />
	{#if isEditing}
		<!-- Edit Mode -->
		<h1>Edit Post</h1>
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
				<button on:click={handleSaveEdit} class="btn btn-primary">Save</button>
				<button on:click={cancelEdit} class="btn btn-neutral">Cancel</button>
			</div>
		</div>
	{:else}
		<!-- View Mode -->
		<h1>{post.title}</h1>
		<p>{post.description}</p>
		<a href={post.url} target="_blank">Visit Link</a>
	{/if}
{/if}
<hr />
