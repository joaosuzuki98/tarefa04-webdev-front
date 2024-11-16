import React, { Component } from 'react'
import api from '../../services/axiosConfig'

interface PurchaseHistory {
    id: number
    productName: string
    supplierName: string
    quantity: number
    purchasePrice: number
    purchaseDate: string
}

interface State {
    history: PurchaseHistory[]
    loading: boolean
    error: string | null
}

export default class PurchaseHistoryTable extends Component<{}, State> {
    state: State = {
        history: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        this.fetchHistory()
    }

    async fetchHistory() {
        try {
            const response = await api.get<PurchaseHistory[]>('/purchases')
            this.setState({ history: response.data, loading: false })
        } catch (error) {
            console.error('Erro ao buscar histórico:', error)
            this.setState({ error: 'Erro ao carregar histórico', loading: false })
        }
    }

    render() {
        const { history, loading, error } = this.state

        return (
            <div className='max-w-full overflow-x-auto neumorphic-look rounded-2xl'>
                <table className=" w-full">
                    <thead>
                        <tr>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">Product</th>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">Supplier</th>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">Quantity</th>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">Total</th>
                            <th className="p-2 text-[1rem] text-left whitespace-nowrap">Date</th>
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
                        ) : history.length > 0 ? (
                            history.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-100">
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{record.productName}</td>
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{record.supplierName}</td>
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{record.quantity}</td>
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{record.purchasePrice.toFixed(2)}</td>
                                    <td className="text-[.8rem] p-2 whitespace-nowrap">{new Date(record.purchaseDate).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-500">
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
