<script>
	import { getNavLinks } from '$lib/constants/siteData';
	const navLinks = getNavLinks();

	// Array of available themes
	const themes = [
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset'
	];
</script>

<nav class="navbar bg-base-100">
	<!-- Navbar Start: Hamburger Menu (Mobile) and Brand -->
	<div class="navbar-start">
		<!-- Mobile Dropdown -->
		<div class="dropdown">
			<!-- Hamburger Button: Visible on Small Screens -->
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</label>
			<!-- Dropdown Content: Visible on Small Screens -->
			<ul
				tabindex="0"
				class="menu-compact menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
			>
				{#each navLinks as link}
					<li>
						<a href={link.href} class="btn btn-ghost">{link.name}</a>
					</li>
				{/each}
			</ul>
		</div>
		<!-- Brand Name: Always Visible -->
		<a href="/" class="btn btn-ghost ml-2 text-xl normal-case">Skatebit</a>
	</div>

	<!-- Navbar End: Links and Theme Toggle Dropdown (Large Screens) -->
	<div class="navbar-end">
		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn btn-ghost hidden lg:flex">
				Skater XL
				<svg
					class="ml-1 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
				>
					<path d="M7 10l5 5 5-5z" />
				</svg>
			</label>
			<ul tabindex="0" class="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
				{#each navLinks as link}
					<li>
						<a href={link.href}>{link.name}</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Theme Dropdown -->
		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn btn-ghost flex items-center">
				<div class="hidden lg:flex">Theme</div>
				<svg
					class="flex h-7 w-7 lg:hidden"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							d="M2 12.0261C2 17.1723 5.86713 21.413 10.8468 21.9863C11.5816 22.0709 12.2938 21.7576 12.8168 21.2333C13.4703 20.5781 13.4703 19.5159 12.8168 18.8607C12.2938 18.3364 11.8674 17.5541 12.2619 16.9268C13.8385 14.4192 22 20.178 22 12.0261C22 6.48884 17.5228 2 12 2C6.47715 2 2 6.48884 2 12.0261Z"
							stroke="#1C274C"
							stroke-width="1.5"
						></path>
						<circle cx="17.5" cy="11.5" r="0.75" stroke="#1C274C" stroke-width="1.5"></circle>
						<circle cx="6.5" cy="11.5" r="0.75" stroke="#1C274C" stroke-width="1.5"></circle>
						<path
							d="M10.335 6.99976C10.335 7.41397 9.99917 7.74976 9.58496 7.74976C9.17075 7.74976 8.83496 7.41397 8.83496 6.99976C8.83496 6.58554 9.17075 6.24976 9.58496 6.24976C9.99917 6.24976 10.335 6.58554 10.335 6.99976Z"
							stroke="#1C274C"
							stroke-width="1.5"
						></path>
						<path
							d="M15.25 7C15.25 7.41421 14.9142 7.75 14.5 7.75C14.0858 7.75 13.75 7.41421 13.75 7C13.75 6.58579 14.0858 6.25 14.5 6.25C14.9142 6.25 15.25 6.58579 15.25 7Z"
							stroke="#1C274C"
							stroke-width="1.5"
						></path>
					</g></svg
				>
				<svg
					class="fill-current transition-transform duration-200"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
				>
					<path d="M7 10l5 5 5-5z" />
				</svg>
			</label>
			<ul
				tabindex="0"
				class="menu dropdown-content max-h-96 w-52 overflow-y-scroll rounded-box bg-base-100 p-2 shadow"
			>
				<div>
					{#each themes as theme}
						<li>
							<a data-set-theme={theme} data-act-class="ACTIVE_CLASS">{theme}</a>
						</li>
					{/each}
				</div>
			</ul>
		</div>
	</div>
</nav>

<style>
	/* Optional: Rotate the dropdown arrow when active */
	.dropdown label svg {
		transition: transform 0.2s ease-in-out;
	}
	.dropdown:hover label svg,
	.dropdown:focus-within label svg {
		transform: rotate(180deg);
	}
</style>
