import { useMemo, useState } from 'react'
import { useReward } from 'partycles'
import { motion } from 'motion/react'
import { rsvpDeadline } from '../data.js'
import { fadeUp, scaleIn, viewport } from '../hooks/useAnimations'

const formattedDeadline = new Date(`${rsvpDeadline}T00:00:00`).toLocaleDateString(
  'pt-PT',
  { day: '2-digit', month: 'long', year: 'numeric' },
)

export default function RSVP() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState(1)
  const [attending, setAttending] = useState('sim')
  const [status, setStatus] = useState('idle')

  const { reward: confetti } = useReward('rsvp-success', 'confetti', {
    particleCount: 80,
    spread: 120,
    startVelocity: 40,
  })

  const isValid = useMemo(() => name.trim().length > 1, [name])

  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid) return
    setStatus('sent')
    setTimeout(() => confetti(), 250)
  }

  if (status === 'sent') {
    return (
      <div id="rsvp-success">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="hairline rounded-sm bg-sand px-6 py-10 text-center"
        >
          <p className="font-display text-2xl italic text-bottle">
            Obrigado, {name}!
          </p>
          <p className="mt-2 text-sm text-charcoal/70">
            {attending === 'sim'
              ? 'A vossa presença foi confirmada com muito carinho.'
              : 'Lamentamos que não possam estar connosco, mas agradecemos por avisar.'}
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      onSubmit={handleSubmit}
      className="hairline space-y-5 rounded-sm bg-sand px-6 py-8"
    >
      <div className="text-center">
        <p className="font-display text-2xl text-bottle">Confirmar Presença</p>
        <p className="mt-1 text-xs uppercase tracking-widest2 text-champagne-dark">
          Até {formattedDeadline}
        </p>
      </div>

      <div>
        <label
          htmlFor="rsvp-name"
          className="mb-1 block text-xs uppercase tracking-wide text-charcoal/60"
        >
          Nome completo
        </label>
        <input
          id="rsvp-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="O vosso nome"
          className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm text-charcoal outline-none placeholder:text-charcoal/30 focus:border-champagne"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor="rsvp-guests"
          className="text-xs uppercase tracking-wide text-charcoal/60"
        >
          Número de convidados
        </label>
        <input
          id="rsvp-guests"
          type="number"
          min={1}
          max={10}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-16 border-b border-charcoal/20 bg-transparent py-2 text-center text-sm outline-none focus:border-champagne"
        />
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-charcoal/60">
          Vou comparecer
        </p>
        <div className="flex gap-3">
          {[
            { value: 'sim', label: 'Sim, estarei lá' },
            { value: 'nao', label: 'Não poderei ir' },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAttending(option.value)}
              aria-pressed={attending === option.value}
              className={`flex-1 rounded-sm border px-3 py-2 text-xs transition-colors ${
                attending === option.value
                  ? 'border-bottle bg-bottle text-sand'
                  : 'border-charcoal/20 text-charcoal/70 hover:border-champagne'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full rounded-sm bg-bottle py-3 text-xs uppercase tracking-widest2 text-sand transition-colors hover:bg-bottle-light disabled:cursor-not-allowed disabled:opacity-40"
      >
        Confirmar minha presença
      </button>
    </motion.form>
  )
}