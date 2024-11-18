import React, {useState, useEffect} from 'react'
import './App.css'
import api from './services/axiosConfig'
import Button from './components/Button/Button'
import ProductsTable from './components/Table/ProductsTable'
import SupplierTable from './components/Table/SuppliersTable'
import PurchaseHistoryTable from './components/Table/PurchasesTable'
import Input from './components/Input/Input'
import NotificationsIcon from './components/NotificationsIcon/NotificationsIcon'
import Icon from './components/Icon/Icon'
import Modal from './components/Modal/Modal'

interface Supplier {
	id: string
	name: string
}

function App() {
	const handleClick = () => console.log('test')

	const [selectedEntity, setSelectedEntity] = useState<'products' | 'suppliers' | 'purchases'>('products')
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<Boolean>(false)

	const openModal = () => {
		setIsRegisterModalOpen(true)
	}

	const closeModal = () => {
		setProductName('')
		setProductPrice('')
		setProductStock('')
		setSelectedSupplier('')
		setSupplierName('')
		setSupplierAddress('')
		setSupplierPhone('')
		setSupplierEmail('')
		setSupplierCnpj('')
		setIsRegisterModalOpen(false)
	}

	const [suppliers, setSuppliers] = useState<Supplier[]>([])
	const [selectedSupplier, setSelectedSupplier] = useState('')
	const fetchSuppliers = async () => {
		try {
			const response = await api.get<Supplier[]>('/suppliers')
			setSuppliers(response.data)
		} catch(err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fetchSuppliers()
	}, [])

	const [mainInputValue, setMainInputValue] = useState('')

	const [productName, setProductName] = useState<string>('')
	const [productPrice, setProductPrice] = useState<string>('')
	const [productStock, setProductStock] = useState<string>('')
	const handleRegisterProductSubmit = async (e: any) => {
		e.preventDefault()

		const productData = {
			name: productName,
			price: parseFloat(productPrice),
			stock: Number(productStock),
			supplierId: Number(selectedSupplier)
		}

		try {
			const response = await api.post('/products', productData)
			console.log(response)
			setProductName('')
			setProductStock('')
			setProductPrice('')
			setSelectedSupplier('')
			setIsRegisterModalOpen(false)
		} catch(err) {
			console.log(err)
		}
	}

	const [supplierName, setSupplierName] = useState<string>('')
	const [supplierAddress, setSupplierAddress] = useState<string>('')
	const [supplierPhone, setSupplierPhone] = useState<string>('')
	const [supplierEmail, setSupplierEmail] = useState<string>('')
	const [supplierCnpj, setSupplierCnpj] = useState<string>('')
	const handleRegisterSupplierSubmit = async (e: any) => {
		e.preventDefault()

		const supplierData = {
			name: supplierName,
			address: supplierAddress,
			phone: supplierPhone,
			email: supplierEmail,
			cnpj: supplierCnpj
		}

		try {
			const response = await api.post('/suppliers', supplierData)
			console.log(response)
			setSupplierName('')
			setSupplierAddress('')
			setSupplierPhone('')
			setSupplierEmail('')
			setSupplierCnpj('')
			setIsRegisterModalOpen(false)
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<div className='main-container'>
			<header className='w-full flex justify-between mb-10'>
				<Icon/>
				<NotificationsIcon/>
			</header>

			<main className='flex flex-col justify-between h-[80vh]'>
				<div className='my-4 flex justify-center gap-4'>
					<label className='radio-button neumorphic-look flex flex-col items-center'>
						<input
							type="radio"
							name="entity"
							value="products"
							checked={selectedEntity === 'products'}
							onChange={(e) => setSelectedEntity(e.target.value as 'products' | 'suppliers' | 'purchases')}
							className="hidden"
						/>
						<i className="fa-solid fa-box text-lg mb-2"></i>
						<div className={`circle ${selectedEntity === 'products' ? 'active' : ''}`}></div>
					</label>

					<label className='radio-button neumorphic-look flex flex-col items-center'>
						<input
							type="radio"
							name="entity"
							value="suppliers"
							checked={selectedEntity === 'suppliers'}
							onChange={(e) => setSelectedEntity(e.target.value as 'products' | 'suppliers' | 'purchases')}
							className="hidden"
						/>
						<i className="fa-solid fa-truck text-lg mb-2"></i>
						<div className={`circle ${selectedEntity === 'suppliers' ? 'active' : ''}`}></div>
					</label>

					<label className='radio-button neumorphic-look flex flex-col items-center'>
						<input
							type="radio"
							name="entity"
							value="purchases"
							checked={selectedEntity === 'purchases'}
							onChange={(e) => setSelectedEntity(e.target.value as 'products' | 'suppliers' | 'purchases')}
							className="hidden"
						/>
						<i className="fa-solid fa-receipt text-lg mb-2"></i>
						<div className={`circle ${selectedEntity === 'purchases' ? 'active' : ''}`}></div>
					</label>
				</div>
				<div>
					<div className='w-full flex justify-center' onClick={openModal}>
						<Button onClickHandle={handleClick}>
							<i className="fa-solid fa-plus"></i>
						</Button>
					</div>

					<div className='my-5'>
						<Input placeholder='' value={mainInputValue} onChange={setMainInputValue} required={false}/>
					</div>

					<div className='flex justify-evenly'>
						<Button onClickHandle={handleClick}>
							<i className="fa-solid fa-magnifying-glass"></i>
						</Button>
						<Button onClickHandle={handleClick}>
							<i className="fa-solid fa-pencil"></i>
						</Button>
						<Button onClickHandle={handleClick}>
							<i className="fa-solid fa-trash-can"></i>
						</Button>
					</div>
				</div>
				{selectedEntity === 'products' && <ProductsTable />}
				{selectedEntity === 'suppliers' && <SupplierTable />}
				{selectedEntity === 'purchases' && <PurchaseHistoryTable />}

				{selectedEntity === 'products' && isRegisterModalOpen && (
					<Modal onClose={closeModal} onSubmit={handleRegisterProductSubmit} title='Add product'>
						<div className='my-2'>
							<Input placeholder='Name' value={productName} onChange={setProductName} required={true} />
						</div>
						<div className='my-2'>
							<Input placeholder='Price' value={productPrice} onChange={setProductPrice} required={true} />
						</div>
						<div className='my-2'>
							<Input placeholder='Stock' value={productStock} onChange={setProductStock} required={true} />
						</div>
						<select
							value={selectedSupplier}
							onChange={(e) => setSelectedSupplier(e.target.value)}
							className="neumorphic-look p-2 rounded-2xl w-full outline-none"
							required={true}
						>
							<option value="" disabled>
								Select a Supplier
							</option>
							{suppliers.map((supplier) => (
								<option key={supplier.id} value={supplier.id}>
									{supplier.name}
								</option>
							))}
						</select>
					</Modal>
				)}

				{selectedEntity === 'suppliers' && isRegisterModalOpen && (
					<Modal onClose={closeModal} onSubmit={handleRegisterSupplierSubmit} title='Add supplier'>
						<div className='my-2'>
							<Input placeholder='Name' value={supplierName} onChange={setSupplierName} required={true} />
						</div>
						<div className='my-2'>
							<Input placeholder='Address' value={supplierAddress} onChange={setSupplierAddress} required={true} />
						</div>
						<div className='my-2'>
							<Input placeholder='Phone' value={supplierPhone} onChange={setSupplierPhone} required={false} />
						</div>
						<div className='my-2'>
							<Input placeholder='Email' value={supplierEmail} onChange={setSupplierEmail} required={false} />
						</div>
						<div className='my-2'>
							<Input placeholder='CNPJ' value={supplierCnpj} onChange={setSupplierCnpj} required={false} />
						</div>
					</Modal>
				)}
			</main>
		</div>
	)
}

export default App
