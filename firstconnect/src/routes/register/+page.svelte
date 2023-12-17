<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { pb, user } from "$lib/pb";
    import { onMount } from "svelte";

    let mentor: boolean;
    let name = "";
    let program: string[] = [];
    let skill: string[] = [];
    let country = "USA";
    let state = "";
    let city = "";
    let zip: number;
    let meetingtype: string[] = [];
    let mounted = true;
    let number: number;
    let email: string;
    let password: string;
    let individual: boolean;

    const states: string[] = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    // onMount(() => {
    //     mentor = JSON.parse(localStorage.getItem("mentor") || "[]");
    //     program = JSON.parse(localStorage.getItem("program") || "[]");
    //     skill = JSON.parse(localStorage.getItem("skill") || "[]");
    //     mounted = true;
    // })

    /*$: {
            if (browser && mounted) {
                    localStorage.setItem("mentor", JSON.stringify(mentor));
                    localStorage.setItem("program", JSON.stringify(program));
                    localStorage.setItem("skill", JSON.stringify(skill));
            }
    }*/

    let creating = false;
    async function create() {
        creating = true;
        if (number == undefined) {
            number = -1;
        }
        let collection = pb.collection(mentor ? "mentors" : "mentees");
        try {
            await collection.create({
                "emailVisibility": true,
                "email": email,
                "password": password,
                "passwordConfirm": password,
                "name": name,
                "number": number,
                "program": program,
                "meeting": meetingtype,
                "country": country,
                "state": state,
                "city": city,
                "zip_code": zip,
                "skill": skill
            });
        } catch (e: any) {
            alert(JSON.stringify(e.data));
            creating = false;
            return;
        }
        await collection.authWithPassword(email, password);

        creating = false;
        goto("/");
    }

    let registered = false;
</script>

