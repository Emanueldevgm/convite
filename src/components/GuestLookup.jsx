import { useEffect, useMemo, useState } from 'react'
import { useReward } from 'partycles'
import { motion, AnimatePresence } from 'motion/react'
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
  let sum = 0
  for (const et of entry.tokens) {
    let best = 0
    for (const qt of qTokens) {
      const s = tokenSimilarity(qt, et)
      if (s > best) best = s
    }
    if (best < TOKEN_MIN_SIM) return 0
    sum += best
  }
  const avg = sum / entry.tokens.length
  const extra = Math.max(0, qTokens.length - entry.tokens.length)
  const penalty = Math.min(0.45, extra * 0.15)
  return Math.max(0, avg - penalty)
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
  const [partnerName, setPartnerName] = useState('')
  const [guest, setGuest] = useState(null)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  const { reward: celebrate } = useReward('guest-modal', 'petals', {
    particleCount: 40,
    physics: { gravity: 0.06, wind: 0.15 },
  })

  const combined = [name, partnerName].filter(Boolean).join(' ')

  const canSubmit = useMemo(
    () => tokenize(combined).length >= 1 && !checking,
    [combined, checking],
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

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit) {
      setError('Escreva pelo menos o primeiro nome completo.')
      return
    }
    setChecking(true)
    setError('')

    setTimeout(() => {
      const matches = findMatches(combined)

      if (matches.length === 0) {
        setGuest(null)
        setError(
          'Convite não encontrado. Escreva o nome tal como consta no convite (nome + cônjuge, se aplicável).',
        )
      } else if (
        matches.length > 1 &&
        matches[0].score - matches[1].score < AMBIGUITY_MARGIN
      ) {
        setGuest(null)
        setError(
          'Existem vários convites parecidos. Seja mais específico — inclua o nome completo e o nome do(a) cônjuge.',
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
            Nome completo
          </label>
          <input
            id="guest-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex: António Gabriel"
            autoComplete="off"
            className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm text-charcoal outline-none placeholder:text-charcoal/30 focus:border-champagne"
          />
        </div>

        <div>
          <label
            htmlFor="guest-partner"
            className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60"
          >
            Nome do(a) cônjuge{' '}
            <span className="text-charcoal/30">(opcional)</span>
          </label>
          <input
            id="guest-partner"
            type="text"
            value={partnerName}
            onChange={(event) => setPartnerName(event.target.value)}
            placeholder="Ex: Joy"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4"
            onClick={closeModal}
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-lg rounded-sm border border-bottle/40 bg-sand p-6 shadow-2xl shadow-black/20"
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Fechar detalhe do convite"
                className="absolute right-4 top-4 text-xl text-charcoal/60 transition-colors hover:text-bottle"
              >
                ×
              </button>

              <p className="pr-8 font-display text-3xl text-bottle">
                Olá, {guest.name}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-charcoal/45">
                Convite confirmado
              </p>

              <div className="mt-6 space-y-4 text-sm text-charcoal/75">
                <Row label="Local"      value={eventDetails.location} />
                <Row label="Mesa"       value={guest.table} />
                <Row label="Horário"    value={eventDetails.time} />
                <Row label="Data"       value={formatDate(eventDetails.date)} />
                <Row label="Endereço"   value={eventDetails.address} />
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