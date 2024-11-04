<script>
	export let page;
</script>

<svelte:head>
	<title>{page.title}</title>
	<meta name="description" content={page.description} />
</svelte:head>

<header>
	<h1>{page.heading}</h1>
	<p>{page.description}</p>
	<hr />
</header>
