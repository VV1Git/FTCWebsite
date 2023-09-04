<script lang="ts">
    import { browser } from "$app/environment";
    import { pb, user } from "$lib/pb";
    import { onMount } from "svelte";

    let mentor = "mentee";
    let name = "";
    let program = "ftc";
    let mounted = false; // TODO: use a store instead
    onMount(() => {
        mentor = localStorage.getItem("mentor") || "mentee";
        name = localStorage.getItem("name") || "";
        program = localStorage.getItem("program") || "ftc";

        mounted = true;
    })

    $: {
        if (browser && mounted) {
            localStorage.setItem("mentor", mentor);
            localStorage.setItem("name", name);
            localStorage.setItem("program", program);
        }
    }

    let creating = false;
    async function create() {
        creating = true;
        await pb.collection("teams").create({
            name,
            email,
            password,
            passwordConfirm: password,
            mentor: mentor == "mentor",
            program,
            number,
        })
        await pb.collection("teams").authWithPassword(email, password);
        creating = false;
    }

    let registered = false;
    let number: number;
    let email: string;
    let password: string;
</script>

{#if $user}
<button type="button" class="btn btn-danger" on:click={() => {pb.authStore.clear()}}>Logout</button>
{:else}
<form>
    <div class="mb-3">
        <div class="form-text">Team name and program</div>
        <div class="input-group">
            <input type="text" class="form-control" bind:value={name} placeholder="e.g. Quality Control">
            <select class="form-select" style="flex: 0.1;" bind:value={program}>
                <option value="fll">FLL</option>
                <option value="ftc">FTC</option>
                <option value="frc">FRC</option>
            </select>
        </div>
    </div>

    <div class="mb-3">
        What are you looking for?
        <div class="form-check">
            <input class="form-check-input" type="radio" bind:group={mentor} id="mentor" value="mentor">
            <label class="form-check-label" for="mentor">
                I want to be a mentor!
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" bind:group={mentor} id="mentee" value="mentee">
            <label class="form-check-label" for="mentee">
                I want a mentor!
            </label>
        </div>
    </div>

    <div class="mb-3">
        Have you registered your team?
        <div class="form-check">
            <input class="form-check-input" type="radio" bind:group={registered} id="regno" value={false}>
            <label class="form-check-label" for="regno">
                No
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" bind:group={registered} id="regyes" value={true}>
            <label class="form-check-label" for="regyes">
                Yes
            </label>
        </div>
    </div>

    {#if registered}
    <div class="mb-3">
        <label for="num">Team number</label>
        <input type="number" class="form-control" bind:value={number} placeholder="21229" id="num">
    </div>
    <div class="mb-3">
        <label for="email">Email</label>
        <input type="email" class="form-control" bind:value={email} placeholder="vikramaditya.vedant@gmail.com" id="email">
    </div>
    <div class="mb-3">
        <label for="password">Password (min length 5)</label>
        <input type="password" class="form-control" bind:value={password} placeholder="7379 I live at 16727 SE 21st pl" id="password" minlength={5}>
    </div>

    <button type="submit" class="btn btn-success" on:click|preventDefault={create} disabled={creating}>Create account!</button>
    {:else}
    Head over to <a target="_blank" href={`https://www.firstinspires.org/robotics/${program}/start-a-team`}>{`https://www.firstinspires.org/robotics/${program}/start-a-team`}</a> to start a team! Then come back and create an account
    <h1>💀 No team lol</h1>
    {/if}
</form>
{/if}