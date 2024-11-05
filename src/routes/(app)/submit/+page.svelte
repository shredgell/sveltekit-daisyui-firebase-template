<script lang="ts">
	import { writable } from 'svelte/store';
	import { addSubmission, loadSubmissions } from '$lib/firestore/submissionService';
	import { currentUser } from '$lib/auth/authService';
	import type { Submission } from '$lib/types';

	// Form input
	let youtubeUrl = '';

	// Submissions list
	const submissions = writable<Submission[]>([]);

	// Load submissions on page load
	loadSubmissions(submissions); // Pass the writable store here

	// Function to handle submission
	const handleSubmit = async () => {
		const isValidYouTubeUrl = youtubeUrl.includes('youtube.com') || youtubeUrl.includes('youtu.be');
		if (isValidYouTubeUrl) {
			await addSubmission(youtubeUrl);
			youtubeUrl = ''; // Reset the input
			loadSubmissions(submissions); // Reload the submissions after adding a new one
		} else {
			alert('Please enter a valid YouTube link.');
		}
	};

	// Function to extract the YouTube ID from the URL
	function extractYouTubeID(url: string) {
		const regex =
			/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
		const matches = url.match(regex);
		return matches ? matches[1] : '';
	}
</script>

<h1>Submit a YouTube Video</h1>

<form on:submit|preventDefault={handleSubmit}>
	<input
		type="url"
		bind:value={youtubeUrl}
		placeholder="Enter YouTube link"
		required
		class="input input-bordered"
	/>
	<button type="submit" class="btn btn-primary">Submit</button>
</form>

<h2>Submissions</h2>

<ul>
	{#each $submissions as { id, url, username, userImage, timestamp }}
		<li class="submission">
			<div class="uploader-info">
				<img src={userImage} alt={username} class="user-avatar" />
				<span>{username}</span>
				<small>{new Date(timestamp.seconds * 1000).toLocaleString()}</small>
			</div>
			<iframe
				src={`https://www.youtube.com/embed/${extractYouTubeID(url)}`}
				title="YouTube video"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</li>
	{/each}
</ul>

<style>
	.submission {
		margin-bottom: 1rem;
	}
	.uploader-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.user-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}
</style>
