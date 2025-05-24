import { useState, ChangeEvent, FormEvent } from "react"

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

const categories = [
  "BMW E46",
  "Supra 80/Soarer 30",
  "Silvia S13/S15",
  "BMW E30-E36",
  "Toyota Altezza",
  "Toyota Mark2 jzx90-100",
]

interface AdminPanelProps {
  initialProducts: Product[]
  onSave: (products: Product[]) => void
}

export default function AdminPanel({
  initialProducts,
  onSave,
}: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    sku: "",
    category: categories[0],
    price: 0,
    images: [],
    description: "",
    options: [],
  })

  // Handle input changes for editing and new product
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    isNew = false
  ) => {
    const { name, value } = e.target
    if (isNew) {
      setNewProduct((p) => ({
        ...p,
        [name]: name === "price" ? Number(value) : value,
      }))
    } else if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: name === "price" ? Number(value) : value,
      })
    }
  }

  // Handle comma-separated strings for options and images
  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "options" | "images",
    isNew = false
  ) => {
    const value = e.target.value
    const arr = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    if (isNew) {
      setNewProduct((p) => ({
        ...p,
        [field]: arr,
      }))
    } else if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [field]: arr,
      })
    }
  }

  const startEditing = (product: Product) => {
    setEditingProduct(product)
  }

  const cancelEditing = () => {
    setEditingProduct(null)
  }

  const saveEditing = (e: FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    )
    setEditingProduct(null)
    onSave(products)
  }

  const addNewProduct = (e: FormEvent) => {
    e.preventDefault()
    if (!newProduct.name.trim()) return // simple validation
    const newId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1
    const productToAdd = { ...newProduct, id: newId }
    setProducts((prev) => [...prev, productToAdd])
    setNewProduct({
      id: 0,
      name: "",
      sku: "",
      category: categories[0],
      price: 0,
      images: [],
      description: "",
      options: [],
    })
    onSave([...products, productToAdd])
  }

  const deleteProduct = (id: number) => {
    const filtered = products.filter((p) => p.id !== id)
    setProducts(filtered)
    onSave(filtered)
    if (editingProduct?.id === id) setEditingProduct(null)
  }

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Админ панель — Товары</h2>

      {/* List */}
      <div className='mb-8'>
        {products.map((product) => (
          <div
            key={`${product.id}-${product.sku}`}
            className='border border-gray-600 rounded p-4 mb-3 flex justify-between items-center'
          >
            <div>
              <strong>{product.name}</strong> — {product.category} —{" "}
              {product.price.toLocaleString()} ₽
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => startEditing(product)}
                className='px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-white'
              >
                Редактировать
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white'
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editing form */}
      {editingProduct && (
        <form
          onSubmit={saveEditing}
          className='border border-gray-600 rounded p-6 mb-8 bg-gray-900'
        >
          <h3 className='text-xl font-semibold mb-4'>Редактирование товара</h3>

          <input
            type='text'
            name='name'
            value={editingProduct.name}
            onChange={(e) => handleInputChange(e)}
            placeholder='Название'
            className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
          />
          <input
            type='text'
            name='sku'
            value={editingProduct.sku}
            onChange={(e) => handleInputChange(e)}
            placeholder='Артикул'
            className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
          />
          <select
            name='category'
            value={editingProduct.category}
            onChange={(e) => handleInputChange(e)}
            className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type='number'
            name='price'
            value={editingProduct.price}
            onChange={(e) => handleInputChange(e)}
            placeholder='Цена'
            className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
          />
          <textarea
            name='description'
            value={editingProduct.description}
            onChange={(e) => handleInputChange(e)}
            placeholder='Описание'
            className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white resize-y'
          />

          <input
            type='text'
            name='images'
            value={editingProduct.images.join(", ")}
            onChange={(e) => handleArrayChange(e, "images")}
            placeholder='Ссылки на изображения (через запятую)'
            className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
          />
          <input
            type='text'
            name='options'
            value={editingProduct.options.join(", ")}
            onChange={(e) => handleArrayChange(e, "options")}
            placeholder='Опции (через запятую)'
            className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
          />

          <div className='flex gap-4'>
            <button
              type='submit'
              className='px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white'
            >
              Сохранить
            </button>
            <button
              type='button'
              onClick={cancelEditing}
              className='px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white'
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      {/* Add new product */}
      <form
        onSubmit={addNewProduct}
        className='border border-gray-600 rounded p-6 bg-gray-900'
      >
        <h3 className='text-xl font-semibold mb-4'>Добавить новый товар</h3>

        <input
          type='text'
          name='name'
          value={newProduct.name}
          onChange={(e) => handleInputChange(e, true)}
          placeholder='Название'
          className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
          required
        />
        <input
          type='text'
          name='sku'
          value={newProduct.sku}
          onChange={(e) => handleInputChange(e, true)}
          placeholder='Артикул'
          className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
        />
        <select
          name='category'
          value={newProduct.category}
          onChange={(e) => handleInputChange(e, true)}
          className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type='number'
          name='price'
          value={newProduct.price}
          onChange={(e) => handleInputChange(e, true)}
          placeholder='Цена'
          className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
          required
          min={0}
        />
        <textarea
          name='description'
          value={newProduct.description}
          onChange={(e) => handleInputChange(e, true)}
          placeholder='Описание'
          className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white resize-y'
        />

        <input
          type='text'
          name='images'
          value={newProduct.images.join(", ")}
          onChange={(e) => handleArrayChange(e, "images", true)}
          placeholder='Ссылки на изображения (через запятую)'
          className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
        />
        <input
          type='text'
          name='options'
          value={newProduct.options.join(", ")}
          onChange={(e) => handleArrayChange(e, "options", true)}
          placeholder='Опции (через запятую)'
          className='mb-3 w-full p-2 rounded bg-gray-800 border border-gray-700 text-white'
        />

        <button
          type='submit'
          className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white'
        >
          Добавить товар
        </button>
      </form>
    </div>
  )
}
