<script lang="ts">
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-icons/font/bootstrap-icons.css";
	const { children } = $props();
</script>

<nav>
	<a href="/">Événements</a>
	<a href="/lan">L.A.N.</a>
	<a href="/about">À propos</a>
</nav>

{@render children()}