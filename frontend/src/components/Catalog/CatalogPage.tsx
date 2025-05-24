import { useState, useMemo } from "react"
import ProductCard from "./ProductCard"
import ProductDetails from "./ProductDetails"
import { useNavigate } from "react-router-dom"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

const categories = [
  "Все",
  "BMW E46",
  "Supra 80/Soarer 30",
  "Silvia S13/S15",
  "BMW E30-E36",
  "Toyota Altezza",
  "Toyota Mark2 jzx90-100",
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

export default function Catalog({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const navigate = useNavigate()

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Все" || product.category === selectedCategory
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const handleBackClick = () => {
    setSelectedProduct(null)
    setSelectedCategory("Все")
    setSearchTerm("")
    navigate("/")
  }

  return (
    <div
      className='
        min-h-screen
        bg-gradient-to-br
        from-gray-900
        via-gray-800
        to-gray-950
        font-sans
        text-white
        p-8
        select-none
        motion-safe:animate-fadeIn
      '
    >
      <div className='flex items-start justify-start mb-8 gap-6 select-text cursor-default'>
        <Button
          onClick={handleBackClick}
          variant='default'
          className='px-4 py-2'
          title='Вернуться на главную'
        >
          ← Назад
        </Button>
      </div>

      <div className='flex flex-wrap justify-center gap-4 mb-8'>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
              select-none
              motion-safe:hover:scale-105
              motion-safe:active:scale-95
              ${
                selectedCategory === cat
                  ? "scale-105 shadow-lg shadow-purple-800"
                  : ""
              }
            `}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className='flex justify-center mb-10'>
        <Input
          type='text'
          placeholder='Поиск по названию...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full max-w-lg text-white placeholder-white text-lg font-medium'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={`${product.id}-${product.sku}`}
              product={product}
              onDetails={() => setSelectedProduct(product)}
            />
          ))
        ) : (
          <p className='col-span-full text-center text-gray-500 text-lg italic'>
            Товаров не найдено
          </p>
        )}
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
