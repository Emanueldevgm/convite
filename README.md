# Convite — Julieta & Altino

Convite de alambamento virtual interativo, em **React + Vite + Tailwind CSS**,
com animações suaves, pétalas flutuantes, parallax, smooth scroll e consulta
de convite por nome com métricas anti-fraude.

---

## 📋 Pré-requisitos

Antes de clonar, garante que tens instalado:

| Ferramenta | Versão mínima | Como verificar |
|---|---|---|
| **Node.js** | 18.x ou superior | `node -v` |
| **npm** | 9.x ou superior | `npm -v` |
| **Git** | Qualquer versão recente | `git --version` |

Se não tiveres o Node.js, descarrega em **https://nodejs.org** (versão LTS).

---

## 🚀 Como clonar e rodar

### 1. Clonar o repositório

```bash
git clone https://github.com/Emanueldevgm/convite.git
```

### 2. Entrar na pasta do projeto

```bash
cd convite
```

### 3. Instalar as dependências

```bash
npm install
```

> A primeira instalação demora 1–2 minutos. Vai criar a pasta `node_modules/`.

### 4. Arrancar o servidor de desenvolvimento

```bash
npm run dev
```

O terminal mostra algo como:

```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Abre **http://localhost:5173** no navegador. O site atualiza-se
automaticamente sempre que guardares um ficheiro.

---

## 🏗️ Gerar a versão de produção

Para criar a pasta `dist/` (pronta a publicar em Vercel, Netlify, GitHub
Pages, etc.):

```bash
npm run build
```

Depois, para pré-visualizar o resultado localmente:

```bash
npm run preview
```

---

## 📜 Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Pré-visualiza o build de produção localmente |

---

## 🛠️ Stack técnica

| Tecnologia | Versão | Função |
|---|---|---|
| **React** | 18.3 | Biblioteca de UI |
| **Vite** | 5.3 | Bundler e dev server |
| **Tailwind CSS** | 3.4 | Estilos utilitários |
| **Motion** (Framer Motion) | 14 | Animações de entrada e interação |
| **Lenis** | 1.3 | Smooth scroll |
| **react-scroll-parallax** | 3.5 | Efeito parallax |
| **partycles** | 1.2 | Pétalas e confetes |

---

## ✏️ Personalizar o conteúdo

### Textos, datas e nomes

Quase todo o texto (nomes dos noivos, data, horários, cronograma, presentes,
informações extra, mensagem final) está centralizado em:

```
src/data.js
```

Edita esse ficheiro e o site atualiza-se automaticamente com o hot-reload.

### Lista de convidados

A lista vive em `src/data.js`, no export `guestLookup`:

```js
export const guestLookup = [
  { name: 'Casal António Gabriel', table: 'Economia' },
  { name: 'Casal Augusto António', table: 'Economia' },
  // ...
]
```

**Para adicionar um convidado**, acrescenta uma linha com `name` e `table`.
**Para remover**, apaga a linha. **Para editar**, muda o texto — a busca
normaliza acentos automaticamente, por isso `António` e `Antonio` são
equivalentes.

### Fotografia do casal

Substitui o ficheiro:

```
public/assets/casal.jpg
```

Mantém o mesmo nome para não teres de alterar código. É usada na capa
(`Cover.jsx`) e no fecho (`Closing.jsx`).

### Música de fundo

Substitui o ficheiro:

```
public/Dedicatória Altino Cândido Luís - Projecto Soba Produções (2026).mp3
```

Se mudares o nome, atualiza também em `src/data.js`, no campo `music.src`.

O player toca **60 segundos** e para sozinho, mesmo que o ficheiro seja
mais longo (ver `src/components/MusicPlayer.jsx`).

### QR Code dos presentes

O QR é gerado automaticamente a partir de `gifts.qrValue` (em
`src/data.js`), usando a API pública `api.qrserver.com`. Muda esse valor
para o teu IBAN, link de contribuição, ou mensagem.

---

## 🔍 Consulta do convite (GuestLookup)

O componente `src/components/GuestLookup.jsx` permite que um convidado
escreva o nome e receba um modal com **local, mesa, horário, data,
endereço, dress code e observações**, com link direto para o Google Maps.

### Métricas anti-fraude aplicadas

- **Match obrigatório** de todas as palavras significativas do nome
- **Tolerância a gralhas** via Levenshtein (limiar mínimo 0.82)
- **Detecção de ambiguidade** — se dois convites empatarem, pede mais dados
- **Penalização de palavras extra** — evita adivinhar com nome genérico
- **Atraso de 350 ms** por consulta, para dificultar força bruta

### Exemplos de comportamento

| O que escreves | Resultado |
|---|---|
| `António Gabriel` | ✅ Abre modal (Mesa Economia) |
| `Gabril` (gralha) | ✅ Abre modal (similaridade) |
| `António` sozinho | ❌ Bloqueado (ambíguo) |
| `António Gabriel xyz` | ❌ Bloqueado (palavras extra) |
| `Mau-Mau` | ✅ Abre modal |

### ⚠️ Limitação de segurança

Como o site é **estático**, a lista viaja no bundle JS. Um utilizador com
conhecimentos de DevTools consegue lê-la. As métricas acima impedem
adivinhação às cegas, mas **não** garantem privacidade total.

Para privacidade real, seria necessário mover a validação para um backend
(Node/Express, Supabase, Google Apps Script, etc.).

---

## 🎬 Animações e efeitos

O projeto usa quatro bibliotecas complementares:

| Biblioteca | Onde é usada |
|---|---|
| **motion** | Fade-up, stagger e scale-in nas secções |
| **partycles** | Pétalas no Cover e no modal, confetes no RSVP |
| **react-scroll-parallax** | Parallax na foto final (Closing) |
| **lenis** | Smooth scroll global, com stop/start no modal |

Os variants do Motion estão centralizados em `src/hooks/useAnimations.js`.
O hook de scroll está em `src/hooks/useLenis.js`.

O componente `AnimateInView.jsx` é um wrapper reutilizável que aplica
animações quando o elemento entra em vista (`whileInView`).

---

## 📁 Estrutura do projeto

```
convite/
├── public/
│   ├── assets/
│   │   ├── casal.jpg                    Foto do casal
│   │   └── leaf.svg                     Ornamento SVG
│   └── Dedicatória...mp3                Música de fundo
│
├── src/
│   ├── components/
│   │   ├── AnimateInView.jsx            Wrapper reutilizável de animações
│   │   ├── Cover.jsx                    Secção 1 — capa + foto + player
│   │   ├── MusicPlayer.jsx              Player de áudio limitado a 60s
│   │   ├── EventDetails.jsx             Cerimónia & Copo-d'Água
│   │   ├── Timeline.jsx                 Cronograma do dia
│   │   ├── Gifts.jsx                    Lista de presentes + QR code
│   │   ├── GuestLookup.jsx              Consulta do convite + modal
│   │   ├── RSVP.jsx                     Formulário de confirmação
│   │   ├── ExtraInfo.jsx                Acomodação, transporte, contactos
│   │   ├── Closing.jsx                  Citação final + foto com parallax
│   │   ├── SectionHeading.jsx           Título de secção reutilizável
│   │   └── Ornament.jsx                 Divisores decorativos SVG
│   │
│   ├── hooks/
│   │   ├── useAnimations.js             Variants do Motion
│   │   └── useLenis.js                  Configuração do smooth scroll
│   │
│   ├── data.js                          Todo o conteúdo editável
│   ├── theme.js                         Paleta de cores (hex + rgb)
│   ├── App.jsx                          Monta todas as secções
│   ├── main.jsx                         Entry point + ParallaxProvider
│   └── index.css                        Estilos globais + Tailwind
│
├── index.html                           HTML raiz
├── package.json                         Dependências e scripts
├── tailwind.config.js                   Configuração do Tailwind
├── postcss.config.js                    Configuração do PostCSS
├── vite.config.js                       Configuração do Vite
└── README.md                            Este ficheiro
```

---

## 🚢 Deploy na Vercel

O projeto está configurado para fazer **deploy automático** a cada
`git push` para a branch `main`.

### Primeira vez

1. Instala a integração da Vercel no GitHub: **https://github.com/apps/vercel**
2. Autoriza o acesso ao repositório `convite`
3. Vai a **https://vercel.com/new** e importa o repositório
4. A Vercel deteta Vite automaticamente — não precisas de configurar nada
5. Clica **Deploy**

### Deploys seguintes

Basta fazer push:

```bash
git add .
git commit -m "Descrição da alteração"
git push
```

A Vercel reconstrói e publica em ~1 minuto.

### Configurações de build (se pedidas)

| Campo | Valor |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## 🔄 Fluxo de trabalho com Git

Sempre que alterares algo:

```bash
git status                          # Ver o que mudou
git add .                           # Adicionar todas as alterações
git commit -m "Descrição curta"     # Fazer o commit
git push                            # Enviar para o GitHub
```

**Boa prática:** mensagens de commit descritivas, não genéricas.

- ✅ `"Removi secção Dress Code"`
- ✅ `"Adicionei pétalas no Cover"`
- ❌ `"alterações"`
- ❌ `"fix"`

---

## ❓ Problemas comuns

### `npm install` falha com erro de permissão

No Windows, abre o PowerShell como administrador e tenta de novo.

### Página em branco no `localhost:5173`

Abre a consola (F12 → Console) e vê se há erros vermelhos. Os mais comuns:

- `Cannot find module '...'` → falta instalar dependências: `npm install`
- Erro de encoding (acentos estranhos) → guarda os ficheiros em **UTF-8**
  no VS Code (canto inferior direito → Save with Encoding)

### Warnings do Vite no terminal

Se vires avisos sobre `esbuild` ou `optimizeDeps.rollupOptions`, são
deprecations do Vite 8. Não afetam o site. Se incomodarem, confirma que
estás em **Vite 5.3.1** (pinado no `package.json`).

### `npm audit` mostra vulnerabilidades

Todas vivem em ferramentas de desenvolvimento (Tailwind, Vite) e **não
vão para o bundle final**. O site em produção não é afetado.

**Não corras `npm audit fix --force`** — vai subir o Tailwind para v4 e o
Vite para v8, o que parte o projeto.

### Erro de encoding (acentos corrompidos: `SalÃ£o` em vez de `Salão`)

No VS Code:

1. Abre o ficheiro afetado
2. `Ctrl+Shift+P` → **"Reopen with Encoding"** → **Windows-1252**
3. `Ctrl+Shift+P` → **"Save with Encoding"** → **UTF-8**

---

## 📝 Formulário RSVP — ligar a um backend

O formulário em `src/components/RSVP.jsx` está pronto no front-end, mas
não envia dados para lado nenhum. Para recolher respostas de verdade,
liga o `handleSubmit` a um serviço:

- **Formspree** — `https://formspree.io`
- **Google Sheets + Apps Script** — grátis, ideal para poucos convidados
- **Airtable** — base de dados simples com API
- **Backend próprio** — Node/Express, Supabase, etc.

---

## 📄 Licença

Projeto privado, criado para o alambamento de Julieta & Altino.

---

## 👤 Autor

**Emanueldevgm** — https://github.com/Emanueldevgm