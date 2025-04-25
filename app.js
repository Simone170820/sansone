// Funzione per ottenere i dati dal localStorage
function getPeople() {
  let people = JSON.parse(localStorage.getItem('people'));
  if (!people) {
    people = [];
  }
  return people;
}

// Funzione per salvare i dati delle persone nel localStorage
function savePeople(people) {
  localStorage.setItem('people', JSON.stringify(people));
}

// Funzione per generare una password casuale
function generateRandomPassword() {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

// Funzione per aggiungere una nuova persona
function addPerson(name, surname, age, phoneMother, phoneFather, emailMother, emailFather) {
  const people = getPeople();
  const generatedEmail = emailMother; // Usa l'email della madre per il login
  const generatedPassword = generateRandomPassword();

  const newPerson = {
    name,
    surname,
    age,
    phoneMother,
    phoneFather,
    emailMother,
    emailFather,
    entered: false,
    lunch: false,
    trip: false,
    email: generatedEmail, // Email usata nel login
    password: generatedPassword // Password generata
  };

  people.push(newPerson);
  savePeople(people);
  displayPeople();
}

// Funzione per mostrare la lista delle persone
function displayPeople() {
  const peopleList = document.getElementById('peopleList');
  const people = getPeople();
  peopleList.innerHTML = '';

  if (people.length === 0) {
    peopleList.innerHTML = '<tr><td colspan="4">Nessuna persona registrata.</td></tr>';
  } else {
    people.forEach((person, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td onclick="showDetails(${index})">${person.name}</td>
        <td>${person.surname}</td>
        <td>${person.age}</td>
        <td>
          <button onclick="editPerson(${index})">✏️ Modifica</button>
          <button onclick="removePerson(${index})">❌ Elimina</button>
        </td>
      `;
      peopleList.appendChild(row);
    });
  }
}

// Funzione per mostrare i dettagli della persona nel popup
function showDetails(index) {
  const people = getPeople();
  const person = people[index];

  document.getElementById('popupName').textContent = person.name;
  document.getElementById('popupSurname').textContent = person.surname;
  document.getElementById('popupAge').textContent = person.age;
  document.getElementById('popupPhoneMother').textContent = person.phoneMother;
  document.getElementById('popupPhoneFather').textContent = person.phoneFather;
  document.getElementById('popupEmailMother').textContent = person.emailMother;
  document.getElementById('popupEmailFather').textContent = person.emailFather;
  document.getElementById('popupEmail').textContent = person.email; // email per login
  document.getElementById('popupPassword').textContent = person.password; // password per login

  document.getElementById('popupDetails').style.display = 'flex';
}

// Funzione per chiudere il popup dei dettagli
function closePopupDetails() {
  document.getElementById('popupDetails').style.display = 'none';
}

// Funzione per rimuovere una persona
function removePerson(index) {
  const people = getPeople();
  people.splice(index, 1);
  savePeople(people);
  displayPeople();
}

// Gestione del form di aggiunta
document.getElementById('addPersonForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const age = document.getElementById('age').value;
  const phoneMother = document.getElementById('phoneMother').value;
  const phoneFather = document.getElementById('phoneFather').value;
  const emailMother = document.getElementById('emailMother').value;
  const emailFather = document.getElementById('emailFather').value;

  addPerson(name, surname, age, phoneMother, phoneFather, emailMother, emailFather);

  alert('Persona aggiunta con successo!');
  document.getElementById('addPersonForm').reset();
  document.getElementById('popup').style.display = 'none';
});

// Mostra popup per aggiunta persona
document.getElementById('addButton').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'flex';
});

// Chiudi popup
document.querySelector('.popup-close').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
});

// Carica e mostra le persone all'avvio
displayPeople();
