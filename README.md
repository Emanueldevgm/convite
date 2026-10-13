# Convite — Julieta & Altino

Convite de alambamento virtual interativo, em React + Vite + Tailwind CSS.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Para gerar a versão de produção (pasta `dist/`, pronta para publicar em
qualquer hospedagem estática — Vercel, Netlify, GitHub Pages, etc.):

```bash
npm run build
npm run preview   # para pré-visualizar o build
```

## Personalizar o conteúdo

Quase todo o texto (nomes, data, horários, cronograma, dress code,
informações extra, mensagem final) está centralizado em:

```
src/data.js
```

Edita esse ficheiro e o site atualiza-se automaticamente.

## Áudio da música (player de 1 minuto)

Coloca o ficheiro de música em:

```
public/assets/musica.mp3
```

O player já está programado para tocar exatamente 60 segundos e parar
sozinho, mesmo que o ficheiro seja mais longo (ver
`src/components/MusicPlayer.jsx`).

## Fotografia do casal

A fotografia usada na capa e no fecho está em `public/assets/casal.jpg`.
Substitui por outra imagem com o mesmo nome, ou muda o caminho em
`Cover.jsx` e `Closing.jsx`.

## Formulário de confirmação (RSVP)

O formulário em `src/components/RSVP.jsx` está pronto no front-end, mas
ainda não envia os dados para lado nenhum — é só front-end. Para
recolher as respostas de verdade, liga o `handleSubmit` a um serviço
como Formspree, Google Sheets (via Apps Script), Airtable ou um
backend próprio.

## QR Code da lista de presentes

O QR Code é gerado automaticamente a partir do texto em
`gifts.qrValue` (em `src/data.js`), usando a API pública
`api.qrserver.com`. Muda esse valor para o teu link de contribuição,


## Estrutura

```
src/
  components/
    Cover.jsx          Secção 1 — capa, monograma, foto, player
    MusicPlayer.jsx     Player de áudio limitado a 60s
    EventDetails.jsx    Cerimónia & Copo-d'Água
    Timeline.jsx        Cronograma do dia
    DressCode.jsx       Paleta de cores recomendada
    Gifts.jsx           Lista de presentes + QR code
    RSVP.jsx            Formulário de confirmação de presença
    ExtraInfo.jsx        Acomodação, transporte, redes sociais
    Closing.jsx          Citação final + foto de encerramento
    SectionHeading.jsx   Título de secção reutilizável
    Ornament.jsx         Divisores decorativos em SVG
  data.js               Todo o conteúdo editável do convite
  App.jsx               Monta as três secções
```
