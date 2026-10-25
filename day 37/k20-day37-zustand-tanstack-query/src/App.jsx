import { useState } from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import CategoryList from './components/CategoryList'
import ProductList from './components/ProductList'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <CategoryList selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
          <ProductList selectedCategory={selectedCategory} />
        </div>
      </main>

      <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default App