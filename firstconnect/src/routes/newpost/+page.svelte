<script lang="ts">
    import { onMount } from 'svelte';
    import PocketBase, { type ListResult, type RecordModel } from 'pocketbase';
    import { page } from '$app/stores';

    let loaded = false;
    let posts: any;

    onMount(async () => {
      const pb = new PocketBase('http://127.0.0.1:8090');
      // fetch a paginated records list
      posts = await pb.collection('requests').getFullList({sort: '-created',});
      loaded = true;
    })

    const pb = new PocketBase('http://127.0.0.1:8090');
    const data = {
    "title": "",
    "description": "",
    "team": pb.authStore.model?.id
    };


    async function addreq(req: any) {
      const pb = new PocketBase('http://127.0.0.1:8090');
      const record = await pb.collection('requests').create(data);
    }

</script>


<div class="container">
  <form>
    <h1>Title</h1>
    <div class="mb-3">
      <input type="text" class="form-control" bind:value={data.title} id="title">
      <div id="title" class="form-text">It must be non-empty.</div>
    </div>
    <h3>Description</h3>
    <div class="mb-3">
      <textarea class="form-control" bind:value={data.description} id="desc" rows="14"></textarea>
      <div id="title" class="form-text">It must be non-empty.</div>
    </div>
    <div class="d-grid gap-2">
      <a type="submit" href="/posts" class="btn btn-primary btn-lg" on:click={() => addreq(data)}>Add post</a>
    </div>
  </form>
</div>
