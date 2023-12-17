<script lang="ts">
    import { onMount } from 'svelte';
import PocketBase, { type ListResult, type RecordModel } from 'pocketbase';
import { pb, user } from "$lib/pb";
    import { page } from '$app/stores';

let loaded = false;
let mentee: any;



onMount(async () => {
  const pb = new PocketBase('http://127.0.0.1:8090');
    console.log({ slug: $page.params.id })
    mentee = await pb.collection('mentees').getOne($page.params.id);
    console.log(mentee)
    loaded = true;
})
</script>

{#if $user}
{#if mentee != undefined}
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title text-center">{mentee["name"].charAt(0).toUpperCase()}{mentee["name"].slice(1)}</h4>
        <p class="card-text">Located in {mentee["city"].charAt(0).toUpperCase()}{mentee["city"].slice(1)}, {mentee["state"]}</p>
        <p class="card-text">Contact them through their email: {mentee["email"].toLowerCase()}</p>
      </div>
    </div>
  </div>
{:else}
  <h1 class="text-center">Page not found!</h1>
{/if}
{/if}