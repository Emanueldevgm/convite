import { useEffect, useMemo, useState } from 'react'
import { useReward } from 'partycles'
import { motion, AnimatePresence } from 'motion/react'
import QRCode from 'qrcode'
import { guestLookup, eventDetails } from '../data.js'
import { stopLenis, startLenis } from '../hooks/useLenis'
import { scaleIn } from '../hooks/useAnimations'

/* ============================================================
   Normalização de texto
   ============================================================ */
const STOPWORDS = new Set([
  'casal', 'e', 'irmao', 'irma', 'sr', 'sra',
  'do', 'da', 'de', 'dos', 'das',
])

function normalizeText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(value = '') {
  const seen = new Set()
  const out = []
  for (const t of normalizeText(value).split(/[\s-]+/)) {
    if (t.length >= 2 && !STOPWORDS.has(t) && !seen.has(t)) {
      seen.add(t)
      out.push(t)
    }
  }
  return out
}

/* ============================================================
   Similaridade
   ============================================================ */
function levenshtein(a, b) {
  if (a === b) return 0
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  let prev = new Array(n + 1)
  for (let j = 0; j <= n; j++) prev[j] = j
  for (let i = 1; i <= m; i++) {
    const curr = new Array(n + 1)
    curr[0] = i
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost)
    }
    prev = curr
  }
  return prev[n]
}

function tokenSimilarity(a, b) {
  if (!a || !b) return 0
  if (a === b) return 1
  const base = 1 - levenshtein(a, b) / Math.max(a.length, b.length)
  if (a.length >= 4 && b.length >= 4 && (a.startsWith(b) || b.startsWith(a))) {
    return Math.max(base, 0.85)
  }
  return base
}

/* ============================================================
   Índice + parâmetros
   ============================================================ */
const INDEX = guestLookup.map((guest) => ({
  ...guest,
  tokens: tokenize(guest.name),
}))

const TOKEN_MIN_SIM    = 0.82
const MATCH_THRESHOLD  = 0.82
const AMBIGUITY_MARGIN = 0.05

function scoreEntry(qTokens, entry) {
  if (!qTokens.length || !entry.tokens.length) return 0

  const firstNameSimilarity = tokenSimilarity(qTokens[0], entry.tokens[0])
  if (firstNameSimilarity < TOKEN_MIN_SIM) return 0

  let sum = firstNameSimilarity
  for (const queryToken of qTokens.slice(1)) {
    let best = 0
    for (const entryToken of entry.tokens.slice(1)) {
      best = Math.max(best, tokenSimilarity(queryToken, entryToken))
    }
    if (best < TOKEN_MIN_SIM) return 0
    sum += best
  }

  return sum / qTokens.length
}

function findMatches(query) {
  const qTokens = tokenize(query)
  if (!qTokens.length) return []
  return INDEX
    .map((entry) => ({ entry, score: scoreEntry(qTokens, entry) }))
    .filter((m) => m.score >= MATCH_THRESHOLD)
    .sort((a, b) => b.score - a.score)
}

/* ============================================================
   Apresentação
   ============================================================ */
function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function getCoupleName(name) {
  return /^casal\b/i.test(name) ? name : `Casal ${name}`
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-charcoal/10 pb-3">
      <span className="font-medium uppercase tracking-wide text-charcoal/60">
        {label}
      </span>
      <span className="text-right">{value}</span>
    </div>
  )
}

/* ============================================================
   Componente principal
   ============================================================ */
