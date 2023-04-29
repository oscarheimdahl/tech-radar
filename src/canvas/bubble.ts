import { default as k } from 'Konva';
import { diameter, dim } from '.';

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

  let i = 0;

  function findEmptySpot() {
    while (true) {
      i++;
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
        if (Math.abs(x - _x) < width * 2 && Math.abs(y - _y) < width * 2) {
          overlap = true;
        }
      });
      if (!overlap) return { x, y };
      if (i > 20000) return { x, y };
    }
  }
  const { x, y } = findEmptySpot();
  // const color = distanceToColor(distanceFromCenter);
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

    // shadowColor: '#00000033',
    // shadowOffsetY: 2,
    // shadowBlur: 4,
    // strokeWidth: 1,
  });

  bubble.on('mouseover', () => mouseover(id));
  bubble.on('mouseleave', () => mouseleave(id));

  layer.add(bubble);
  return bubble;
}
function distanceToColor(distanceFromCenter: number) {
  if (distanceFromCenter > 75) return '#ba2d41';
  if (distanceFromCenter > 50) return '#F56D43';
  if (distanceFromCenter > 25) return '#4394C4';
  return '#74A26F';
}
