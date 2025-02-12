<script lang="ts">
  const { children } = $props();
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { base } from "$app/paths"


  import '@fortawesome/fontawesome-free/css/all.min.css'

  import "bootstrap/dist/css/bootstrap.css";
  import "bootstrap-icons/font/bootstrap-icons.css";

  const makeUrl = (url: string) => {
    return `${base}/${url}`
  }

  onMount(async () => {
    const bootstrap = await (import('bootstrap/dist/js/bootstrap.bundle.min.js'));

  })
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="{makeUrl("")}">LOGO</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="{makeUrl("")}" class:active={$page.url.pathname === makeUrl("")}>Événements</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{makeUrl("lan")}" class:active={$page.url.pathname === makeUrl("lan")}>L.A.N</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{makeUrl("about")}" class:active={$page.url.pathname === makeUrl("about")}>À propos</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

{@render children()}