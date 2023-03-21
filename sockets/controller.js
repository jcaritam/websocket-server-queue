const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last);

  socket.on('next-ticket', (_, callback) => {
    const next = ticketControl.next();
    callback(next);
  });
};

module.exports = {
  socketController,
};
