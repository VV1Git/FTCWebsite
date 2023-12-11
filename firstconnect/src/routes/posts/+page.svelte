<script lang="ts">
    import { onMount } from 'svelte';
    import PocketBase, { type ListResult, type RecordModel } from 'pocketbase';

    let loaded = false;
    let posts: any;
    let teams: any;

  

    onMount(async () => {
      const pb = new PocketBase('http://127.0.0.1:8090');
      posts = await pb.collection('requests').getFullList({sort: '-created',});
      teams = await pb.collection('teams').getFullList({sort: '-created',});
      loaded = true;
    })

    function name(id: any, users: any) {
      console.log(users[0].id)
      for(let i=0; i<users.length; i++){
      console.log(users[i].id);
      }
      return null;
    }
    const data = {
    "title": "test",
    "description": "test",
    "team": "RELATION_RECORD_ID"
    };

  
</script>



{#if loaded}
<h1 class="text-center">Posts</h1>
  <div class="list-group container">
    {#each posts as post}
      <a href="/{post.id}" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h6 class="mb-0">{post.title}</h6>
            {#if post.description.length > 10}
              <p class="mb-0 opacity-75">{@html post.description.substring(0, 10)}...</p>
            {:else}
              <p class="mb-0 opacity-75">{@html post.description.substring(0, 10)}</p>
            {/if}
          </div>
          <small class="opacity-50 text-nowrap">
            Created on {post.created.substring(0, 10)} by {name(post.id, teams)}
          </small>
        </div>
      </a>
    {/each}
  </div>
{/if}
