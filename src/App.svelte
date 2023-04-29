<script>
  import Radar from './Radar.svelte';
  import TechTitles from './TechTitles/TechTitles.svelte';
  import { selectedTechStore } from './store/selectedTechStore';
</script>

<div class="flex flex-col items-center">
  <Radar />
  <TechTitles />
</div>
