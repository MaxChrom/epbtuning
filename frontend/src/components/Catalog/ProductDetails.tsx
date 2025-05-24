import { useEffect, useState } from "react"

import { Button } from "../ui/button"
import { Card } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

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

interface ProductDetailsProps {
  product: Product
  onClose: () => void
  whatsappNumber?: string // для кнопки контакта
}

export default function ProductDetails({
  product,
  onClose,
  whatsappNumber = "+79991234567",
}: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(product.options[0] || "")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  const prevImage = () => {
    setCurrentImageIndex((i) => (i === 0 ? product.images.length - 1 : i - 1))
  }

  const nextImage = () => {
    setCurrentImageIndex((i) => (i === product.images.length - 1 ? 0 : i + 1))
  }

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Здравствуйте, интересуюсь товаром: ${product.name} (${selectedOption})`
    )
    window.open(
      `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${text}`,
      "_blank"
    )
  }

  return (
    <div
      className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6'
      onClick={onClose}
    >
      <Card
        className='relative w-full h-full max-w-[95vw] max-h-[95vh] sm:max-w-[70vw] sm:max-h-[70vh] overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant='ghost'
          size='icon'
          onClick={onClose}
          className='absolute top-4 right-4 z-10'
        >
          ✕
        </Button>

        <div className='p-4 sm:p-8 flex flex-col overflow-y-auto h-full'>
          <h2 className='text-2xl sm:text-4xl font-bold mb-2'>
            {product.name}
          </h2>
          <p className='text-indigo-600 font-semibold mb-1'>{product.sku}</p>
          <p className='text-xl sm:text-2xl font-bold mb-4'>
            {product.price.toLocaleString()} ₽
          </p>

          <div className='flex flex-col sm:flex-row gap-6 flex-1 overflow-hidden'>
            <div className='relative flex flex-col items-center justify-center w-full sm:max-w-md'>
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - ${currentImageIndex + 1}`}
                className='rounded-lg w-full h-[250px] sm:h-[400px] object-cover'
                loading='lazy'
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={prevImage}
                    className='absolute top-1/2 left-0 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-r-md hover:bg-opacity-75'
                  >
                    ‹
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={nextImage}
                    className='absolute top-1/2 right-0 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-l-md hover:bg-opacity-75'
                  >
                    ›
                  </Button>
                </>
              )}
            </div>

            <div className='flex flex-col flex-1 overflow-y-auto'>
              <p className='mb-4'>{product.description}</p>

              {product.options.length > 0 && (
                <div className='mb-4'>
                  <label className='block font-semibold mb-1'>
                    Выберите опцию:
                  </label>
                  <Select
                    value={selectedOption}
                    onValueChange={setSelectedOption}
                  >
                    <SelectTrigger className='w-full focus:ring-0'>
                      <SelectValue placeholder='Выберите опцию' />
                    </SelectTrigger>
                    <SelectContent>
                      {product.options.map((option, idx) => (
                        <SelectItem key={idx} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className='mt-auto pt-4'>
                <Button
                  className='w-full bg-green-600 hover:bg-green-700 text-white'
                  onClick={openWhatsApp}
                >
                  Контактировать в WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
