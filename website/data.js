$(async () => {
  let rows = $.csv.toArrays(await getCSV());
  const headers = rows.splice(0, 1)[0];

  const maxLabels = 12;
  const isMultiple = (_, index) => index % maxLabels === 0;

  rows = rows
    .filter(isMultiple)
    .slice(-maxLabels);

  for (let column = 0; column < headers.length; column++)
    updateData(column);

  async function getCSV() {
    const res = await fetch('log.csv');
    return res.text();
  }
  function updateData(column) {
    const name = headers[column];
    const row = rows.length - 1;
  
    const el = document.querySelector(`#${name}`);
    el.textContent = rows[row][column];
  
    const times = rows.flatMap(r => r[0]);
    const columnData = rows.flatMap(r => Number(r[column]));
  
    new Chartist.Line(`#${name}Graph`, {
      labels: times,
      series: [columnData],
    });
  }
});
