<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex min-h-screen w-full flex-col items-center">
	<div class="fixed top-0 z-10 w-full">
		<Navbar />
	</div>
	<main class="prose w-full overscroll-none px-4 pb-8 pt-28 lg:prose-xl">
		<slot />
	</main>
</div>
<Footer />
