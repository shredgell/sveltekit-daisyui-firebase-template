<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex min-h-screen w-full flex-col items-center px-4">
	<div class="fixed top-0 z-10 w-full">
		<Navbar />
	</div>
	<main class="prose w-full overscroll-none pb-8 pt-24 lg:prose-xl md:pt-28">
		<slot />
	</main>
	<Footer />
</div>
