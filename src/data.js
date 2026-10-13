/* ============================================================
   Datas e noivos
   ============================================================ */
export const couple = {
  bride: 'Julieta',
  groom: 'Altino',
  parents:
    'Com a bênção dos pais dos noivos, que tornam este dia ainda mais especial.',
}

export const weddingDate = {
  iso: '2026-11-06',
  day: '6',
  displayMonth: 'Novembro',
  year: '2026',
  weekday: 'Sexta-feira',
}

/* ============================================================
   Música de fundo
   ============================================================ */
export const music = {
  src: '/Dedicatória Altino Cândido Luís - Projecto Soba Produções (2026).mp3',
  title: 'Dedicatória Altino Cândido Luís',
  artist: 'Projecto Soba Produções',
  durationLabel: '01:00',
}

/* ============================================================
   Programa
   ============================================================ */
export const events = [
  {
    title: 'Celebração',
    time: '19h30',
    venue: 'Salão das Estrelas',
    address: 'Defronte ao ISCED, Uíge',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Sal%C3%A3o+das+Estrelas%2C+defronte+ao+ISCED%2C+U%C3%ADge',
  },
]

export const timeline = [
  { icon: 'rings', time: '19h30', label: 'Início da celebração' },
]

/* ============================================================
   Presentes
   ============================================================ */
export const gifts = {
  heading: 'Presentes',
  note: 'A vossa presença é o nosso maior presente. Se desejar contribuir, use o QR abaixo.',
  qrValue: 'IBAN AO06 0000 0000 0000 0000 0',
}

/* ============================================================
   Dress code
   ============================================================ */
export const dressCode = {
  label: 'Traje formal / Elegante',
  palette: [
    { hex: '#1a2b1f', name: 'Verde' },
    { hex: '#e8d9b5', name: 'Champanhe' },
    { hex: '#f5efe3', name: 'Areia' },
  ],
}




/* ============================================================
   Consulta de convites (GuestLookup)
   ============================================================ */

   
export const eventDetails = {
  location: 'Salão das Estrelas',
  address: 'Defronte ao ISCED, Uíge',
  time: '19h30',
  date: weddingDate.iso,
  dressCode: dressCode.label,
  notes: 'Apresente este convite na entrada. Mesa atribuída conforme indicado.',
  mapsQuery: 'Salão das Estrelas, defronte ao ISCED, Uíge',
}

export const guestLookup = [
  { name: 'António Gabriel', table: 'Economia' },
  { name: 'Augusto António', table: 'Economia' },
  { name: 'Costa Mazuela', table: 'Economia' },
  { name: 'Casal Santos Cutúdico', table: 'Economia' },
  { name: 'Casal Gabriel Men-Gabs', table: 'Economia' },
  { name: 'Casal Bernardo Man-B', table: 'Contabilidade' },
  { name: 'Casal Nsimba Paulo', table: 'Contabilidade' },
  { name: 'Casal Alegria', table: 'Contabilidade' },
  { name: 'Casal Bleizer Panzo', table: 'Contabilidade' },
  { name: 'Casal Morais André', table: 'Contabilidade' },
  { name: 'Casal Paulo Bunga', table: 'Psicologia' },
  { name: 'Casal Esau C. B. Rogério', table: 'Psicologia' },
  { name: 'Casal Soba Lussambo', table: 'Psicologia' },
  { name: 'Casal Hermenegildo', table: 'Psicologia' },
  { name: 'Casal Júlio', table: 'Psicologia' },
  { name: 'Casal Francisco Bizingui', table: 'Pré-escolar' },
  { name: 'Casal Garcia Cabenga', table: 'Pré-escolar' },
  { name: 'Casal Bráulio', table: 'Pré-escolar' },
  { name: 'David e Joy', table: 'Pré-escolar' },
]