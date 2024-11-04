<script lang="ts">
	import { user, login, logout, authError, isLoading } from '$lib/stores/authStore';
</script>

{#if $user}
	<button on:click={logout} class="btn btn-ghost" disabled={$isLoading}> Logout </button>
{:else}
	<button on:click={login} class="btn btn-ghost" disabled={$isLoading}>
		<div class="flex items-center gap-2">
			<span>Login</span>
		</div>
	</button>
{/if}

{#if $authError}
	<p class="mt-2 text-sm text-red-500">
		{$authError}
	</p>
{/if}
