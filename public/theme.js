// Botón

const toggleBtn =
  document.getElementById(
    'theme-toggle'
  );

// Tema guardado

const savedTheme =
  localStorage.getItem(
    'theme'
  );

// Aplicar tema guardado

if (savedTheme === 'dark') {

  document.body.classList.add(
    'dark-mode'
  );

  toggleBtn.textContent = '☀️';
}

// Evento toggle

toggleBtn.addEventListener(
  'click',
  () => {

    document.body.classList.toggle(
      'dark-mode'
    );

    // Guardar preferencia

    if (
      document.body.classList.contains(
        'dark-mode'
      )
    ) {

      localStorage.setItem(
        'theme',
        'dark'
      );

      toggleBtn.textContent = '☀️';

    } else {

      localStorage.setItem(
        'theme',
        'light'
      );

      toggleBtn.textContent = '🌙';
    }
  }
);