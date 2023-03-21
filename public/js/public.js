const lblTicket1 = document.querySelector('#lblTicket1')
const lblScreen1 = document.querySelector('#lblScreen1')

const lblTicket2 = document.querySelector('#lblTicket2')
const lblScreen2 = document.querySelector('#lblScreen2')

const lblTicket3 = document.querySelector('#lblTicket3')
const lblScreen3 = document.querySelector('#lblScreen3')

const lblTicket4 = document.querySelector('#lblTicket4')
const lblScreen4 = document.querySelector('#lblScreen4')

const socket = io();

socket.on('actual-state', (payload) => {
 const audio = new Audio('../audio/new-ticket.mp3')

 navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
   console.log({ stream })
   audio.play()
  })
  .catch(err => {
   console.log({ err })
  })

 const [ticket1, ticket2, ticket3, ticket4] = payload
 if (ticket1) {
  lblTicket1.innerText = `Ticket - ${ticket1.nro}`
  lblScreen1.innerText = ticket1.screen
 }

 if (ticket2) {
  lblTicket2.innerText = `Ticket - ${ticket2.nro}`
  lblScreen2.innerText = ticket2.screen
 }

 if (ticket3) {
  lblTicket3.innerText = `Ticket - ${ticket3.nro}`
  lblScreen3.innerText = ticket3.screen
 }

 if (ticket4) {
  lblTicket4.innerText = `Ticket - ${ticket4.nro}`
  lblScreen4.innerText = ticket4.screen
 }
})
