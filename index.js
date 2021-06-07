$(async () => {
  let headers = rows = [];

  async function updateData() {
    const arrays = $.csv.toArrays(await getCSV());

    const isMultiple = (_, index) => index % timeScale.value === 0;

    headers = arrays.splice(0, 1)[0];
    rows = arrays.filter(isMultiple).slice(0, 12);

    for (const header of headers) {
      const index = headers.indexOf(header);
      updateCurrent(header, index);
      updateGraph(header, index);
    }
  }  
  async function getCSV() {
    const res = await fetch(`log.csv`);
    return res.text();
  }
  
  function updateCurrent(header, index) {
    const el = document.querySelector(`#${header}`);
    const lastRow = rows.slice(-1).pop();
    el.textContent = lastRow[index];
  }
  
  function updateGraph(header, index) {
    const hhMM = t => t.slice(t.length - 8, t.length - 3);
    const times = rows.flatMap(r => r[0]).map(hhMM);
    const columnData = rows.flatMap(r => +r[index]);

    new Chartist.Line(`#${header}Graph`,
      { labels: times, series: [columnData] },
      {
        low: 0,
        high: 100,
        fullWidth: true,
        chartPadding: { right: 40 },
        showArea: true,
      },
    );      
  }

  timeScale.oninput = updateData;
  await updateData();  
});