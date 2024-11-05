<script lang="ts">
	import type { User } from 'firebase/auth';

	export let user: User;
</script>

<header>
	<h1>Welcome to your Dashboard, {user.displayName}!</h1>
	<p>Here is some content for authenticated users.</p>
	<hr />
</header>
