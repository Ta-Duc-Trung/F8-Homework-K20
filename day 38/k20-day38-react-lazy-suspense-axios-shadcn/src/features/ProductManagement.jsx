import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { addProduct, getProducts, updateProduct } from '@/api/productApi'
import { queryKeys } from '@/api/queryKeys'

// Giữ giá trị form dạng CHUỖI để phân biệt được ô trống
const EMPTY_FORM = { title: '', price: '', stock: '' }

function validate(values) {
  const errors = {}

  if (values.title.trim() === '') {
    errors.title = 'Tên sản phẩm không được để trống.'
  }

  // Kiểm tra chuỗi rỗng TRƯỚC khi Number(), vì Number('') === 0
  const priceText = values.price.trim()
  const price = Number(priceText)
  if (priceText === '') {
    errors.price = 'Vui lòng nhập giá.'
  } else if (!Number.isFinite(price) || price <= 0) {
    errors.price = 'Giá phải là số lớn hơn 0.'
  }

  const stockText = values.stock.trim()
  const stock = Number(stockText)
  if (stockText === '') {
    errors.stock = 'Vui lòng nhập tồn kho.'
  } else if (!Number.isInteger(stock) || stock < 0) {
    errors.stock = 'Tồn kho phải là số nguyên không âm.'
  }

  return errors
}

function ProductManagement() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null) // null = đang thêm mới
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const productsQuery = useQuery({
    queryKey: queryKeys.products, // ["products"]
    queryFn: getProducts,
  })

  // Dùng chung cho thêm và sửa khi thành công
  const handleSuccess = (data) => {
    setOpen(false)
    setValues(EMPTY_FORM)
    setErrors({})
    setEditingProduct(null)
    toast.success(`Đã lưu sản phẩm "${data.title}" thành công.`) // tên lấy từ phản hồi API
    queryClient.invalidateQueries({ queryKey: queryKeys.products })
  }

  const addMutation = useMutation({ mutationFn: addProduct, onSuccess: handleSuccess })
  const updateMutation = useMutation({ mutationFn: updateProduct, onSuccess: handleSuccess })

  const isEditing = editingProduct !== null
  const activeMutation = isEditing ? updateMutation : addMutation
  const isSaving = activeMutation.isPending

  const openAdd = () => {
    addMutation.reset() // xoá lỗi cũ
    setEditingProduct(null)
    setValues(EMPTY_FORM) // form trống
    setErrors({})
    setOpen(true)
  }

  const openEdit = (product) => {
    updateMutation.reset()
    setEditingProduct(product)
    setValues({
      title: product.title,
      price: String(product.price),
      stock: String(product.stock),
    }) // điền sẵn dữ liệu
    setErrors({})
    setOpen(true)
  }

  const handleOpenChange = (nextOpen) => {
    if (isSaving) return // đang lưu thì không cho đóng
    setOpen(nextOpen)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const payload = {
      title: values.title.trim(),
      price: Number(values.price), // gửi dạng số
      stock: Number(values.stock),
    }

    if (isEditing) {
      updateMutation.mutate({ id: editingProduct.id, ...payload }) // đúng id
    } else {
      addMutation.mutate(payload)
    }
  }

  const products = productsQuery.data ?? []

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Quản lý sản phẩm</h2>
          <p className="text-sm text-muted-foreground">Thêm và chỉnh sửa sản phẩm của cửa hàng.</p>
        </div>
        <Button type="button" onClick={openAdd}>
          Thêm sản phẩm
        </Button>
      </header>

      {productsQuery.isPending ? (
        <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          Đang tải danh sách sản phẩm...
        </p>
      ) : productsQuery.isError ? (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <span>Không tải được danh sách: {productsQuery.error.message}</span>
          <Button type="button" size="sm" variant="outline" onClick={() => productsQuery.refetch()}>
            Thử lại
          </Button>
        </div>
      ) : products.length === 0 ? (
        <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          Chưa có sản phẩm nào.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Tên</th>
                <th className="px-4 py-2 font-medium">Giá</th>
                <th className="px-4 py-2 font-medium">Tồn kho</th>
                <th className="px-4 py-2 text-right font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2 text-right">
                    <Button type="button" size="sm" variant="outline" onClick={() => openEdit(product)}>
                      Chỉnh sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? `Cập nhật thông tin cho "${editingProduct.title}".`
                : 'Nhập tên, giá và tồn kho cho sản phẩm mới.'}
            </DialogDescription>
          </DialogHeader>

          <form noValidate onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-title">Tên sản phẩm</Label>
              <Input
                id="product-title"
                name="title"
                value={values.title}
                onChange={handleChange}
                aria-invalid={Boolean(errors.title)}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-price">Giá</Label>
              <Input
                id="product-price"
                name="price"
                type="number"
                step="any"
                value={values.price}
                onChange={handleChange}
                aria-invalid={Boolean(errors.price)}
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-stock">Tồn kho</Label>
              <Input
                id="product-stock"
                name="stock"
                type="number"
                step="1"
                value={values.stock}
                onChange={handleChange}
                aria-invalid={Boolean(errors.stock)}
              />
              {errors.stock && <p className="text-sm text-destructive">{errors.stock}</p>}
            </div>

            {activeMutation.isError && (
              <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                Lưu thất bại: {activeMutation.error.message}. Vui lòng thử lại.
              </p>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" disabled={isSaving} onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Đang lưu...' : 'Lưu'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default ProductManagement