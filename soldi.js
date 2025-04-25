// Funzione per ottenere i ragazzi dal localStorage
function getChildren() {
    return JSON.parse(localStorage.getItem('children')) || [];
  }
  
  // Funzione per salvare i ragazzi nel localStorage
  function saveChildren(children) {
    localStorage.setItem('children', JSON.stringify(children));
  }
  
  // Funzione per aggiornare il saldo di un ragazzo
  function updateBalance(index, amount) {
    const children = getChildren();
    children[index].balance += amount;
    saveChildren(children);
    displayChildren();
  }
  
  // Funzione per visualizzare la lista dei ragazzi
  function displayChildren() {
    const children = getChildren();
    const childrenList = document.getElementById('childrenList');
    childrenList.innerHTML = ''; // Pulisci la lista
  
    children.forEach((child, index) => {
      const childDiv = document.createElement('div');
      childDiv.classList.add('child');
      childDiv.innerHTML = `
        <strong>${child.name} ${child.surname}</strong><br>
        Saldo: € ${child.balance.toFixed(2)}
      `;
      childDiv.addEventListener('click', () => showPopup(index, child.name, child.surname, child.balance));
      childrenList.appendChild(childDiv);
    });
  }
  
  // Funzione per mostrare il pop-up
  function showPopup(index, name, surname, balance) {
    document.getElementById('popupName').textContent = `${name} ${surname}`;
    document.getElementById('popupModal').style.display = 'block';
  
    document.getElementById('addMoneyButton').onclick = () => {
      const amount = parseFloat(document.getElementById('amountInput').value);
      if (amount > 0) {
        updateBalance(index, amount);
        alert(`${name} ${surname} ha ricevuto € ${amount.toFixed(2)}.`);
        document.getElementById('popupModal').style.display = 'none';
      }
    };
  
    document.getElementById('removeMoneyButton').onclick = () => {
      const amount = parseFloat(document.getElementById('amountInput').value);
      if (amount > 0 && balance >= amount) {
        updateBalance(index, -amount);
        alert(`${name} ${surname} ha perso € ${amount.toFixed(2)}.`);
        document.getElementById('popupModal').style.display = 'none';
      } else {
        alert('Saldo insufficiente o importo invalido.');
      }
    };
  }
  
  // Funzione per chiudere il pop-up
  function closePopup() {
    document.getElementById('popupModal').style.display = 'none';
  }
  
  // Funzione di logout
  function logout() {
    localStorage.clear();
    window.location.href = 'login.html'; // Redirigi alla pagina di login
  }
  
  // Visualizza la lista dei ragazzi all'avvio
  document.addEventListener('DOMContentLoaded', displayChildren);
  
  // Aggiungi eventi per il pop-up
  document.querySelector('.close').addEventListener('click', closePopup);
  
  // Evento per il logout
  document.getElementById('logoutButton').addEventListener('click', logout);
  