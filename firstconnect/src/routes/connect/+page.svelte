<script lang="ts">
        import { onMount } from 'svelte';
    import PocketBase, { type ListResult, type RecordModel } from 'pocketbase';

    let loaded = false;
    let posts: any;
    let teams: any;

  

    onMount(async () => {
      const pb = new PocketBase('http://127.0.0.1:8090');
      posts = await pb.collection('requests').getFullList({sort: '-created',});
      teams = await pb.collection('mentors').getFullList({sort: '-created',});
      console.log(teams)
      loaded = true;
    })
</script>
{#if loaded}
    {teams}
{/if}