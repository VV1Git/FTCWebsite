<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { pb, user } from "$lib/pb";
    import { onMount } from "svelte";

    let mentor: string[] = [];
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

    const states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    onMount(() => {
        mentor = JSON.parse(localStorage.getItem("mentor") || "[]");
        program = JSON.parse(localStorage.getItem("program") || "[]");
        skill = JSON.parse(localStorage.getItem("skill") || "[]");
        
        mounted = true;
    })

    $: {
        if (browser && mounted) {
            localStorage.setItem("mentor", JSON.stringify(mentor));
            localStorage.setItem("program", JSON.stringify(program));
            localStorage.setItem("skill", JSON.stringify(skill));
        }
    }

    let creating = false;
    async function create() {
        console.log({
        "team_name": name,
        "email": email,
        "password": password,
        "passwordConfirm": password,
        "program": program,
        "number": number,
        "zip_code": zip,
        "city": city,
        "state": state,
        "country": country,
        "meeting": meetingtype,
        "mentor": mentor
    })  
        creating = true;
        await pb.collection("teams").create({
        "team_name": name,
        "email": email,
        "verified": false,
        "password": password,
        "passwordConfirm": password,
        "program": program,
        "number": number,
        "zip_code": zip,
        "city": city,
        "state": state,
        "country": country,
        "meeting": meetingtype,
        "mentor": mentor
    })
        await pb.collection("teams").authWithPassword(email, password);
        creating = false;

    }

    let registered = false;

</script>

<div class="container">
{#if $user}
<h1> You have already created an account!</h1>
{:else}
<form>
    <h1 class="text-center"> Welcome to FirstConnect</h1>
    <h2 class = "text-center">The trusted source for connecting FIRST mentors and mentees!</h2>
    <div class="mb-3">
        <div class="form-text">Name and program</div>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="e.g. Quality Control">
            <select class="form-select" style="flex: 0.1;">
                <option value="fll">FLL</option>
                <option value="ftc">FTC</option>
                <option value="frc">FRC</option>
            </select>
        </div>
    </div>
    <h3> Do you want to a mentor or to be a mentor?</h3>
    <div class="mb-3">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" bind:group={mentor} id="mentor" value="mentor">
            <label class="form-check-label" for="mentor">
                I want to be a mentor!
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" bind:group={mentor} id="mentee" value="mentee">
            <label class="form-check-label" for="mentee">
                I want to be a mentee!
            </label>
        </div>
    </div>


    {#if true}
    <h4>FIRST Program</h4>
    <div id="formhelp" class="form-text">Leave empty to signal no preference</div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value={"fll"} bind:group={program} id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          FLL
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value={"ftc"} bind:group={program} id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          FTC
        </label>
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" value={"frc"} bind:group={program} id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          FRC
        </label>
      </div>

      <div class="form-text">Team name</div>
        <div class="input-group">
            <input type="text" class="form-control" bind:value={name} placeholder="e.g. Quality Control">
        </div>

      <h4>Mentor/Mentee skills</h4>
      <div class="form-check">
          <input class="form-check-input" type="checkbox" value={"program"} bind:group={skill} id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Programming
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value={"design"} bind:group={skill} id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Design
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value={"cad"} bind:group={skill} id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            CAD
          </label>
        </div>
        {:else}
        hello
        {/if}
        <h4>Location</h4>
        <div class="mb-3">
            <label for="disabledSelect" class="form-label" >Country</label>
            <select id="disabledSelect" class="form-select" bind:value={country} >
              <option value={"USA"} >USA</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">State</label>
            <select id="inputState" class="form-select" bind:value={state} >
              <option selected>Choose...</option>
              {#each states as state}
              <option value={state}>{state}</option>
              {/each}
            </select>
          </div>
        <div class="col-md-6">
            <label for="inputCity" class="form-label" >City</label>
            <input type="text" class="form-control" id="inputCity" bind:value={city}>
          </div>
          
          <div class="col-md-2">
            <label for="inputZip" class="form-label">Zip</label>
            <input type="number" class="form-control" id="inputZip" bind:value={zip}>
          </div>
          <h4>Do you want in-person or virtual meetings?</h4>
          <div class="form-check">
              <input class="form-check-input" type="checkbox" value={"in-person"} bind:group={meetingtype} id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                In-person
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value={"virtual"} bind:group={meetingtype} id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Virtual
              </label>
            </div> 
    <div class="mb-3">
        <label for="num">Team number</label>
        <input type="number" class="form-control" bind:value={number} placeholder="21229" id="num">
    </div>
    <div class="mb-3">
        <label for="email">Email</label>
        <input type="email" class="form-control" bind:value={email} placeholder="" id="email">
    </div>
    <div class="mb-3">
        <label for="password">Password (min length 5)</label>
        <input type="password" class="form-control" bind:value={password} placeholder="" id="password" minlength={5}>
    </div>
    <!--<p>Head over to <a target="_blank" href={`https://www.firstinspires.org/robotics/${program}/start-a-team`}>{`https://www.firstinspires.org/robotics/${program}/start-a-team`}</a> to start a team!</p>-->
    <button type="submit" class="btn btn-success" on:click|preventDefault={create} disabled={creating}>Create account!</button>
</form>
{/if}
</div>