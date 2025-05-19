'use client'

import { useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Paper,
  TableContainer,
} from '@mui/material'
import styles from './page.module.css'
import { Product } from './models/product'
import { useProducts } from './hooks/useProduct'
import ProductFormDialog from './components/ProductFormDialog'

export default function Home() {
  const { products, loading, createProduct, updateProduct } = useProducts()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Product | undefined>(undefined)

  const openNew = () => {
    setEditing(undefined)
    setDialogOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setDialogOpen(true)
  }

  const handleSave = async (data: Omit<Product, 'id'>) => {
    if (editing) {
      await updateProduct(editing.id, data)
    } else {
      await createProduct(data)
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        {/* <TableContainer className={styles.tableContainer} component={Paper}>
            <Button variant="contained" onClick={openNew} style={{ marginBottom: 16 }}>
              Adicionar Produto
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockProducts.map(p => (
                  <TableRow
                    key={p.id}
                    hover
                    onClick={() => openEdit(p)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
        {loading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Button variant="contained" onClick={openNew} style={{ marginBottom: 16 }}>
              Adicionar Produto
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(p => (
                  <TableRow key={p.id} hover onClick={() => openEdit(p)} style={{ cursor: 'pointer' }}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        )}
      
        <ProductFormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
          product={editing}
        />
      </main>
    </div>
  )
}
