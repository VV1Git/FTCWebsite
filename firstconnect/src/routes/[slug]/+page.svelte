<script lang="ts">
    import { onMount } from 'svelte';
    import PocketBase, { type ListResult, type RecordModel } from 'pocketbase';
    import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;

    let loaded = false;
    let posts: any;
    let repls: any;
    let teams: any;
    let req: any;
    let replies: RecordModel[];
  
    onMount(async () => {
      const pb = new PocketBase('http://127.0.0.1:8090');
      repls = await pb.collection('replies').getFullList({sort: '-created',});
      posts = await pb.collection('requests').getFullList({sort: '-created',});
      teams = await pb.collection('teams').getFullList({sort: '-created',});
      console.log(req);
      for(var post of posts){
        if (post.id == $page.params.slug){
            req = post;
        }
        
    }
      replies = repls.filter((reply: any) => reply.request === $page.params.slug);
      loaded = true;
    })
</script>

<!--{#if loaded}
    {#if req != undefined}
        <div class="container mt-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">{req.title}</h4>
                    <p class="card-text">{req.description}</p>
                </div>
            </div>
            
            <h5 class="mt-4">Replies:</h5>
            {#each replies as reply}
                <div class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 class="mb-0">Who made it?</h6>
                            <p class="mb-0">{@html reply.body}</p>
                        </div>
                        <small class="opacity-50 text-nowrap">Created on {reply.created.substring(0,10)}</small>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <h1>Page not found!</h1>
    {/if}
{/if}-->
{#if loaded}
  {#if req != undefined}
    <div class="container mt-4">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title text-center">{req.title}</h4>
          <p class="card-text">{req.description}</p>
        </div>
      </div>
      
      <h5 class="mt-4">Replies:</h5>
      {#each replies as reply}
        <div class="card mt-2">
          <div class="card-body mb-0">
            <div class="d-flex justify-content-between">
              <h6 class="card-title mb-0">Who made it?</h6>
              <small class="opacity-50 text-nowrap">{reply.created.substring(0,10)}</small>
            </div>
            <p class="card-text">{@html reply.body}</p>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <h1 class="text-center">Page not found!</h1>
  {/if}
{/if}
