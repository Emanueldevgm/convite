import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { startLenis, stopLenis } from '../hooks/useLenis'

const steps = [
  {
    title: 'Conheça os detalhes',
    description:
      'Consulte a data, o horário, o local e a programação do alambamento. O botão “Ver localização” abre o mapa.',
  },
  {
    title: 'Encontre o seu convite',
    description:
      'Na pesquisa, escreva o primeiro nome do marido ou o nome do casal. O convite mostra a mesa atribuída.',
  },
  {
    title: 'Apresente o QR code',
    description:
      'Mostre o QR code no telemóvel à entrada ou descarregue-o como imagem para guardar e apresentar depois.',
  },
]

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    stopLenis()
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      startLenis()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/60 px-3 py-4 [padding-bottom:calc(env(safe-area-inset-bottom)+1rem)] sm:items-center sm:px-5"
          onClick={() => setIsOpen(false)}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="relative my-0 max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-sm border border-champagne/60 bg-sand p-5 shadow-2xl shadow-black/30 [-webkit-overflow-scrolling:touch] sm:my-auto sm:p-8"
          >
            <p className="text-center text-[10px] uppercase tracking-[0.3em] text-champagne-dark sm:text-xs">
              Julieta &amp; Altino
            </p>
            <h2
              id="welcome-title"
              className="mt-2 text-center font-display text-2xl leading-tight text-bottle sm:text-3xl"
            >
              Bem-vindo ao convite digital
            </h2>
            <p className="mt-2 text-center text-sm text-charcoal/70">
              Um guia rápido para aproveitar o nosso alambamento.
            </p>

            <ol className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-champagne text-xs font-medium text-bottle">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-7 w-full rounded-sm bg-bottle px-4 py-3 text-xs uppercase tracking-widest2 text-sand transition-colors hover:bg-bottle-light"
            >
              Ver convite
            </button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
