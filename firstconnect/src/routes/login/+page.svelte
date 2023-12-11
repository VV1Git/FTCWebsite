<script lang="ts">
    import { pb, user } from "$lib/pb";
    import { goto } from '$app/navigation';
    let email: string;
    let password: string;
    let mentor: string;

    let creating = false;
    async function login() {
        await console.log(pb.collection(mentor).authWithPassword(email, password));
        creating = false;
        goto("/")
    }
</script>

<div class="container">
    {#if $user}
<h1> You have already created an account!</h1>
{:else}

<h1 class="text-center"> Welcome to FirstConnect</h1>
<h2 class = "text-center">The trusted source for connecting FIRST mentors and mentees!</h2>

<form>
    <div class="mb-4">
        <h3>Do you have a mentor or mentee account?</h3>
        <div class="form-check">
          <input class="form-check-input" type="radio" bind:group={mentor} id="mentor" value="mentors"/>
          <label class="form-check-label" for="mentor">I am a mentor!</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" bind:group={mentor} id="mentee" value="mentees"/>
          <label class="form-check-label" for="mentee">I am a mentee!</label>
        </div>
      </div>
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