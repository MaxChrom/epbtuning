const SmokeOverlay = () => (
  <svg
    className='absolute inset-0 z-30 pointer-events-none'
    viewBox='0 0 800 600'
    preserveAspectRatio='xMidYMid slice'
  >
    <filter id='noiseFilter'>
      <feTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' />
      <feDisplacementMap in='SourceGraphic' scale='30' />
    </filter>
    <rect width='800' height='600' filter='url(#noiseFilter)' opacity='0.03' />
  </svg>
)

export default SmokeOverlay
