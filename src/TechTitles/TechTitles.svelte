<script>
  import { techs } from '../canvas/techData';
  import TechTitleColumn from './TechTitleColumn.svelte';
</script>

<div class="flex gap-4 p-4">
  <TechTitleColumn
    title={'Frontend'}
    background="#ff440066"
    techs={techs.filter((t) => t.quarter === 0)}
  />
  <TechTitleColumn
    title={'Backend'}
    background="#0044ff66"
    techs={techs.filter((t) => t.quarter === 1)}
  />
  <TechTitleColumn
    title={'Infrastructure'}
    background="#ff444466"
    techs={techs.filter((t) => t.quarter === 2)}
  />
  <TechTitleColumn
    title={'Other'}
    background="#67b58866"
    techs={techs.filter((t) => t.quarter === 3)}
  />
</div>
