import { motion, useTransform, useScroll } from "framer-motion"
import type { ReactNode } from "react"
import backgroundImage from "../../assets/background-image.jpg"

const HeroMotion = ({ children }: { children?: ReactNode }) => {
  const { scrollY } = useScroll()

  const fadeStart = 400
  const fadeEnd = 900

  const progress = useTransform(scrollY, [fadeStart, fadeEnd], [0, 1], {
    clamp: true,
  })

  const opacity = useTransform(progress, (p) => 1 - p)
  const translateY = useTransform(progress, (p) => -40 * p)
  const blur = useTransform(progress, (p) => `blur(${8 * p}px)`)
  const scale = useTransform(progress, (p) => 1 - 0.05 * p)

  // Для фона можно оставить простой эффект без анимации, или повторить тоже самое с useTransform

  return (
    <div className='relative min-h-[80vh] overflow-hidden flex flex-col justify-between'>
      {/* Фон */}
      <motion.div
        className='absolute inset-0 bg-cover bg-center z-0'
        // Для фоновой анимации сделаем примерно такой же плавный эффект
        // Используем scrollY с useTransform для y, scale и blur
        style={{
          backgroundImage: `url(${backgroundImage})`,
          y: useTransform(scrollY, (y) => y * 0.3),
          scale: useTransform(scrollY, (y) => 1 + y * 0.0005),
          filter: useTransform(
            scrollY,
            (y) => `blur(${Math.min(y * 0.01, 10)}px)`
          ),
        }}
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10' />

      {/* Заголовок */}
      <motion.h1
        className='bebas-neue-regular relative z-20 text-center mt-32 text-[12rem] md:text-[18rem] font-normal text-transparent bg-clip-text'
        style={{
          opacity,
          y: translateY,
          filter: blur,
          scale,
        }}
        initial={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      >
        <span
          className='text-teal-300' // Можно заменить на любой бирюзовый цвет из Tailwind
          style={{
            textShadow: `
        0 0 8px rgba(64, 224, 208, 0.9),
        0 0 15px rgba(64, 224, 208, 0.7),
        0 0 25px rgba(64, 224, 208, 0.5),
        0 0 40px rgba(32, 178, 170, 0.8),
        2px 2px 6px rgba(32, 178, 170, 1)
      `,
          }}
        >
          EPB
        </span>
        <span
          className='text-white'
          style={{
            textShadow: `
        1px 1px 3px rgba(255, 255, 255, 0.8), /* белая тень */
        0 0 10px rgba(255, 255, 255, 0.6),    /* легкое свечение */
        0 0 20px rgba(255, 255, 255, 0.4)`,
          }}
        >
          TUNING
        </span>
        <div className='relative z-20 mt-16 px-6 pb-20'>{children}</div>
      </motion.h1>
    </div>
  )
}

export default HeroMotion
