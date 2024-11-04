<script lang="ts">
	import { currentUser } from '$lib/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { User } from 'firebase/auth'; // Import User type

	let loading = true;

	// Wait for Firebase to finish checking the user state
	onMount(() => {
		const unsubscribe = currentUser.subscribe((userValue: User | null) => {
			// Set loading to false once we have the user state
			loading = false;

			// If the user is not authenticated, redirect to home
			if (!userValue) {
				goto('/');
			}
		});

		return () => unsubscribe();
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else if $currentUser}
	<h1>Welcome to your Dashboard, {$currentUser.displayName}!</h1>
	<p>Here is some content for authenticated users.</p>
	<hr />
{/if}
