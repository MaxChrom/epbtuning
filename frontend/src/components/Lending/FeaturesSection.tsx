import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: string
}

interface FeaturesSectionProps {
  features: Feature[]
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
      loop: false,
      mode: "snap",
      renderMode: "performance",
      rubberband: false,
    //   animation: {
    //     duration: 500,
    //     easing: (t) => t,
    //   },

      slides: {
        perView: 1.2,
        spacing: 24,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2.2, spacing: 24 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3.2, spacing: 32 },
        },
      },
    })

  return (
    <section className='relative w-full max-w-7xl mx-auto px-4 py-16'>
      <h2 className='text-center text-4xl md:text-5xl font-bold text-white mb-12 bebas-neue-regular'>
        Почему выбирают EPB Tuning?
      </h2>

      <div className='relative'>
        <div
          ref={sliderRef}
          className='keen-slider rounded-3xl backdrop-blur-sm bg-white/10 p-6 shadow-2xl'
        >
          {features.map((f, i) => (
            <div
              key={i}
              className='keen-slider__slide relative flex flex-col items-center justify-center text-center 
  rounded-xl bg-white/10 backdrop-blur-md p-10 border border-cyan-300/20 
  shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-transform duration-500 hover:scale-105 
  hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] group overflow-hidden'
            >
              {/* Glow effect */}
              <span className='absolute left-[-50%] top-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/20 to-transparent rotate-45 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none blur-2xl' />

              <div className='text-2xl mb-6'>{f.icon}</div>
              <h3 className='text-2xl font-semibold text-white mb-3'>
                {f.title}
              </h3>
              <p className='text-white/80 text-base max-w-sm'>
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* Навигационные стрелки */}
        <button
          onClick={() => slider.current?.prev()}
          className='absolute top-1/2 left-0 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full shadow-md backdrop-blur-md z-10'
        >
          <ChevronLeft className='text-white w-6 h-6' />
        </button>
        <button
          onClick={() => slider.current?.next()}
          className='absolute top-1/2 right-0 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full shadow-md backdrop-blur-md z-10'
        >
          <ChevronRight className='text-white w-6 h-6' />
        </button>
      </div>
    </section>
  )
}
