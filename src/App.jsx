import { useLenis } from './hooks/useLenis'
import AnimateInView from './components/AnimateInView'
import { fadeUp, staggerContainer } from './hooks/useAnimations'

import Cover from './components/Cover'
import EventDetails from './components/EventDetails'
import Timeline from './components/Timeline'
import GuestLookup from './components/GuestLookup'
import Closing from './components/Closing'

export default function App() {
  useLenis()

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl overflow-x-clip bg-sand shadow-xl shadow-black/5">
      <Cover />

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-4 py-10 sm:gap-14 sm:px-6 sm:py-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:gap-x-16 lg:px-12">
        <AnimateInView variants={staggerContainer}>
          <EventDetails />
        </AnimateInView>

        <AnimateInView variants={staggerContainer}>
          <Timeline />
        </AnimateInView>

        <AnimateInView variants={fadeUp} className="w-full md:col-span-2">
          <div className="mx-auto w-full max-w-2xl">
            <GuestLookup />
          </div>
        </AnimateInView>
      </div>

      <Closing />
    </main>
  )
}