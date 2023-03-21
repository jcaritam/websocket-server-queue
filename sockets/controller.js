const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last);
  socket.emit('actual-state', ticketControl.lastFour);
  socket.emit('pending-tickets', ticketControl.tickets.length)

  socket.on('next-ticket', (_, callback) => {
    const next = ticketControl.next();
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)
    callback(next);
  });

  socket.on('attend-ticket', ({ screen }, callback) => {
    if (!screen) {
      return callback({
        ok: false,
        msg: 'screen is required',
      });
    }

    const ticket = ticketControl.attendTicket(screen);

    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)
    socket.emit('pending-tickets', ticketControl.tickets.length)
    socket.broadcast.emit('actual-state', ticketControl.lastFour)


    if (!ticket) {
      callback({ ok: false, msg: 'no pending tickets' });
    } else {
      callback({ ok: true, ticket });
    }
  });
};

module.exports = {
  socketController,
};
