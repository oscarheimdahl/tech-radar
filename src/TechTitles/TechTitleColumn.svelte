<script lang="ts">
  import type { Tech } from '../store/techsStore';
  import TechTitle from './TechTitle.svelte';
  export let techs: Tech[] = [];
  export let title = '';
</script>

<div class="flex flex-col">
  <h2 class="font-semibold ml-2">{title}</h2>
  <div class={`flex flex-col p-4 rounded-lg h-min ${$$props.class} shadow-sm`}>
    {#each techs as tech}
      <TechTitle {tech} />
    {/each}
  </div>
</div>
