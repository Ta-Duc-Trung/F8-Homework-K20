import { useState } from 'react'

import { Button } from '@/components/ui/button'
import ProductCatalog from '@/features/ProductCatalog'
import ProductManagement from '@/features/ProductManagement'
import ProductDetail from '@/features/ProductDetail'
const TABS = [
  { id: 'catalog', label: 'Bài 1: Danh mục', Component: ProductCatalog },
  { id: 'management', label: 'Bài 2: Quản lý', Component: ProductManagement },
  { id: 'detail', label: 'Bài 3: Chi tiết', Component: ProductDetail },
]
function App() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const ActiveComponent = TABS.find((tab) => tab.id === activeTab).Component

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <nav className="flex flex-wrap gap-2 border-b pb-4">
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </nav>
      <ActiveComponent />
    </div>
  )
}

export default App