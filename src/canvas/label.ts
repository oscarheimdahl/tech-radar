import { default as k } from 'Konva';
import { bubblesLayer, dim } from '.';

export function drawLabel({
  layer,
  x,
  y,
  text,
  id,
  xOffset,
}: {
  layer: k.Layer;
  x: number;
  y: number;
  text: string;
  id: string;
  xOffset: number;
}) {
  const mirror = x + 200 > dim;
  const labelLeft = new k.Label({
    x: mirror ? x - xOffset / 2 : x + xOffset,
    y: y,
    id: id,
    scaleX: 0,
    scaleY: 0,
  });

  labelLeft.add(
    new k.Tag({
      fill: '#444',
      lineJoin: 'miter',
      cornerRadius: 8,
      pointerDirection: mirror ? 'right' : 'left',
      pointerWidth: 4,
      pointerHeight: 8,
    })
  );

  labelLeft.add(
    new k.Text({
      text: text,
      fontFamily: 'sans-serif',
      fontSize: 14,
      padding: 5,
      fill: 'white',
    })
  );

  layer.add(labelLeft);
  return labelLeft;
}

export function highlightLabel(label: k.Label) {
  new k.Tween({
    node: label,
    duration: 0.1,
    easing: k.Easings.EaseInOut,
    scaleX: 1,
    scaleY: 1,
  }).play();
  label.zIndex(bubblesLayer.children.length - 1);
}
export function unHighlightLabel(label: k.Label) {
  new k.Tween({
    node: label,
    duration: 0.1,
    easing: k.Easings.EaseInOut,
    scaleX: 0,
    scaleY: 0,
  }).play();
}
