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

interface Product {
	id: string
	name: string
	price: string
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
		setPurchaseQuantity('')
		setPurchasePrice(0)
		setSelectedProduct('')
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
		fetchProducts()
	}, [])

	const [mainInputValue, setMainInputValue] = useState('')

	/**
	 * Add product
	 */
	const [productName, setProductName] = useState<string>('')
	const [productPrice, setProductPrice] = useState<string>('')
	const [productStock, setProductStock] = useState<string>('')
	const [productTableKey, setProductTableKey] = useState(0)
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

			setProductTableKey((prevKey) => prevKey + 1)
		} catch(err) {
			console.log(err)
		}
	}

	/**
	 * Add supplier
	 */
	const [supplierName, setSupplierName] = useState<string>('')
	const [supplierAddress, setSupplierAddress] = useState<string>('')
	const [supplierPhone, setSupplierPhone] = useState<string>('')
	const [supplierEmail, setSupplierEmail] = useState<string>('')
	const [supplierCnpj, setSupplierCnpj] = useState<string>('')
	const [supplierTableKey, setSupplierTableKey] = useState<number>(0)
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

			setSupplierTableKey((prevKey) => prevKey + 1)
		} catch(err) {
			console.log(err)
		}
	}

	const [products, setProducts] = useState<Product[]>([])
	const [selectedProduct, setSelectedProduct] = useState('')

	const fetchProducts = async () => {
		try {
			const response = await api.get<Product[]>('/products')
			setProducts(response.data)
		} catch(err) {
			console.log(err)
		}
	}

	/**
	 * Add purchase
	 */
	const [purchaseQuantity, setPurchaseQuantity] = useState<string>('')
	const [purchasePrice, setPurchasePrice] = useState<number>(0)
	const [purchaseTableKey, setPurchaseTableKey] = useState<number>(0)

	// Automatically update total purchase price
	useEffect(() => {
		const product = products.find((p) => p.id == selectedProduct)
		const quantity = parseInt(purchaseQuantity, 10)

		if (product && !isNaN(quantity)) {
			const price = parseFloat(product.price)
			setPurchasePrice(price * quantity)
		} else {
			setPurchasePrice(0)
		}
	}, [selectedProduct, purchaseQuantity, products])
	

	const handleRegisterPurchaseSubmit = async (e: any) => {
		e.preventDefault()

		const purchaseData = {
			productId: selectedProduct,
			supplierId: selectedSupplier,
			quantity: purchaseQuantity,
		}

		try {
			const response = await api.post('/purchases', purchaseData)
			console.log(response)
			setPurchaseQuantity('')
			setPurchasePrice(0)
			setSelectedProduct('')
			setSelectedSupplier('')
			setIsRegisterModalOpen(false)

			setPurchaseTableKey((prevKey) => prevKey + 1)
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
					<div className='w-full flex justify-center'>
						<Button onClickHandle={openModal}>
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
				{selectedEntity === 'products' && <ProductsTable key={productTableKey} />}
				{selectedEntity === 'suppliers' && <SupplierTable key={supplierTableKey} />}
				{selectedEntity === 'purchases' && <PurchaseHistoryTable key={purchaseTableKey} />}

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

				{selectedEntity === 'purchases' && isRegisterModalOpen && (
					<Modal onClose={closeModal} onSubmit={handleRegisterPurchaseSubmit} title='Add a purchase'>
						<div className='my-2'>
							<select
								value={selectedProduct}
								onChange={(e) => setSelectedProduct(e.target.value)}
								className="neumorphic-look p-2 rounded-2xl w-full outline-none"
								required={true}
							>
								<option value="" disabled>
									Select a product
								</option>
								{products.map((product) => (
									<option key={product.id} value={product.id}>
										{product.name}
									</option>
								))}
							</select>
						</div>

						<div className='my-2'>
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
						</div>

						<div className='my-2'>
							<Input placeholder='Quantity' value={purchaseQuantity} onChange={setPurchaseQuantity} required={false} />
						</div>

						<div className='my-2'>
							<input type="text" placeholder='Total' value={purchasePrice.toFixed(2)} className='neumorphic-look p-2 rounded-2xl w-full outline-none border-none transition-all' readOnly />
						</div>
					</Modal>
				)}
			</main>
		</div>
	)
}

export default App
