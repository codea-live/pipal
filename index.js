$(async () => {
  const rows = $.csv.toArrays(await getCSV());
  const headers = rows.splice(0, 1)[0];

  function handleData() {
    for (const header of headers) {
      const index = headers.indexOf(header);
      updateCurrent(header, index);
      updateGraph(header, index);
    }
  }
  
  function updateCurrent(header, index) {
    const el = document.querySelector(`#${header}`);
    const lastRow = rows.slice(-1).pop();
    el.textContent = lastRow[index];
  }
  
  function updateGraph(header, index) {
    if (header === 'time') return;

    const times = rows.flatMap(r => r[0]);
    const columnData = rows.flatMap(r => +r[index]);
    console.log(columnData);

    new Chartist.Line(`#${header}Graph`,
      { labels: times, series: [columnData] },
      { fullWidth: true, chartPadding: { right: 40 }, showArea: true },
    );      
  }
  
  async function getCSV() {
    const datestamp = new Date().toISOString().slice(0, 10);
    const res = await fetch(`log/${datestamp}.csv`);
  
    return res.text();
  }

  handleData();  
});