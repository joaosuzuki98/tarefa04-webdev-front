import React, { Component } from 'react'
import api from '../../services/axiosConfig'

interface Supplier {
    id: number
    name: string
}

interface Product {
    id: number
    name: string
    price: number
    stock: number
    Supplier?: Supplier
}

interface State {
    products: Product[]
    error: string | null
    loading: boolean
}

interface TableProps {
    key: number
    searchTerm: string
}

export default class Table extends Component<TableProps, State> {
    state: State = {
        products: [],
        error: null,
        loading: true,
    }

    componentDidMount() {
        this.fetchProducts()
    }

    componentDidUpdate(prevProps: TableProps) {
        if (prevProps.key !== this.props.key) {
            this.fetchProducts()
        }
    }

    async fetchProducts() {
        try {
            this.setState({ loading: true })
            const response = await api.get<Product[]>('/products')
            this.setState({ products: response.data, loading: false })
        } catch (error) {
            console.error('Error while trying to retrieve products:', error)
            this.setState({ error: 'Error while trying to retrieve products', loading: false })
        }
    }

    render() {
        const { products, error, loading } = this.state
        const { searchTerm } = this.props
    
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    
        return (
            <div>
                {loading ? (
                    <div className="loading-spinner neumorphic-look">
                        <div className="spinner"></div>
                        <p className="text-[1rem] mt-4">Loading...</p>
                    </div>
                ) : (
                    <div className='max-w-full overflow-auto neumorphic-look rounded-2xl max-h-[352px]'>
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th className='text-left text-[1rem] p-2 whitespace-nowrap'>Name</th>
                                    <th className='text-left text-[1rem] p-2 whitespace-nowrap'>Price</th>
                                    <th className='text-left text-[1rem] p-2 whitespace-nowrap'>Stock</th>
                                    <th className='text-left text-[1rem] p-2 whitespace-nowrap'>Supplier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {error ? (
                                    <tr>
                                        <td colSpan={5} className='text-center text-red-500'>
                                            {error}
                                        </td>
                                    </tr>
                                ) : filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td className='text-[.8rem] p-2 whitespace-nowrap'>{product.name}</td>
                                            <td className='text-[.8rem] p-2 whitespace-nowrap'>{product.price}</td>
                                            <td className='text-[.8rem] p-2 whitespace-nowrap'>{product.stock}</td>
                                            <td className='text-[.8rem] p-2 whitespace-nowrap'>{product.Supplier ? product.Supplier.name : 'N/A'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className='text-center'>
                                            No product found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )
    }
}
