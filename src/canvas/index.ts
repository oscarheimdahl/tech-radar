import { default as k } from 'Konva';
import { drawBubble } from './bubble';
import { drawText } from './text';
import { techId, techs } from './techData';
const width = window.innerWidth;
const height = window.innerHeight;

export const dim = Math.min(width, 800);
export const diameter = dim - 20;

export const radarLayer = new k.Layer();
export const bubblesLayer = new k.Layer();

function drawOutlineCircle(radius) {
  const outlineCircle = new k.Circle({
    x: dim / 2,
    y: dim / 2,
    width: radius,
    fill: 'transparent',
    stroke: 'black',
    strokeWidth: 1,
    listening: false,
  });

  radarLayer.add(outlineCircle);
  return outlineCircle;
}
function drawQuarterCircle(
  radius: number,
  quarter: 1 | 2 | 3 | 4,
  fill: string
) {
  function drawArc(start: number, end: number, fill: string) {
    const arc = new k.Arc({
      x: dim / 2,
      y: dim / 2,
      fill: fill,
      stroke: '#ccc',
      strokeWidth: 1,
      innerRadius: start,
      outerRadius: end,
      angle: 90,
      rotation: quarter * 90 - 180,
      fillEnabled: true,
    });
    // arc.on('mouseover', function () {
    //   arc.fill('#eee');
    // });
    // arc.on('mouseout', function () {
    //   arc.fill(fill);
    // });
    radarLayer.add(arc);
  }
  drawArc(0, radius / 4, fill + '66');
  drawArc(radius / 4, (radius / 4) * 2, fill + '44');
  drawArc((radius / 4) * 2, (radius / 4) * 3, fill + '22');
  drawArc((radius / 4) * 3, radius, fill + '11');
}

function drawRadar() {
  drawQuarterCircle(diameter / 2, 1, '#ff4400');
  drawQuarterCircle(diameter / 2, 2, '#0044ff');
  drawQuarterCircle(diameter / 2, 3, '#ff4444');
  drawQuarterCircle(diameter / 2, 4, '#67b588');

  // drawOutlineCircle(diameter);
  // drawOutlineCircle(diameter / 4);
  // drawOutlineCircle((diameter / 4) * 2);
  // drawOutlineCircle((diameter / 4) * 3);
}

bubblesLayer.x(dim / 2);
bubblesLayer.y(dim / 2);
bubblesLayer.scale({ x: 0, y: 0 });
export const bubbleAnimation = new k.Tween({
  node: bubblesLayer,
  duration: 1,
  easing: k.Easings.EaseInOut,
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
});
const sortedTech = techs.sort((a, b) => a.val - b.val);

export function drawBubbles({
  mouseover,
  mouseleave,
}: {
  mouseover: (id: string) => void;
  mouseleave: (id: string) => void;
}) {
  const bubbles = sortedTech.map((tech) => {
    const bubble = drawBubble({
      distanceFromCenter: tech.val,
      quarter: tech.quarter as 0 | 1 | 2 | 3,
      layer: bubblesLayer,
      mouseover,
      mouseleave,
      id: techId(tech),
    });
    return bubble;
  });
  return bubbles;
}

drawRadar();
// drawText();
