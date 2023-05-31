<script>
	import { base } from '$app/paths';
</script>

<svelte:head>
  <link rel="stylesheet" href="{base}/smui.css" />
</svelte:head>

<div class="app">
	<main>
		<slot />
	</main>
</div>

