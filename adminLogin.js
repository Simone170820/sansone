// adminLogin.js
document.getElementById('adminLoginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
  
    // Qui puoi sostituire con il tuo metodo di verifica (es: lista admin nel localStorage)
    const adminEmail = 'admin@oratorio.com';
    const adminPassword = 'admin123';
  
    if (email === adminEmail && password === adminPassword) {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      window.location.href = 'home.html'; // pagina riservata
    } else {
      document.getElementById('adminLoginError').style.display = 'block';
    }
  });
  