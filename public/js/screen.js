// html references

const lblScreen = document.querySelector('h1');
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
const btnAttend = document.querySelector('button');
const lblPending = document.querySelector('#lblPending')

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('screen')) {
  window.location = 'index.html';
  throw new Error(`Screen is required`);
}

const screen = searchParams.get('screen');
lblScreen.innerText = screen;
divAlerta.style.display = 'none'

const socket = io();

socket.on('connect', () => {
  btnAttend.disabled = false;
});

socket.on('disconnect', () => {
  btnAttend.disabled = true;
});

socket.on('last-ticket', (lastTicket) => {
  // lblNewTicket.innerText = `Ticket - ${lastTicket}`;
});

socket.on('pending-tickets', (payload) => {
 if (payload === 0) {
  lblPending.style.display = 'none'
 } else {
  lblPending.style.display = ''
 }
 lblPending.innerText = payload
})
btnAttend.addEventListener('click', () => {
  socket.emit('attend-ticket', { screen }, ({ok, ticket}) => {
    
   if(!ok) {
    lblTicket.innerText = 'nobody'
      return divAlerta.style.display = ''
    }

    lblTicket.innerText = `Ticket - ${ticket.nro}`

  });
});
