<script lang="ts">
    import { pb, user } from "$lib/pb";
    import { goto } from '$app/navigation';
    let email: string;
    let password: string;
    

    let creating = false;
    async function login() {
        await console.log(pb.collection("teams").authWithPassword(email, password));
        creating = false;
        goto("/")
    }
</script>

<div class="container">
    {#if $user}
<h1> You have already created an account!</h1>
{:else}
<form>
    <h1 class="text-center"> Welcome to FirstConnect</h1>
    <h2 class = "text-center">The trusted source for connecting FIRST mentors and mentees!</h2>
    <div class="mb-3">
        <label for="email">Email</label>
        <input type="email" class="form-control" bind:value={email} placeholder="" id="email">
    </div>
    <div class="mb-3">
        <label for="password">Password (min length 5)</label>
        <input type="password" class="form-control" bind:value={password} placeholder="" id="password" minlength={5}>
    </div>
    <button type="submit" class="btn btn-success" on:click|preventDefault={login} disabled={creating}>Login!</button>
</form>
{/if}
</div>