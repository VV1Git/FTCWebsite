<script lang="ts">
    import { onMount } from 'svelte';
import PocketBase, { type ListResult, type RecordModel } from 'pocketbase';
import { pb, user } from "$lib/pb";
    import { page } from '$app/stores';

let loaded = false;
let mentor: any;



onMount(async () => {
  const pb = new PocketBase('http://127.0.0.1:8090');
    console.log({ slug: $page.params.id })
    mentor = await pb.collection('mentors').getOne($page.params.id);
    console.log(mentor)
    loaded = true;
})
</script>

{#if $user}
{#if mentor != undefined}
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title text-center">{mentor["name"].charAt(0).toUpperCase()}{mentor["name"].slice(1)}</h4>
        <p class="card-text">Located in {mentor["city"].charAt(0).toUpperCase()}{mentor["city"].slice(1)}, {mentor["state"]}</p>
        {mentor["skill"]}
        <p class="card-text">Good at {mentor["skill"]}</p>
        <p class="card-text">Contact them through their email: {mentor["email"]}</p>
      </div>
    </div>
  </div>
{:else}
  <h1 class="text-center">Page not found!</h1>
{/if}
{/if}