document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Prendi email e password inseriti
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    // Recupera i dati delle persone (figli) dal localStorage
    const people = JSON.parse(localStorage.getItem('people')) || [];
  
    // Verifica se l'email e la password corrispondono a qualcuno
    const person = people.find(p => p.email === email && p.password === password);
  
    if (person) {
      // Se le credenziali sono corrette, salva i dettagli della persona nel sessionStorage
      sessionStorage.setItem('loggedInPerson', JSON.stringify(person));
      // Redirigi alla pagina del bambino
      window.location.href = 'childDetails.html';
    } else {
      // Mostra errore se le credenziali sono errate
      document.getElementById('loginError').style.display = 'block';
    }
  });
  