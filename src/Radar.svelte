<script lang="ts">
  import { default as k } from 'Konva';
  import { onMount } from 'svelte';
  import {
    bubblesLayer,
    dim,
    fadeInBubbleLayer,
    hideBubbleLayer,
    radarLayer,
  } from './canvas';
  import { techs as dummyTechs } from './canvas/techData';
  import {
    drawBubble,
    highlightBubble,
    resetBubble,
    unHighlightBubble,
  } from './canvas/bubble';
  import { drawLabel, highlightLabel, unHighlightLabel } from './canvas/label';
  import {
    selectedTechStore,
    setSelectedTech,
  } from './store/selectedTechStore';
  import { techId, techsStore, type Tech, setTechs } from './store/techsStore';

  let container: HTMLDivElement | null = null;
  let bubbles: k.Rect[] = [];
  let labels: k.Label[] = [];

  onMount(() => {
    stage = new k.Stage({
      container: container,
      width: dim,
      height: dim,
    });
    setTechs(dummyTechs);
  });

  selectedTechStore.subscribe((selectedTechId) => {
    bubbles.forEach((bubble) => {
      if (bubble.id() === selectedTechId) {
        highlightBubble(bubble);
      } else if (!selectedTechId) {
        resetBubble(bubble);
      } else {
        unHighlightBubble(bubble);
      }
    });
    labels.forEach((label) => {
      if (label.id() === selectedTechId) {
        highlightLabel(label);
      } else {
        unHighlightLabel(label);
      }
    });
  });

  let stage: k.Stage;

  techsStore.subscribe((techs) => {
    if (!stage) return;
    hideBubbleLayer();
    bubblesLayer.destroy();
    stage.add(radarLayer);
    stage.add(bubblesLayer);
    buildBubblesWithLabels(techs);
    setTimeout(fadeInBubbleLayer, 500);
  });

  function buildBubblesWithLabels(techs: Tech[]) {
    const newBubbles: k.Rect[] = [];
    const newLabels: k.Label[] = [];
    techs.forEach((tech) => {
      const bubble = drawBubble({
        distanceFromCenter: tech.val,
        quarter: tech.quarter as 0 | 1 | 2 | 3,
        layer: bubblesLayer,
        mouseover: (id) => setSelectedTech(id),
        mouseleave: () => setSelectedTech(''),
        id: techId(tech),
      });
      const label = drawLabel({
        layer: bubblesLayer,
        x: bubble.x(),
        y: bubble.y() + bubble.height() / 2,
        xOffset: bubble.width() * 1.5,
        text: tech.name,
        id: techId(tech),
      });
      newBubbles.push(bubble);
      newLabels.push(label);
    });
    bubbles = newBubbles;
    labels = newLabels;
  }
</script>

<div
  class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
  bind:this={container}
/>
