<script lang="ts">
        import { onMount } from 'svelte';
    import PocketBase, { type ListResult, type RecordModel } from 'pocketbase';
    import { pb, user } from "$lib/pb";

    let loaded = false;
    let users: any;
    let ismentee: boolean = $user?.collectionName == "mentees";

  

    onMount(async () => {
      if ($user?.collectionName == "mentees"){
        users = await pb.collection('mentors').getFullList({sort: '-created',});
      } else{
        users = await pb.collection('mentees').getFullList({sort: '-created',});
      }
      loaded = true;
    })
</script>
{#if $user}
{#if loaded}
{#if $user.collectionName == "mentees"}
  <h1 class="text-center">Mentors Available</h1>
  <div class="list-group container">
    {#each users as user}
      <a href="/mentees/{user.id}" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h6 class="mb-0">{user.name}</h6>
            {#if user["meetingtype"] == "inperson"}
              <p class="mb-0 opacity-75">Is available for in person meetings</p>
            {:else if user["meetingtype"] == "virtual"}
              <p class="mb-0 opacity-75">Is available for virtual meetings</p>
            {:else}
              <p class="mb-0 opacity-75">Is available for in person and virtual meetings</p>
            {/if}
          </div>
          <small class="opacity-50 text-nowrap">
            {#if user["number"] == -1}
            Individual
              {:else}
            On team number {user["number"]}
            {/if}
          </small>
        </div>
      </a>
    {/each}
  </div>
{:else}
<h1 class="text-center">Mentees Available</h1>
<div class="list-group container">
  {#each users as user}
    <a href="/mentors/{user.id}" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 class="mb-0">{user.name}</h6>
          <p class="mb-0 opacity-75">In {user["program"].toUpperCase()}</p>
        </div>
        <small class="opacity-50 text-nowrap">
          {#if user["number"] == -1}
            Individual
            {:else}
            On team number {user["number"]}
          {/if}
        </small>
      </div>
    </a>
  {/each}
</div>
{/if}
{/if}
{:else}

  <h1 class="text-center">Please create an account before coming here</h1>
  <h2 class="text-center"><a href="/register">Click here to register</a></h2>

{/if}

