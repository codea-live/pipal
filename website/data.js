$(async () => {
  let headers = rows = [];
  
  async function updateData() {
    const arrays = $.csv.toArrays(await getCSV());
    headers = arrays.splice(0, 1)[0];

    const maxLabels = 12;
    const isMultiple = (_, index) => index % timeScale.value === 0;

    rows = arrays
      .filter(isMultiple)
      .slice(0, maxLabels);

    for (const header of headers) {
      const index = headers.indexOf(header);
      updateCurrent(header, index);
      updateGraph(header, index);
    }
  }  
  async function getCSV() {
    const res = await fetch(`../log.csv`);
    return res.text();
  }
  
  function updateCurrent(header, index) {
    const el = document.querySelector(`#${header}`);
    el.textContent = rows[rows.length - 1][index];
  }
  
  function updateGraph(header, index) {
    const times = rows.flatMap(row => row[0].slice(9, 14));
    const columnData = rows.flatMap(row => Number(row[index]));

    new Chartist.Line(`#${header}Graph`,
      { labels: times, series: [columnData] },
      { fullWidth: true, showArea: true },
    );
  }

  timeScale.oninput = updateData;
  await updateData();  
});