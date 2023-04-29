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
  let bubbles: k.Circle[] = [];

  selectedTechStore.subscribe((selectedTechId) => {
    bubbles.forEach((bubble) => {
      if (bubble.id() === selectedTechId) {
        new k.Tween({
          node: bubble,
          duration: 0.2,
          easing: k.Easings.EaseInOut,
          scaleX: 2,
          scaleY: 2,
        }).play();
        bubble.zIndex(99);
        bubble.strokeWidth(1);
      } else {
        bubble.strokeWidth(2);
        new k.Tween({
          node: bubble,
          duration: 0.2,
          easing: k.Easings.EaseInOut,
          scaleX: 1,
          scaleY: 1,
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
