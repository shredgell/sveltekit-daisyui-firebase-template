<!-- src/lib/components/Header.svelte -->

<script>
	export let page;
</script>

<svelte:head>
	<title>{page.title}</title>
	<meta name="description" content={page.description} />
</svelte:head>

<header>
	<h1>{page.title}</h1>
	<p>{page.description}</p>
	<hr />
</header>
