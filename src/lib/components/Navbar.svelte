<!-- src/lib/components/Navbar.svelte -->

<script>
	import { getNavLinks } from '$lib/constants/siteData';

	const navLinks = getNavLinks();
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Skatebit</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#each navLinks as link}
				<li>
					<a class="btn btn-ghost" href={link.href}>{link.name}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
