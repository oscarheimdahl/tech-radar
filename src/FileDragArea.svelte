<script lang="ts">
  import { parseJSONTechs } from './helpers/parseTechs';
  import { setTechs, type Tech } from './store/techsStore';

  let enableFileDrop = false;
  function dragover() {
    enableFileDrop = true;
  }
  function drop(e: DragEvent) {
    enableFileDrop = false;
    const file = e.dataTransfer.items[0];
    if (!file) return;
    const fr = new FileReader();
    fr.readAsText(file.getAsFile());
    fr.addEventListener('load', () => {
      try {
        if (typeof fr.result !== 'string') throw Error('bad');
        const techs = parseJSONTechs(fr.result);
        setTechs(techs);
      } catch (e) {
        alert(`${e}\nCheck console for example JSON.`);
      }
    });
  }
</script>

<svelte:body on:dragover|preventDefault={dragover} />
<div
  class="fixed inset-0 flex justify-center items-center bg-opacity-30 bg-black"
  class:hidden={!enableFileDrop}
  on:drop|preventDefault={drop}
>
  <span class="text-5xl text-white">DROP FILE HERE</span>
</div>
