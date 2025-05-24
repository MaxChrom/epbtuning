import { useNavigate } from "react-router-dom"

export default function CarSelector({
  cars,
  selectedCar,
  onSelect,
}: CarSelectorProps) {
  const navigate = useNavigate() // <-- React Router hook

  return (
    <section className='p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'>
      <h2 className='text-4xl font-bold text-center mb-10 bebas-neue-regular tracking-wider'>
        Выберите авто
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
        {cars.map((car, i) => {
          const isSelected = selectedCar === car.name
          return (
            <div
              key={i}
              onClick={() => onSelect(car.name)}
              className={`
              relative group bg-white/10 backdrop-blur-md 
              border ${
                isSelected
                  ? "border-yellow-400 shadow-yellow-300/30 shadow-xl"
                  : "border-white/10"
              } 
              rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105
            `}
            >
              <div className='relative'>
                <img
                  src={car.image}
                  alt={car.name}
                  className='w-full h-56 object-cover group-hover:opacity-90 transition-opacity duration-300'
                />
                <div className='absolute bottom-0 w-full bg-black/50 text-white p-4 text-center font-semibold text-lg tracking-wide'>
                  {car.name}
                </div>
              </div>

              {isSelected && (
                <div className='absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded-full shadow'>
                  Выбрано
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedCar && (
        <p className='mt-6 text-center text-lg text-yellow-300 font-medium'>
          Вы выбрали: <span className='font-bold'>{selectedCar}</span>
        </p>
      )}

      <div className='text-center mt-12'>
        <button
          onClick={() => navigate("/shop")}
          className='bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg tracking-wide shadow-md hover:bg-yellow-300 transition-all duration-300'
        >
          Смотреть общий каталог
        </button>
      </div>
    </section>
  )
}
