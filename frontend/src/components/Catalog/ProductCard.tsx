import { Button } from "../ui/button"

interface ProductCardProps {
  product: {
    images: string[]
    name: string
    sku: string
    price: number
  }
  onDetails: () => void
}

export default function ProductCard({ product, onDetails }: ProductCardProps) {
  return (
    <div
      className={`
        rounded-xl
        p-6
        cursor-pointer
        select-none
        transition-transform
        duration-300
        hover:scale-105
        bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900
        text-white
        border border-gray-700
        shadow-[0_8px_30px_rgba(0,0,0,0.6)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.75)]
        flex
        flex-col
        h-full
      `}
      onClick={onDetails}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onDetails()
      }}
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className='w-full h-64 object-cover rounded-lg mb-4'
        loading='lazy'
      />
      <h3 className='text-xl font-semibold mb-2'>{product.name}</h3>
      <p className='text-sm text-indigo-400 mb-1'>{product.sku}</p>
      <p className='font-bold text-lg mb-3'>
        {product.price.toLocaleString()} ₽
      </p>
      <Button
        variant='default'
        className='mt-auto w-full py-2 font-semibold'
        onClick={(e) => {
          e.stopPropagation()
          onDetails()
        }}
      >
        Подробнее
      </Button>
    </div>
  )
}
