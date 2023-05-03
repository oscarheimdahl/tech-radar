<script lang="ts">
  import FileDragArea from './FileDragArea.svelte';
  import Radar from './Radar.svelte';
  import TechTitleColumn from './TechTitles/TechTitleColumn.svelte';
  import TechTitles from './TechTitles/TechTitles.svelte';
  import { techsStore, type Tech } from './store/techsStore';

  let techs: Tech[] = [];
  techsStore.subscribe((_techs) => {
    techs = _techs;
  });
</script>

<Radar />
<div class="h-full flex items-stretch gap-4 justify-between">
  <TechTitles position="first">
    <TechTitleColumn
      title={'Other'}
      class="bg-green-300"
      techs={techs.filter((t) => t.quarter === 3)}
    />
    <TechTitleColumn
      title={'Backend'}
      class="bg-orange-300"
      techs={techs.filter((t) => t.quarter === 2)}
    />
  </TechTitles>
  <TechTitles position="last">
    <TechTitleColumn
      title={'Frontend'}
      class="bg-blue-300"
      techs={techs.filter((t) => t.quarter === 0)}
    />
    <TechTitleColumn
      title={'Backend'}
      class="bg-red-300"
      techs={techs.filter((t) => t.quarter === 1)}
    />
  </TechTitles>
</div>
<FileDragArea />
