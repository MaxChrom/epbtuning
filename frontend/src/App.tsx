import { useEffect, useState } from "react"
import HeroMotion from "./components/Lending/HeroMotion"
import FeaturesSection from "./components/Lending/FeaturesSection"
import CarSelector from "./components/Lending/CarSelector"
import ContactForm from "./components/Lending/ContactForm"
import {
  Car,
  Settings,
  Flag,
  GaugeCircle,
  Wrench,
  Lightbulb,
} from "lucide-react"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CatalogPage from "./components/Catalog/CatalogPage"
import AdminPanel from "./components/Catalog/AdminPanel"

import brakers1 from "./assets/brakers1.jpg"
import brakers2 from "./assets/brakers2.jpg"

// import silviaImage from "./assets/cars/silvia.jpeg"
// import supra from "./assets/cars/supra.jpg"
// import e36 from "./assets/cars/e36.jpg"

interface Feature {
  title: string
  description: string
  icon: React.ReactNode // ← раньше было string
}

const features: Feature[] = [
  {
    title: "Гоночное ДНК",
    description: "Наши детали разработаны для максимальной производительности.",
    icon: <Flag className='w-10 h-10 text-cyan-400' />,
  },
  {
    title: "Скорость и мощь",
    description:
      "Разгонись быстрее — ощути разницу с нашими тюнинг-комплектами.",
    icon: <GaugeCircle className='w-10 h-10 text-cyan-400' />,
  },
  {
    title: "Премиум-компоненты",
    description:
      "Мы используем только качественные материалы от проверенных поставщиков.",
    icon: <Wrench className='w-10 h-10 text-cyan-400' />,
  },
  {
    title: "Умные технологии",
    description: "Инновационные решения для современного дрифта.",
    icon: <Lightbulb className='w-10 h-10 text-cyan-400' />,
  },
  {
    title: "Настрой под себя",
    description: "Полная кастомизация под твой стиль и требования.",
    icon: <Settings className='w-10 h-10 text-cyan-400' />,
  },
  {
    title: "Готов к старту",
    description: "Прокачай машину — будь первым на трассе.",
    icon: <Car className='w-10 h-10 text-cyan-400' />,
  },
]

const cars = [
  { name: "Silvia S13/S15", image: "/cars/silvia.jpeg" },
  { name: "Supra 80/Soarer 30", image: "/cars/supra.jpeg" },
  { name: "BMW E30-36", image: "/cars/e36.jpeg" },
  { name: "BMW E46", image: "/cars/e36.jpeg" },
  { name: "Tayota Altezza", image: "/cars/silvia.jpeg" },
  { name: "Toyota Mark2 jzx90-100", image: "/cars/supra.jpeg" },
]

interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  images: string[]
  description: string
  options: string[]
}

export default function App() {
  const [selectedCar, setSelectedCar] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Верхние рычаги BMW E36/E46",
      sku: "BMW-ARM-001",
      category: "BMW E30-E36",
      price: 9000,
      images: [brakers1],
      description:
        "Верхние развальные рычаги BMW E36/E46 под моностойку. С кронштейнами под штатный стабилизатор. Доступны к заказу под штатные сайлентблоки либо шароблоки (не взаимозаменяемы между собой). Цена указана за комплект из 2х рычагов. Обращаем ваше внимание что товар не сертифицирован и не подходит для эксплуатации на дорогах общего пользования, а значит последствия за установку продукции автотюнинга лежат на владельце транспортного средства.",
      options: ["Без сайлентблоков", "С шароблоками", "С сайлентблоками"],
    },
    {
      id: 2,
      name: "Тормозные диски Supra",
      sku: "SUPRA-BRAKE-01",
      category: "Supra 80/Soarer 30",
      price: 12000,
      images: [brakers2],
      description:
        "Усиленные тормозные диски для максимальной безопасности и контроля.",
      options: ["Стандартные", "Усиленные"],
    },
    {
      id: 1,
      name: "Верхние рычаги BMW E36/E46",
      sku: "BMW-ARM-002",
      category: "BMW E30-E32",
      price: 9000,
      images: [brakers1],
      description:
        "Верхние развальные рычаги BMW E36/E46 под моностойку. С кронштейнами под штатный стабилизатор. Доступны к заказу под штатные сайлентблоки либо шароблоки (не взаимозаменяемы между собой). Цена указана за комплект из 2х рычагов. Обращаем ваше внимание что товар не сертифицирован и не подходит для эксплуатации на дорогах общего пользования, а значит последствия за установку продукции автотюнинга лежат на владельце транспортного средства.",
      options: ["Без сайлентблоков", "С шароблоками", "С сайлентблоками"],
    },
  ])

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <div className='font-sans'>
              <HeroMotion>
                <FeaturesSection features={features} />
              </HeroMotion>
              <CarSelector
                cars={cars}
                selectedCar={selectedCar}
                onSelect={setSelectedCar}
              />
              <ContactForm />
            </div>
          }
        />
        <Route path='/shop' element={<CatalogPage products={products} />} />
        <Route
          path='/admin'
          element={
            <AdminPanel initialProducts={products} onSave={setProducts} />
          }
        />
      </Routes>
    </Router>
  )
}
