<script lang="ts">
  import { techId, type Tech } from '../canvas/techData';
  import { selectedTechStore } from '../store/selectedTechStore';
  import TechTitle from './TechTitle.svelte';
  export let techs: Tech[] = [];
  export let title = '';
  export let background = '';
</script>

<div class="flex flex-col">
  <h2 class="font-semibold ml-2">{title}</h2>
  <div
    style={`background-color: ${background};`}
    class={`flex flex-col p-4 rounded-lg h-min`}
  >
    {#each techs as tech}
      <TechTitle {tech} />
    {/each}
  </div>
</div>
