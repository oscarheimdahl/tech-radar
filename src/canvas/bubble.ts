import { default as k } from 'Konva';
import { bubblesLayer, diameter, dim } from '.';

var seed = 2;
function random() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function map(
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
function quarterToAngle(quarter: 0 | 1 | 2 | 3) {
  return quarter * 90;
}
const bubblePositions: { x: number; y: number }[] = [];
export function drawBubble({
  distanceFromCenter,
  quarter,
  layer,
  mouseover,
  mouseleave,
  id,
}: {
  distanceFromCenter: number;
  quarter: 0 | 1 | 2 | 3;
  id: string;
  layer: k.Layer;
  mouseover: (id: string) => void;
  mouseleave: (id: string) => void;
}) {
  const width = dim / 70;
  const QUARTER = 90;
  const distanceFromEdge = map(distanceFromCenter, 0, 99, 10, 1);

  let tries = 0;

  function findEmptySpot() {
    const maxTries = 0;
    while (true) {
      tries++;
      const angle =
        quarterToAngle(quarter) +
        random() * (QUARTER - distanceFromEdge * 2) +
        distanceFromEdge;
      const mappedR = map(
        distanceFromCenter,
        0,
        99,
        0,
        diameter / 2 - width / 2
      );

      const theta = (angle - 90) / (180 / Math.PI);
      const x = mappedR * Math.cos(theta);
      const y = mappedR * Math.sin(theta);

      let overlap = false;
      bubblePositions.forEach(({ x: _x, y: _y }) => {
        const distanceMultiplier = map(tries, 0, maxTries, 5, 1.5);
        if (
          Math.abs(x - _x) < width * distanceMultiplier &&
          Math.abs(y - _y) < width * distanceMultiplier
        ) {
          overlap = true;
        }
      });
      if (!overlap || tries > maxTries) return { x, y };
    }
  }
  const { x, y } = findEmptySpot();

  bubblePositions.push({ x, y });
  const bubble = new k.Rect({
    cornerRadius: 3,
    name: 'asd',
    x: x + dim / 2 - width / 2,
    y: y + dim / 2 - width / 2,
    width: width,
    height: width,
    fill: '#444444',
    id: id,
  });

  bubble.on('mouseover', () => mouseover(id));
  bubble.on('mouseleave', () => mouseleave(id));

  layer.add(bubble);
  return bubble;
}
export function highlightBubble(bubble: k.Rect) {
  new k.Tween({
    node: bubble,
    duration: 0.1,
    easing: k.Easings.EaseInOut,
  }).play();
  bubble.zIndex(bubblesLayer.children.length - 1);
}
export function unHighlightBubble(bubble: k.Rect) {
  bubble.strokeWidth(2);
  new k.Tween({
    node: bubble,
    duration: 0.1,
    easing: k.Easings.EaseInOut,
    opacity: 0.5,
  }).play();
}

export function resetBubble(bubble: k.Rect) {
  bubble.strokeWidth(2);
  new k.Tween({
    node: bubble,
    duration: 0.1,
    easing: k.Easings.EaseInOut,
    opacity: 1,
  }).play();
}
