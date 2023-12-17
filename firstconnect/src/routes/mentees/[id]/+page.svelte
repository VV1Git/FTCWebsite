<script lang="ts">
    import { onMount } from 'svelte';
import PocketBase, { type ListResult, type RecordModel } from 'pocketbase';
import { pb, user } from "$lib/pb";
    import { page } from '$app/stores';

let loaded = false;
let mentor: any;



onMount(async () => {
    console.log({ slug: $page.params.id })
    mentor = await pb.collection('mentors').getOne($page.params.id);
    console.log(mentor)
    loaded = true;
})
</script>

<style>
    .enhanced-card {
      background-color: #f8f9fa; /* Light gray background */
      padding: 20px;
      border-radius: 15px;
      width: 80%; /* Adjust the width as needed */
      margin: 0 auto; /* Center the card */
    }
  
    .card-title {
      color: #007bff; /* Blue title */
      font-size: 24px;
    }
  
    .card-text {
      color: #495057; /* Dark text color */
      font-size: 18px;
    }
  </style>

{#if $user}
{#if mentor != undefined}
    <div class="container mt-4">
        <div class="card enhanced-card">
            <div class="card-body">
                <h4 class="card-title text-center" style="text-weight: bold;">{mentor["name"].charAt(0).toUpperCase()}{mentor["name"].slice(1)}</h4>
                <p class="card-text mb-1">Located in</p>
                {mentor["city"].charAt(0).toUpperCase()}{mentor["city"].slice(1)}, {mentor["state"]}
                <p class="card-text mb-1" style="text-weight: bold;">Good at</p>
                {#each mentor["skill"] as skill}
                    <span class="badge text-bg-primary me-1">{skill}</span>
                {/each}
                <p class="card-text mb-1" style="text-weight: bold;">Contact them through their email:</p>
                {mentor["email"]}
            </div>
        </div>
  </div>
{:else}
  <h1 class="text-center">Page not found!</h1>
{/if}
{/if}