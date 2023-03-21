const path = require('path');
const fs = require('fs');

class Ticket {
  constructor(nro, screen) {
    this.nro = nro;
    this.screen = screen;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour,
    };
  }

  init() {
    const { today, tickets, last, lastFour } = require('../db/data.json');
    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.lastFour = lastFour;
    } else {
      this.saveDb();
    }
  }

  saveDb() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveDb();
    return 'Ticket ' + ticket.nro;
  }

  attendTicket(screen) {
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift();

    ticket.screen = screen;
    this.lastFour.unshift(ticket);

    if (this.lastFour.length > 4) {
      this.lastFour.splice(-1, 1);
    }
    this.saveDb();
  }
}

module.exports = TicketControl;
