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

interface tableProps {
    key: number
    searchTerm: string
}

export default class PurchaseHistoryTable extends Component<tableProps, State> {
    state: State = {
        history: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        this.fetchHistory()
    }

    componentDidUpdate(prevProps: tableProps) {
        if (prevProps.key !== this.props.key) {
            this.fetchHistory()
        }
    }

    async fetchHistory() {
        try {
            const response = await api.get<PurchaseHistory[]>('/purchases')
            this.setState({ history: response.data, loading: false })
        } catch (error) {
            console.error('Error while trying to retrieve purchases:', error)
            this.setState({ error: 'Error while trying to retrieve purchases', loading: false })
        }
    }

    render() {
        const { history, loading, error } = this.state
        const { searchTerm } = this.props

        const filteredPurchases = history.filter((purchase) =>
            purchase.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return (
            <div className='max-w-full overflow-auto neumorphic-look rounded-2xl max-h-[352px]'>
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
                                    Loading...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={6} className="text-center text-red-500">
                                    {error}
                                </td>
                            </tr>
                        ) : history.length > 0 ? (
                            filteredPurchases.map((record) => (
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
                                    No purchase found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
