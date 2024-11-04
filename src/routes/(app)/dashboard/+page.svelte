<script lang="ts">
	import { currentUser, userList, addItem, editItem, deleteItem } from '$lib/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { User } from 'firebase/auth'; // Import User type

	let loading = true;
	let newItemText = '';
	let editItemId: string | null = null;
	let editItemText = '';

	// Wait for Firebase to finish checking the user state
	onMount(() => {
		if (typeof window !== 'undefined') {
			const unsubscribe = currentUser.subscribe((userValue: User | null) => {
				// Set loading to false once we have the user state
				loading = false;

				// If the user is not authenticated, redirect to home
				if (!userValue) {
					goto('/');
				}
			});

			return () => unsubscribe();
		}
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

{#if loading}
	<p>Loading...</p>
{:else if $currentUser}
	<h1>Welcome to your Dashboard, {$currentUser.displayName}!</h1>
	<p>Here is some content for authenticated users.</p>
	<hr />

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
								<button on:click={() => (editItemId = null)} class="btn btn-neutral btn-sm"
									>Cancel</button
								>
							</div>
						</div>
					{:else}
						<div class="flex justify-between">
							<span>{text}</span>
							<div>
								<button on:click={() => handleEditItem(id, text)} class="btn btn-warning btn-sm"
									>Edit</button
								>
								<button on:click={() => handleDeleteItem(id)} class="btn btn-error btn-sm"
									>Delete</button
								>
							</div>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
