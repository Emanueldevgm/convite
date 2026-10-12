import { useLenis } from './hooks/useLenis'
import AnimateInView from './components/AnimateInView'
import { fadeUp, staggerContainer } from './hooks/useAnimations'

import Cover from './components/Cover'
import EventDetails from './components/EventDetails'
import Timeline from './components/Timeline'
import Gifts from './components/Gifts'
import GuestLookup from './components/GuestLookup'
import Closing from './components/Closing'

export default function App() {
  useLenis()

  return (
    <main className="mx-auto max-w-md bg-sand">
      <Cover />

      <div className="space-y-14 px-5 py-14">
        <AnimateInView variants={staggerContainer}>
          <EventDetails />
        </AnimateInView>

        <AnimateInView variants={staggerContainer}>
          <Timeline />
        </AnimateInView>

        <AnimateInView variants={fadeUp}>
          <Gifts />
        </AnimateInView>

        <AnimateInView variants={fadeUp}>
          <GuestLookup />
        </AnimateInView>
      </div>

      <Closing />
    </main>
  )
}