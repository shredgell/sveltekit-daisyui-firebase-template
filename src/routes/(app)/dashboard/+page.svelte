<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		userList,
		generateUserList,
		addItem,
		editItem,
		deleteItem
	} from '$lib/firestore/userItemsService';
	import { currentUser as authUser, initAuth } from '$lib/auth/authService';
	import type { User } from 'firebase/auth';

	// Initialize authentication on component mount
	onMount(async () => {
		if (browser) {
			initAuth();
			await generateUserList(); // Fetch user list items on load
			loading = false;
		}
	});

	let loading = true;
	let newItemText = '';
	let editItemId: string | null = null;
	let editItemText = '';

	// Subscribe to authUser to handle redirection
	const unsubscribe = authUser.subscribe((user: User | null) => {
		if (!browser) return; // Only run the redirect on the client side
		if (!user) {
			goto('/'); // Redirect if the user is not authenticated
		}
	});

	// Clean up subscription on component destroy
	onDestroy(() => {
		unsubscribe();
	});

	// Add item to the list
	const handleAddItem = () => {
		if (newItemText.trim()) {
			addItem(newItemText);
			newItemText = '';
		}
	};

	// Edit item in the list
	const handleEditItem = (id: string, text: string) => {
		editItemId = id;
		editItemText = text;
	};

	// Save edited item
	const handleSaveEdit = () => {
		if (editItemId && editItemText.trim()) {
			editItem(editItemId, editItemText);
			editItemId = null;
			editItemText = '';
		}
	};

	// Delete item from the list
	const handleDeleteItem = (id: string) => {
		deleteItem(id);
	};
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Here is some content for authenticated users." />
</svelte:head>

{#if loading}
	<p>Loading...</p>
{:else if $authUser}
	<header>
		<h1>Welcome to your Dashboard, {$authUser.displayName}!</h1>
		<p>Here is some content for authenticated users.</p>
		<hr />
	</header>

	<div>
		<h2>Items List</h2>
		<input
			type="text"
			bind:value={newItemText}
			placeholder="Add new item"
			class="input input-bordered"
		/>
		<button on:click={handleAddItem} class="btn btn-primary">Add</button>

		<ul>
			{#each $userList as { id, text }}
				<li>
					{#if editItemId === id}
						<div class="flex justify-between">
							<input type="text" bind:value={editItemText} class="input input-bordered" />
							<div>
								<button on:click={handleSaveEdit} class="btn btn-primary btn-sm">Save</button>
								<button on:click={() => (editItemId = null)} class="btn btn-neutral btn-sm">
									Cancel
								</button>
							</div>
						</div>
					{:else}
						<div class="flex justify-between">
							<span>{text}</span>
							<div>
								<button on:click={() => handleEditItem(id, text)} class="btn btn-warning btn-sm">
									Edit
								</button>
								<button on:click={() => handleDeleteItem(id)} class="btn btn-error btn-sm">
									Delete
								</button>
							</div>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
