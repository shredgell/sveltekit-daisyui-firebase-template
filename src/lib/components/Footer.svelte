<!-- src/lib/components/Footer.svelte -->

<script>
	import { getNavLinks } from '$lib/constants/siteData';

	// Use getNavLinks to retrieve navigation links
	const navLinks = getNavLinks();
</script>

<footer class="footer footer-center rounded bg-base-200 p-10 text-base-content">
	<nav class="grid grid-flow-col gap-4">
		{#each navLinks as link}
			<a class="underline" href={link.href}>{link.name}</a>
		{/each}
	</nav>
	<aside>
		<p>Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd</p>
	</aside>
</footer>
