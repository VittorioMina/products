import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@mui/material'
import { Product } from '../models/product'

interface Props {
    open: boolean
    onClose: () => void
    onSave: (p: Omit<Product, 'id'>) => Promise<void>
    product?: Product
}

export default function ProductFormDialog({ open, onClose, onSave, product }: Props) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)

    useEffect(() => {
        if (product) {
            setName(product.name)
            setPrice(product.price)
            setStock(product.stock)
        } else {
            setName('')
            setPrice(0)
            setStock(0)
        }
    }, [product, open])

    const handleSave = async () => {
        await onSave({ name, price, stock })
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(parseFloat(e.target.value))}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Stock"
                    type="number"
                    value={stock}
                    onChange={e => setStock(parseInt(e.target.value, 10))}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
