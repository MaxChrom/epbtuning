import { useCallback } from "react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Engine, Container } from "tsparticles-engine"

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log("Particles loaded:", container)
  }, [])

  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: { value: "#000" },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            outModes: { default: "bounce" },
          },
          number: {
            value: 50,
            density: {
              enable: true,
              area: 800,
            },
          },
          opacity: { value: 0.3 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  )
}
