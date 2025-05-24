export default function ContactForm() {
  return (
    <footer className='bg-black text-white p-10'>
      <div className='max-w-xl mx-auto'>
        <h3 className='text-2xl font-bold mb-4 text-center'>
          Связаться с нами
        </h3>
        <form className='space-y-4'>
          <input
            type='text'
            placeholder='Ваше имя'
            className='w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400'
          />
          <input
            type='email'
            placeholder='Email'
            className='w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400'
          />
          <textarea
            placeholder='Сообщение'
            className='w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400'
            rows={4}
          ></textarea>
          <button
            type='submit'
            className='w-full bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition'
          >
            Отправить
          </button>
        </form>
      </div>
    </footer>
  )
}
