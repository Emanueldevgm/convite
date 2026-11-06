import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { tables, menuFest, couple, weddingDate } from '../data.js'
import { CornerLeaves } from '../components/Ornament.jsx'
import MesaBadge from '../components/MesaBadge.jsx'
import MenuSection from '../components/MenuSection.jsx'
import DishCard from '../components/DishCard.jsx'
import MenuIntro from '../components/MenuIntro.jsx'

// Pratos em destaque (cards no final)
const featuredDishes = [
  {
    name: 'Bacalhau com natas',
    category: 'Buffet Quente',
    tag: 'Clássico',
    description:
      'Bacalhau desfiado, batata em rodelas e natas gratinadas no forno.',
  },
  {
    name: 'Caldeirada de Cabrito',
    category: 'Buffet Quente',
    tag: 'Especialidade',
    description:
      'Cabrito cozinhado lentamente com especiarias e legumes da terra.',
  },
  {
    name: 'Bagre fumado com Muteta',
    category: 'Buffet Quente',
    tag: 'Tradicional',
    description:
      'Peixe fumado acompanhado de muteta, um prato de raiz angolana.',
  },
  {
    name: 'Jinguinga de Cabrito',
    category: 'Buffet Quente',
    tag: 'Tradicional',
    description:
      'Cabrito estufado no próprio sangue com cebola e especiarias.',
  },
  {
    name: 'Funge de Bombo & Kuikuanga',
    category: 'Guarnições',
    tag: 'Acompanhamento',
    description:
      'Funge tradicional preparado com bombo, servido com kuikuanga.',
  },
  {
    name: 'Grelhados Mistos',
    category: 'Grelhados',
    tag: 'Da Brasa',
    description:
      'Coxa, asa, carne de vaca e porco, e peixe — tudo na brasa.',
  },
]

export default function Menu() {
  const [params] = useSearchParams()
  const mesaSlug = params.get('mesa')
  const [introDone, setIntroDone] = useState(false)

  const tableLabel = useMemo(() => {
    if (!mesaSlug) return null
    const found = tables.find((t) => t.slug === mesaSlug.toLowerCase())
    return found?.label || null
  }, [mesaSlug])

  useEffect(() => {
    document.title = tableLabel
      ? `Menu — Mesa ${tableLabel} | ${couple.bride} & ${couple.groom}`
      : `Menu | ${couple.bride} & ${couple.groom}`
  }, [tableLabel])

  return (
    <>
      <MenuIntro onComplete={() => setIntroDone(true)} />

      {/* O conteúdo só é renderizado depois da intro — evita animações a correr em segundo plano */}
      {introDone && (
        <main className="relative mx-auto max-w-md overflow-hidden bg-sand px-5 py-14 sm:px-6">
          <CornerLeaves className="left-4 top-6" />
          <CornerLeaves className="right-4 top-6 -scale-x-100" />

          <MesaBadge tableLabel={tableLabel} />

          {/* Secções do menu */}
          <div className="mt-12 space-y-8">
            {menuFest.map((section) => (
              <MenuSection
                key={section.id}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>

          {/* Cards dos pratos em destaque */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16"
            style={{ willChange: 'opacity, transform' }}
          >
            <p className="text-center font-display text-sm italic tracking-widest2 text-champagne-dark">
              Destaques da festa
            </p>
            <h2 className="mt-2 text-center font-display text-3xl text-bottle">
              Pratos que vai recordar
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featuredDishes.map((dish, index) => (
                <DishCard key={dish.name} dish={dish} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Fecho */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-14 text-center"
          >
            <p className="font-display text-2xl italic text-bottle">
              Bom apetite!
            </p>
            <p className="mt-3 text-sm uppercase tracking-widest2 text-charcoal/60">
              {couple.bride} &amp; {couple.groom} · {weddingDate.day} de{' '}
              {weddingDate.displayMonth} de {weddingDate.year}
            </p>

            
          </motion.div>
        </main>
      )}
    </>
  )
}