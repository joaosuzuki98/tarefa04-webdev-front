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

interface tableProps {
    key: number
}

export default class Table extends Component<tableProps, State> {
    state: State = {
        products: [],
        error: null,
        loading: true,
    }

    componentDidMount() {
        this.fetchProducts()
    }

    componentDidUpdate(prevProps: tableProps) {
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
            console.error('Erro ao buscar os produtos:', error)
            this.setState({ error: 'Erro ao carregar os produtos', loading: false })
        }
    }

    render() {
        const { products, error, loading } = this.state

        return (
            <div>
                {loading ? (
                    <div className="loading-spinner neumorphic-look">
                        <div className="spinner"></div>
                        <p className="text-[1rem] mt-4">Carregando...</p>
                    </div>
                ) : (
                    <div className='max-w-full overflow-x-auto neumorphic-look rounded-2xl'>
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
                                ) : products.length > 0 ? (
                                    products.map((product) => (
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
                                            Nenhum produto encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}
