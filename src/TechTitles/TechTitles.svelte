<script lang="ts">
  export let position: 'first' | 'last';
</script>

<div
  class={`flex flex-col justify-between p-4 ${
    position === 'first' ? 'mr-auto' : 'ml-auto'
  }`}
>
  <slot />
</div>
