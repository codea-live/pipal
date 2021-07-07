$(async () => {
  function loadTheme() {
    const defaultTheme = 'DARK'
    themeSelect.value = localStorage.getItem('theme') ?? defaultTheme;

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