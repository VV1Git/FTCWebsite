
    <script>
    import { disableScrollHandling } from "$app/navigation";
    import { page } from "$app/stores";


        import { pb, user } from "$lib/pb";
        import Login from "../components/Login.svelte";
    </script>

    
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">FirstConnect</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-0">
        <li class="nav-item">
          <a class="nav-link" class:active={$page.route.id == "/about"} href="/about">About Us</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" class:active={$page.route.id == "/connect"} href="/connect">Connect</a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" class:active={$page.route.id == "/faq"} href="/faq">FAQ</a>
        </li> -->
        <li class="nav-item">
          <a class="nav-link" class:active={$page.route.id == "/tutorials"} href="/tutorials">Tutorials</a>
        </li>
        {#if $user} 
        <li>
            <button type="button" class="btn btn-danger" on:click={() => {pb.authStore.clear()}}>Logout</button>
        </li>
        {:else} 
        <li>
            <a class="nav-link active" class:active={$page.route.id == "/register"} href="/register">Register</a>
        </li>
        <li>
          <a class="nav-link active" class:active={$page.route.id == "/login"} href="/login">Login</a>
      </li>
        {/if}
    </ul>
    
    </div>
  </div>
</nav>

<style>
    .navbar-nav > li{
  margin-left: 30px;
  margin-right: 30px;
}
</style>
<slot></slot>
