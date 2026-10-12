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
  { name: 'Casal António Gabriel',  table: 'Economia' },
  { name: 'Casal Augusto António',  table: 'Economia' },
  { name: 'Alegria e Felicidade',   table: 'Estudo do Meio' },
  { name: 'Casal Costa Mazuela',    table: 'Economia' },
  { name: 'Casal Garcia Cabenga',   table: 'Pré-escolar' },
  { name: 'Bráulio e Joy',          table: 'Pré-escolar' },
  { name: 'David e Djey',           table: 'Pré-escolar' },
  { name: 'Casal Alexandre',        table: 'Literatura' },
  { name: 'Casal Esaú',             table: 'Língua Portuguesa' },
  { name: 'Casal Júlio',            table: 'Língua Portuguesa' },
  { name: 'Casal Mau-Mau',          table: 'Língua Portuguesa' },
  { name: 'Casal Blez',             table: 'Economia' },
  { name: 'Casal Mário Alberto',    table: 'Psicológica' },
  { name: 'Casal Nsimba Paulo',     table: 'Estudo do Meio' },
  { name: 'Casal António Waly',     table: 'Estudo do Meio' },
  { name: 'Casal Morais',           table: 'Estudo do Meio' },
  { name: 'Casal Bwe-Vado',         table: 'Língua Portuguesa' },
  { name: 'Casal Bizingui',         table: 'Pré-escolar' },
  { name: 'Casal Bernardo',         table: 'Estudo do Meio' },
  { name: 'Irmão Ludy',             table: 'Psicológica' },
  { name: 'Casal Santos Catúdico',  table: 'Economia' },
  { name: 'Casal Paulo Bunga',      table: 'Língua Portuguesa' },
]