<script lang="ts">
  import { default as k } from 'Konva';
  import { onMount } from 'svelte';
  import {
    bubbleAnimation,
    bubblesLayer,
    dim,
    drawBubbles,
    radarLayer,
  } from './canvas';
  import {
    selectedTechStore,
    setSelectedTech,
  } from './store/selectedTechStore';

  let container: HTMLDivElement | null = null;
  let bubbles: k.Rect[] = [];

  selectedTechStore.subscribe((selectedTechId) => {
    bubbles.forEach((bubble) => {
      if (bubble.id() === selectedTechId) {
        new k.Tween({
          node: bubble,
          duration: 0.1,
          easing: k.Easings.EaseInOut,
          scaleX: 2,
          scaleY: 2,
          offsetX: bubble.width() / 4,
          offsetY: bubble.width() / 4,
        }).play();
        bubble.zIndex(99);
        bubble.strokeWidth(1);
      } else {
        bubble.strokeWidth(2);
        new k.Tween({
          node: bubble,
          duration: 0.1,
          easing: k.Easings.EaseInOut,
          scaleX: 1,
          scaleY: 1,
          offsetX: 0,
          offsetY: 0,
        }).play();
      }
    });
  });

  onMount(() => {
    const stage = new k.Stage({
      container: container,
      width: dim,
      height: dim,
    });
    bubbles = drawBubbles({
      mouseover: (id) => setSelectedTech(id),
      mouseleave: () => setSelectedTech(''),
    });

    stage.add(radarLayer);
    stage.add(bubblesLayer);
    setTimeout(() => bubbleAnimation.play(), 1400);
  });
</script>

<div bind:this={container} />
