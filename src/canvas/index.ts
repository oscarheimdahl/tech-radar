import { default as k } from 'Konva';
const width = window.innerWidth;

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
      // stroke: '#ccc',
      strokeWidth: 1,
      innerRadius: start,
      outerRadius: end,
      angle: 90,
      rotation: quarter * 90 - 180,
      fillEnabled: true,
    });
    radarLayer.add(arc);
    return arc;
  }
  drawArc(0, radius / 4, fill + 'cc');
  drawArc(radius / 4, (radius / 4) * 2, fill + '99');
  drawArc((radius / 4) * 2, (radius / 4) * 3, fill + '66');
  drawArc((radius / 4) * 3, radius, fill + '33');
}

function drawRadar() {
  drawQuarterCircle(diameter / 2, 1, '#93C5FD');
  drawQuarterCircle(diameter / 2, 2, '#FCA5A5');
  drawQuarterCircle(diameter / 2, 3, '#FDBA74');
  drawQuarterCircle(diameter / 2, 4, '#86EFAC');
}

export function fadeInBubbleLayer() {
  new k.Tween({
    node: bubblesLayer,
    duration: 1,
    easing: k.Easings.EaseInOut,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  }).play();
}

export function hideBubbleLayer() {
  bubblesLayer.x(dim / 2);
  bubblesLayer.y(dim / 2);
  bubblesLayer.scale({ x: 0, y: 0 });
}

drawRadar();
