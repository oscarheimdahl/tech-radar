interface DrawTextArgs {
  data: {
    val: number;
    quarter: number;
    name: string;
  };
  mouseover: () => void;
  mouseleave: () => void;
}

export function drawText({ data, mouseover, mouseleave }: DrawTextArgs) {
  const div = document.querySelector(`.text .quarter-${data.quarter}`);
  const textRow = document.createElement('li');
  textRow.innerText = `${data.val}. ${data.name}`;
  textRow?.addEventListener('mouseover', mouseover);
  textRow?.addEventListener('mouseleave', mouseleave);
  div?.appendChild(textRow);
  return textRow;
}
