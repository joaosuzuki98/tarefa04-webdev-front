import React, { Component } from 'react'
import api from '../../services/axiosConfig'

interface Supplier {
    id: number
    name: string
    address: string
    phone: string
    email: string
    cnpj: string
}

interface State {
    suppliers: Supplier[]
    loading: boolean
    error: string | null
}

export default class SupplierTable extends Component<{}, State> {
    state: State = {
        suppliers: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        this.fetchSuppliers()
    }

    async fetchSuppliers() {
        try {
            const response = await api.get<Supplier[]>('/suppliers')
            this.setState({ suppliers: response.data, loading: false })
        } catch (error) {
            console.error('Erro ao buscar fornecedores:', error)
            this.setState({ error: 'Erro ao carregar fornecedores', loading: false })
        }
    }

    render() {
        const { suppliers, loading, error } = this.state

        return (
            <div className='max-w-full overflow-x-auto neumorphic-look rounded-2xl'>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">Name</th>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">Address</th>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">Phone</th>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">Email</th>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">CNPJ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-500">
                                    Carregando...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={6} className="text-center text-red-500">
                                    {error}
                                </td>
                            </tr>
                        ) : suppliers.length > 0 ? (
                            suppliers.map((supplier) => (
                                <tr key={supplier.id} className="hover:bg-gray-100">
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{supplier.name}</td>
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{supplier.address}</td>
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{supplier.phone}</td>
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{supplier.email}</td>
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{supplier.cnpj}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-500">
                                    Nenhum fornecedor encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
