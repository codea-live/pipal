$(async () => {
  function loadTheme() {
    themeSelect.value = localStorage.getItem('theme') ?? 'DARK';
    changeTheme();
  }
  function changeTheme() {
    localStorage.setItem('theme', themeSelect.value);
    document
      .querySelector(':root')
      .setAttribute('theme', themeSelect.value);
  }
  
  themeSelect.oninput = changeTheme;
  loadTheme();
});
