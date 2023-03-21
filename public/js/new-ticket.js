const lblNewTicket = document.querySelector('#lblNewTicket');
const btnNewTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
  btnNewTicket.disabled = false;
});

socket.on('disconnect', () => {
  btnNewTicket.disabled = true;
});

socket.on('last-ticket', (lastTicket) => {
  lblNewTicket.innerText = `Ticket - ${lastTicket}`;
});

btnNewTicket.addEventListener('click', () => {
  socket.emit('next-ticket', null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
