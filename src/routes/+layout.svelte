<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<a href="/">Événements</a>
	<a href="/lan">L.A.N.</a>
	<a href="/about">À propos</a>
</nav>

{@render children()}