export default function GuestLookup() {
  const [name, setName] = useState('')
  const [guest, setGuest] = useState(null)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [qrError, setQrError] = useState('')
  const [downloadError, setDownloadError] = useState('')

  const { reward: celebrate } = useReward('guest-modal', 'petals', {
    particleCount: 40,
    physics: { gravity: 0.06, wind: 0.15 },
  })

  const canSubmit = useMemo(
    () => tokenize(name).length >= 1 && !checking,
    [name, checking],
  )

  useEffect(() => {
    if (!guest) return
    stopLenis()
    document.body.style.overflow = 'hidden'

    const t = setTimeout(() => celebrate(), 250)

    function onKey(e) {
      if (e.key === 'Escape') setGuest(null)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      startLenis()
    }
  }, [guest, celebrate])

  useEffect(() => {
    if (!guest) {
      setQrCode('')
      setQrError('')
      return
    }

    let active = true
    setDownloadError('')
    const payload = [
      'CONVITE DE ALAMBAMENTO',
      `Convidado: ${getCoupleName(guest.name)}`,
      `Mesa: ${guest.table}`,
      `Data: ${formatDate(eventDetails.date)}`,
      `Local: ${eventDetails.location}`,
    ].join('\n')

    setQrCode('')
    setQrError('')
    QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 220,
      color: { dark: '#1a2b1f', light: '#f5efe3' },
    })
      .then((dataUrl) => {
        if (active) setQrCode(dataUrl)
      })
      .catch((generationError) => {
        console.error('Não foi possível gerar o QR code do convite.', generationError)
        if (active) setQrError('Não foi possível gerar o QR code. Tente novamente.')
      })

    return () => {
      active = false
    }
  }, [guest])

  async function downloadQrCode() {
    if (!qrCode || !guest) return

    setDownloadError('')

    try {
      const qrImage = new Image()
      const imageLoaded = new Promise((resolve, reject) => {
        qrImage.onload = resolve
        qrImage.onerror = () => reject(new Error('Não foi possível carregar o QR code.'))
      })
      qrImage.src = qrCode
      await imageLoaded

      const canvas = document.createElement('canvas')
      canvas.width = 900
      canvas.height = 1200
      const context = canvas.getContext('2d')
      if (!context) throw new Error('Não foi possível preparar a imagem.')

      const drawRoundedRect = (x, y, width, height, radius) => {
        context.beginPath()
        context.moveTo(x + radius, y)
        context.lineTo(x + width - radius, y)
        context.quadraticCurveTo(x + width, y, x + width, y + radius)
        context.lineTo(x + width, y + height - radius)
        context.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius,
          y + height,
        )
        context.lineTo(x + radius, y + height)
        context.quadraticCurveTo(x, y + height, x, y + height - radius)
        context.lineTo(x, y + radius)
        context.quadraticCurveTo(x, y, x + radius, y)
        context.closePath()
      }

      context.fillStyle = '#0f1a13'
      context.fillRect(0, 0, canvas.width, canvas.height)

      drawRoundedRect(34, 34, 832, 1132, 26)
      context.fillStyle = '#f5efe3'
      context.fill()
      context.strokeStyle = '#c9a227'
      context.lineWidth = 3
      context.stroke()

      drawRoundedRect(48, 48, 804, 1104, 20)
      context.strokeStyle = 'rgba(201, 162, 39, 0.45)'
      context.lineWidth = 1
      context.stroke()

      context.fillStyle = '#1a2b1f'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = '500 22px Jost, sans-serif'
      context.fillStyle = '#8a6c20'
      context.fillText('JULIETA  &  ALTINO', canvas.width / 2, 103)

      context.fillStyle = '#1a2b1f'
      context.font = '600 34px "Playfair Display", Georgia, serif'
      context.fillText('QR CODE CONVITE DIGITAL', canvas.width / 2, 157)

      context.strokeStyle = '#c9a227'
      context.lineWidth = 2
      context.beginPath()
      context.moveTo(250, 201)
      context.lineTo(650, 201)
      context.stroke()
      context.fillStyle = '#c9a227'
      context.beginPath()
      context.arc(canvas.width / 2, 201, 5, 0, Math.PI * 2)
      context.fill()

      const coupleName = getCoupleName(guest.name)
      let nameFontSize = 42
      context.font = `600 ${nameFontSize}px "Playfair Display", Georgia, serif`
      while (context.measureText(coupleName).width > 740 && nameFontSize > 28) {
        nameFontSize -= 2
        context.font = `600 ${nameFontSize}px "Playfair Display", Georgia, serif`
      }
      context.fillStyle = '#1a2b1f'
      context.fillText(coupleName, canvas.width / 2, 253)

      drawRoundedRect(345, 285, 210, 48, 24)
      context.fillStyle = '#1a2b1f'
      context.fill()
      context.fillStyle = '#f3e9d2'
      context.font = '500 19px Jost, sans-serif'
      context.fillText(`MESA ${guest.table.toUpperCase()}`, canvas.width / 2, 309)

      drawRoundedRect(150, 354, 600, 600, 18)
      context.fillStyle = '#ffffff'
      context.fill()
      context.strokeStyle = '#e8d9b5'
      context.lineWidth = 2
      context.stroke()
      context.imageSmoothingEnabled = false
      context.drawImage(qrImage, 180, 384, 540, 540)

      context.fillStyle = '#3a3a35'
      context.font = '400 18px Jost, sans-serif'
      context.fillText('Apresente este código à entrada', canvas.width / 2, 988)

      context.strokeStyle = '#c9a227'
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(180, 1030)
      context.lineTo(720, 1030)
      context.stroke()

      context.fillStyle = '#1a2b1f'
      context.font = '600 24px "Playfair Display", Georgia, serif'
      context.fillText('ALAMBAMENTO', canvas.width / 2, 1068)
      context.fillStyle = '#3a3a35'
      context.font = '400 18px Jost, sans-serif'
      context.fillText(
        `${formatDate(eventDetails.date)}  ·  ${eventDetails.time}`,
        canvas.width / 2,
        1104,
      )
      context.font = '400 16px Jost, sans-serif'
      context.fillText(eventDetails.location, canvas.width / 2, 1134)

      const imageBlob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Não foi possível criar a imagem para download.'))
        }, 'image/png')
      })
      const imageUrl = URL.createObjectURL(imageBlob)
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `convite-digital-${normalizeText(guest.name).replace(/\s+/g, '-')}.png`
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(imageUrl), 1000)
    } catch (generationError) {
      console.error('Não foi possível baixar a imagem do convite.', generationError)
      setDownloadError('Não foi possível baixar a imagem. Tente novamente.')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit) {
      setError('Escreva pelo menos o primeiro nome completo.')
      return
    }
    setChecking(true)
    setError('')

    setTimeout(() => {
      const matches = findMatches(name)

      if (matches.length === 0) {
        setGuest(null)
        setError(
          'Convite não encontrado. Tente pesquisar pelo primeiro nome do marido ou pelo nome do casal.',
        )
      } else if (
        matches.length > 1 &&
        matches[0].score - matches[1].score < AMBIGUITY_MARGIN
      ) {
        setGuest(null)
        setError(
          'Existem vários convites parecidos. Pesquise pelo primeiro nome do marido ou escreva o nome completo do casal.',
        )
      } else {
        setGuest(matches[0].entry)
      }
      setChecking(false)
    }, 350)
  }

  function closeModal() {
    setGuest(null)
    setError('')
  }

  return (
    <div className="rounded-sm border border-bottle/25 bg-sand px-5 py-6 shadow-lg shadow-black/5">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="guest-name"
            className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60"
          >
            Nome do marido ou do casal
          </label>
          <input
            id="guest-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex: António ou António Gabriel"
            autoComplete="off"
            className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm text-charcoal outline-none placeholder:text-charcoal/30 focus:border-champagne"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-sm bg-bottle px-4 py-3 text-xs uppercase tracking-widest2 text-sand transition-colors hover:bg-bottle-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {checking ? 'A verificar…' : 'Ver meu convite'}
        </button>
      </form>

      {error && (
        <p className="mt-4 rounded-sm border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <AnimatePresence>
        {guest && (
          <motion.div
            id="guest-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-black/55 px-3 py-4 [padding-bottom:calc(env(safe-area-inset-bottom)+1rem)] sm:items-center sm:px-4"
            onClick={closeModal}
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(event) => event.stopPropagation()}
              style={{ maxHeight: 'calc(100dvh - 2rem)' }}
              className="relative my-auto w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto overscroll-contain rounded-sm border border-bottle/40 bg-sand p-4 shadow-2xl shadow-black/20 [-webkit-overflow-scrolling:touch] sm:p-6"
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Fechar detalhe do convite"
                className="absolute right-4 top-4 text-xl text-charcoal/60 transition-colors hover:text-bottle"
              >
                ×
              </button>

              <p className="pr-8 font-display text-2xl leading-tight text-bottle sm:text-3xl">
                Olá, {getCoupleName(guest.name)}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-charcoal/45">
                Convite confirmado
              </p>

              <div className="mt-4 flex flex-col items-center border-t border-charcoal/10 pt-4 text-center sm:mt-6 sm:pt-5">
                <p className="text-xs uppercase tracking-widest2 text-charcoal/60">
                  QR code individual do convite
                </p>
                {qrCode ? (
                  <>
                    <img
                      src={qrCode}
                      alt={`QR code do convite de ${getCoupleName(guest.name)}, mesa ${guest.table}`}
                      width="220"
                      height="220"
                      className="mt-3 h-36 w-36 rounded-sm bg-sand p-2 sm:h-44 sm:w-44"
                    />
                    <button
                      type="button"
                      onClick={downloadQrCode}
                      className="mt-3 w-full max-w-xs rounded-sm bg-bottle px-4 py-3 text-xs uppercase tracking-widest2 text-sand transition-colors hover:bg-bottle-light sm:mt-4 sm:w-auto"
                    >
                      Baixar QR code como imagem
                    </button>
                    {downloadError && (
                      <p role="alert" className="mt-2 text-sm text-red-700">
                        {downloadError}
                      </p>
                    )}
                  </>
                ) : (
                  <p
                    role={qrError ? 'alert' : undefined}
                    className={`mt-3 text-sm ${
                      qrError ? 'text-red-700' : 'text-charcoal/60'
                    }`}
                  >
                    {qrError || 'A gerar o QR code…'}
                  </p>
                )}
                <p className="mt-2 max-w-xs text-xs text-charcoal/55">
                  Apresente este código na entrada para identificar o seu convite e a mesa.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-3 text-sm text-charcoal/75 sm:mt-6 sm:grid-cols-2">
                <Row label="Local" value={eventDetails.location} />
                <Row label="Mesa" value={guest.table} />
                <Row label="Horário" value={eventDetails.time} />
                <Row label="Data" value={formatDate(eventDetails.date)} />
                <Row label="Endereço" value={eventDetails.address} />
                <Row label="Dress code" value={eventDetails.dressCode} />
              </div>

              <div className="mt-6 border-t border-charcoal/10 pt-4 text-center text-charcoal/60">
                <p className="text-xs uppercase tracking-widest2">Observações</p>
                <p className="mt-2 text-sm text-charcoal/70">
                  {eventDetails.notes}
                </p>
              </div>

              <div className="mt-6 text-center">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    eventDetails.mapsQuery ||
                      `${eventDetails.location} ${eventDetails.address}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-sm border border-bottle px-4 py-2 text-xs uppercase tracking-widest2 text-bottle transition-colors hover:bg-bottle hover:text-sand"
                >
                  Ver localização
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}