import { useState, useEffect } from 'react'
import { Product } from '../models/product'

export function useProducts() {
    const API_URL = 'http://localhost:8080'

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/produtos`)
        const data = await res.json() as any[]
        setProducts(
            data.map(p => ({
                id: p.id,
                name: p.nome,
                price: p.preco,
                stock: p.estoque,
            }))
        )
        setLoading(false)
    }

    const createProduct = async (p: Omit<Product, 'id'>) => {
        await fetch(`${API_URL}/api/produtos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: p.name,
                preco: p.price,
                estoque: p.stock,
            }),
        })
        await fetchProducts()
    }

    const updateProduct = async (id: number, p: Omit<Product, 'id'>) => {
        await fetch(`${API_URL}/api/produtos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: p.name,
                preco: p.price,
                estoque: p.stock,
            }),
        })
        await fetchProducts()
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return { products, loading, fetchProducts, createProduct, updateProduct }
}
