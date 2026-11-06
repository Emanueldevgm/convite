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
   RSVP
   ============================================================ */
export const rsvpDeadline = '2026-10-30'

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
   Informações extra
   ============================================================ */
export const extraInfo = [
  { title: 'Estacionamento', text: 'Estacionamento disponível no local.' },
  { title: 'Crianças',       text: 'Espaço reservado para os mais pequenos.' },
  { title: 'Contactos',      text: 'Em caso de dúvida, contacte os noivos.' },
]

/* ============================================================
   Fecho
   ============================================================ */
export const closingQuote = {
  text: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.',
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
  // Economia
  { name: 'António Gabriel',            table: 'Economia' },
  { name: 'Augusto António',            table: 'Economia' },
  { name: 'Costa Mazuela',              table: 'Economia' },
  { name: 'Casal Santos Cutúdico',      table: 'Economia' },
  { name: 'Casal Gabriel Men-Gabs',     table: 'Economia' },

  // Contabilidade
  { name: 'Casal Bernardo Man-B',       table: 'Contabilidade' },
  { name: 'Casal Nsimba Paulo',         table: 'Contabilidade' },
  { name: 'Casal Alegria',              table: 'Contabilidade' },
  { name: 'Casal Bleizer Panzo',        table: 'Contabilidade' },
  { name: 'Casal Morais André',         table: 'Contabilidade' },

  // Psicologia
  { name: 'Casal Paulo Bunga',          table: 'Psicologia' },
  { name: 'Casal Esau C. B. Rogério',   table: 'Psicologia' },
  { name: 'Casal Soba Lussambo',        table: 'Psicologia' },
  { name: 'Casal Hermenegildo',         table: 'Psicologia' },
  { name: 'Casal Júlio',                table: 'Psicologia' },

  // Pré-escolar
  { name: 'Casal Francisco Bizingui',   table: 'Pré-escolar' },
  { name: 'Casal Garcia Cabenga',       table: 'Pré-escolar' },
  { name: 'Casal Bráulio',              table: 'Pré-escolar' },
  { name: 'David e Joy',                table: 'Pré-escolar' },
  { name: 'Casal Mariano',              table: 'Pré-escolar' },

  // Língua Portuguesa
  { name: 'Amélia Nuria',               table: 'Língua Portuguesa' },
  { name: 'Nsimba Farmácia',            table: 'Língua Portuguesa' },
  { name: 'Casal Kitoko',               table: 'Língua Portuguesa' },
  { name: 'Casal Martins António',      table: 'Língua Portuguesa' },
  { name: 'Casal Mário Alberto',        table: 'Língua Portuguesa' },

  // Literatura
  { name: 'Casal António Waly',         table: 'Literatura' },
  { name: 'Dr. Ozileidy',               table: 'Literatura' },
  { name: 'Casal Nelfinas',             table: 'Literatura' },
  { name: 'Casal Alexandre',            table: 'Literatura' },
  { name: 'Casal Marques',              table: 'Literatura' },

  // Estudo do Meio
  { name: 'Casal Lucau Elisabeth',      table: 'Estudo do Meio' },
  { name: 'Casal Fredy-Lukombo',        table: 'Estudo do Meio' },
  { name: 'Casal Marcos-Isabel',        table: 'Estudo do Meio' },
  { name: 'Casal Panzo-Muilo',          table: 'Estudo do Meio' },
  { name: 'Casal Dredy-Metuia',         table: 'Estudo do Meio' },
  { name: 'Cesaltina',                  table: 'Estudo do Meio' },

  // Educação Física
  { name: 'Hilária',                    table: 'Educação Física' },
  { name: 'Emanuel Garcia',             table: 'Educação Física' },
  { name: 'Mateus Fernando',            table: 'Educação Física' },
]

/* ============================================================
   Mesas da festa
   ============================================================ */
export const tables = [
  { slug: 'economia',           label: 'Economia' },
  { slug: 'psicologia',         label: 'Psicologia' },
  { slug: 'contabilidade',      label: 'Contabilidade' },
  { slug: 'pre-escolar',        label: 'Pré-escolar' },
  { slug: 'estudo-do-meio',     label: 'Estudo do Meio' },
  { slug: 'lingua-portuguesa',  label: 'Língua Portuguesa' },
  { slug: 'matematica',         label: 'Matemática' },
  { slug: 'literatura',         label: 'Literatura' },
  { slug: 'informatica',        label: 'Informática' },
  { slug: 'biologia',           label: 'Biologia' },
  { slug: 'gestao',             label: 'Gestão' },
  { slug: 'educacao-laboral',   label: 'Educação Laboral' },
  { slug: 'quimica',            label: 'Química' },
  { slug: 'ensino-primario',    label: 'Ensino Primário' },
  { slug: 'anatomia',           label: 'Anatomia' },
  { slug: 'educacao-fisica',    label: 'Educação Física' },
  { slug: 'historia',           label: 'História' },
]

/* ============================================================
   Menu da festa
   ============================================================ */
export const menuFest = [
  {
    id: 'buffet-quente',
    title: 'Buffet Quente',
    items: [
      'Bacalhau com natas',
      'Arroz de Pato',
      'Estrogonofe',
      'Caldeirada de Cabrito',
      'Bagre fumado com Muteta',
      'Calulu de Peixe',
      'Jinguinga de Cabrito',
      'Peito Alto',
    ],
  },
  {
    id: 'guarnicoes',
    title: 'Guarnições',
    items: [
      'Arroz de Cenoura',
      'Feijão preto',
      'Feijão de óleo de palma',
      'Feijão de Banha',
      'Batata frita',
      'Funge de Bombo & Kuikuanga',
      'Funge de Milho',
    ],
  },
  {
    id: 'acompanhamentos-tradicionais',
    title: 'Acompanhamentos Tradicionais',
    items: [
      'Kizaca',
      'Catato',
      'Macayabo',
      'Refogado de couves',
      'Quiabo e jimboa',
      'Fumbua',
    ],
  },
  {
    id: 'saladas',
    title: 'Saladas',
    items: [
      'Mistas',
      'Salada de Grão de Bico',
      'Molho vinagrete',
    ],
  },
  {
    id: 'grelhados',
    title: 'Grelhados',
    items: [
      'Coxa grelhada',
      'Asa de frango',
      'Carne grelhada (Vaca e porco)',
      'Peixe grelhado',
    ],
  },
]