<script>
  import { techs } from '../canvas/techData';
  import TechTitleColumn from './TechTitleColumn.svelte';
</script>

<div class="flex gap-4 p-4">
  <TechTitleColumn
    title={'Frontend'}
    background="#FFB499"
    techs={techs.filter((t) => t.quarter === 0)}
  />
  <TechTitleColumn
    title={'Backend'}
    background="#B4B4FF"
    techs={techs.filter((t) => t.quarter === 1)}
  />
  <TechTitleColumn
    title={'Infrastructure'}
    background="#FFB4B4"
    techs={techs.filter((t) => t.quarter === 2)}
  />
  <TechTitleColumn
    title={'Other'}
    background="#99B4FF"
    techs={techs.filter((t) => t.quarter === 3)}
  />
</div>