<div class="container">
    {#if $user}
        <h1> You have already created an account!</h1>
    {:else}
        <form class="container mt-5 bg-light p-4 rounded">
            <!-- Welcome messages -->
            <h1 class="text-center mb-4">Welcome to FirstConnect</h1>
            <h2 class="text-center mb-5 text-secondary">The trusted source for connecting FIRST mentors and mentees!</h2>

            <!-- Mentor or Mentee selection -->
            <div class="mb-4">
                <h3 class="text-primary" style="color:aqua">Do you want to be a mentor or to be a mentee?</h3>
                <div class="form-check">
                    <input class="form-check-input" type="radio" bind:group={mentor} id="mentor" value={true}/>
                    <label class="form-check-label" for="mentor">I want to be a mentor!</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" bind:group={mentor} id="mentee" value={false}/>
                    <label class="form-check-label" for="mentee">I want to be a mentee!</label>
                </div>
            </div>

            {#if mentor === true}
                <!-- Programs to mentor checkbox section -->
                <div class="mb-4">
                    <h3 class="text-primary">Which programs would you like to mentor?</h3>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={"fll"} bind:group={program} id="flexCheckDefault1">
                        <label class="form-check-label" for="flexCheckDefault1">FLL</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={"ftc"} bind:group={program} id="flexCheckDefault2">
                        <label class="form-check-label" for="flexCheckDefault2">FTC</label>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" value={"frc"} bind:group={program} id="flexCheckDefault3">
                        <label class="form-check-label" for="flexCheckDefault3">FRC</label>
                    </div>
                </div>
                <!-- Skills checkbox section -->
                <div class="mb-4">
                    <h3 class="text-primary">What skills do you have?</h3>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={"program"} bind:group={skill} id="flexCheckDefault4">
                        <label class="form-check-label" for="flexCheckDefault4">Programming</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={"design"} bind:group={skill} id="flexCheckDefault5">
                        <label class="form-check-label" for="flexCheckDefault5">Design</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={"cad"} bind:group={skill} id="flexCheckDefault6">
                        <label class="form-check-label" for="flexCheckDefault6">CAD</label>
                    </div>
                </div>
                <!-- Meeting type checkbox section -->
                <div class="mb-4">
                    <h3 class="text-primary">Do you want in-person or virtual meetings?</h3>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={"in-person"} bind:group={meetingtype} id="flexCheckDefault7">
                        <label class="form-check-label" for="flexCheckDefault7">In-person</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={"virtual"} bind:group={meetingtype} id="flexCheckDefault8">
                        <label class="form-check-label" for="flexCheckDefault8">Virtual</label>
                    </div> 
                </div>
            {:else if mentor === false}
                <div class="mb-4">
                    <h3 class="text-primary">Which program are you in?</h3>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={"fll"} bind:group={program} id="fll">
                        <label class="form-check-label" for="fll">FLL</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={"ftc"} bind:group={program} id="ftc">
                        <label class="form-check-label" for="ftc">FTC</label>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="radio" value={"frc"} bind:group={program} id="frc">
                        <label class="form-check-label" for="frc">FRC</label>
                    </div>
                </div>
            {/if}
            <!-- Individual or Team selection -->
            <div class="mb-4">
                <h3 class="text-primary">Are you an individual or a team?</h3>
                <div class="form-check">
                    <input class="form-check-input" type="radio" bind:group={individual} id="individual" value={true}>
                    <label class="form-check-label" for="individual">I am an individual!</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" bind:group={individual} id="team" value={false}>
                    <label class="form-check-label" for="team">I am a team!</label>
                </div>
            </div>

            {#if individual}
                <!-- Individual's name input -->
                <div class="mb-3">
                    <label for="name" class="form-text text-primary">What is your name? (Must be longer than 3 characters)</label>
                    <input type="text" class="form-control" bind:value={name} id="name">
                </div>
            {:else if individual === false}
                <!-- Team's name and number inputs -->
                <div class="mb-3">
                    <label for="teamName" class="form-text text-primary">What is your team name? (Must be longer than 3 characters)</label>
                    <input type="text" class="form-control" bind:value={name} id="teamName">
                </div>
                <div class="mb-3">
                    <label for="teamNumber" class="form-text text-primary">What is your team number? (Must be longer than 3 characters)</label>
                    <input type="number" class="form-control" id="teamNumber" bind:value={number}>
                </div>
            {/if}

            <!-- Location selection -->
            <div class="mb-4">
                <h3 class="text-primary">Location</h3>
                <div class="mb-3">
                    <label for="country" class="form-label text-primary">Country</label>
                    <select id="country" class="form-select" bind:value={country}>
                        <option value={"USA"}>USA</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="state" class="form-label text-primary">State</label>
                    <select id="state" class="form-select" bind:value={state}>
                        <option selected>Choose...</option>
                        {#each states as state}
                            <option value={state}>{state}</option>
                        {/each}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="city" class="form-label text-primary">City</label>
                    <input type="text" class="form-control" id="city" bind:value={city}>
                </div>

                <div class="mb-3">
                    <label for="zip" class="form-label text-primary">Zip</label>
                    <input type="number" class="form-control" id="zip" bind:value={zip}>
                </div>
            </div>

            <!-- Additional user information inputs -->
            <div class="mb-3">
                <label for="email" class="form-label text-primary">Email</label>
                <input type="email" class="form-control" bind:value={email} placeholder="" id="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label text-primary">Password (min length 5)</label>
                <input type="password" class="form-control" bind:value={password} placeholder="" id="password" minlength={5}>
            </div>

            <!-- Submission button -->
            <!--<p>Head over to <a target="_blank" href={`https://www.firstinspires.org/robotics/${program}/start-a-team`}>{`https://www.firstinspires.org/robotics/${program}/start-a-team`}</a> to start a team!</p>-->
            <button type="submit" class="btn btn-success btn-lg" on:click|preventDefault={create} disabled={creating}>Create account!</button>
        </form>
    {/if}
</div>
