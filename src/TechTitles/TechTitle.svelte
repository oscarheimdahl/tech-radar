<script lang="ts">
  import { techId, type Tech } from '../canvas/techData';
  import {
    selectedTechStore,
    setSelectedTech,
  } from '../store/selectedTechStore';
  export let tech: Tech;

  const id = techId(tech);
  let thisSelected = false;
  let otherSelected = false;
  selectedTechStore.subscribe((_selectedTech) => {
    thisSelected = _selectedTech === id;
    if (_selectedTech && !thisSelected) otherSelected = true;
    else otherSelected = false;
  });
  let style = '';
  $: {
    style = 'opacity-60';
    if (thisSelected) style = 'opacity-100';
    // if (otherSelected) style = 'opacity-50';
  }
</script>

<h2
  on:focus={() => {}}
  on:mouseover={() => setSelectedTech(id)}
  on:mouseleave={() => setSelectedTech('')}
  class={` ${style} transition-opacity hover:cursor-pointer w-min relative
  after:content-[''] after:absolute after:w-full after:left-0 after:bottom-0 after:border-b-2 after:border-black after:transition-transform ${
    thisSelected ? 'after:scale-x-100' : 'after:scale-x-[0]'
  }
  `}
>
  {tech.val}.&nbsp;{tech.name}
</h2>
