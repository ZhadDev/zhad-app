import './cardProduct.css'
import { useEffect, useState, useRef } from 'react'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import {
	axiosAllProducts,
	axiosDeleteProduct,
	axiosCreateProduct,
} from '../../component/redux/slice/products'
import { axiosAllCategory } from '../redux/slice/category'
import { addCarShop } from '../../component/redux/slice/carShop'

import { setUbication } from '../redux/slice/users'

import Modal from '../Modal/Modal'
import useModal from '../hooks/useModal'
import TextField from '@mui/material/TextField'
import { InputLabel, Button } from '@mui/material'

/** ICONOS */
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { AiTwotoneEdit, AiOutlinePlusSquare } from 'react-icons/ai'

const URL_IMAGE_DEAFULT =
	'https://www.mifaja.com/image/fotos_productos/producto-default.jpg'
const TEXT_SAVE_BUTTON = 'GUARDAR'
const TEXT_UPDATE_BUTTON = 'EDITAR'
const TEXT_SAVE_TITLE = 'Guardar producto'
const TEXT_UPDATE_TITLE = 'Editar producto'

const CardProduct = _ => {
	const rdxUser = useSelector(state => state.users)
	const { list: products } = useSelector(state => state.products)
	const { selectCtgy: optionSelCat } = useSelector(state => state.categories)
	const dispatch = useDispatch()

	/* ESTADOS DE PRODUCTOS EN LOCAL */
	const [formCreateIdProduct, setFormCreateIdProduct] = useState(null)
	const [formCreateAmount, setFormCreateAmount] = useState(0)
	const [formCreateIcon, setFormCreateIcon] = useState('')
	const [formCreateIdCategory, setFormCreateIdCategory] = useState(0)
	const [formCreateName, setFormCreateName] = useState('')
	const [formCreatePrice, setFormCreatePrice] = useState(0)
	const [quantyPrd, setQuantyPrd] = useState('0')
	const [disabled, setDisabled] = useState(false)
	const [productsFilter, setProductsFilter] = useState([])

	const [urlImage, setUrlImage] = useState(URL_IMAGE_DEAFULT)

	const [searchInput, setSearchInput] = useState('')

	const refQuanty = useRef()

	const [nameBtn, setnameBtn] = useState(TEXT_SAVE_BUTTON)
	const [titleModal, setTitleModal] = useState(TEXT_SAVE_TITLE)

	const [isOpenModalProduct, openModalProduct, closeModalProduct] =
		useModal(false)

	const formatterPeso = new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0,
	})

	useEffect(() => {
		dispatch(axiosAllCategory())
		dispatch(axiosAllProducts())
		dispatch(setUbication('products'))
	}, [])

	useEffect(() => {
		setProductsFilter(products)
	}, [products])

	const desc = `Unidades en stock`

	const handleChangeInput = e => {
		if (parseInt(e.target.value) < 1) {
			setDisabled(true)
		}
		setQuantyPrd(e.target.value)
	}

	const deleteProductId = data => {
		const { id } = data
		dispatch(axiosDeleteProduct(id))
	}

	const addItemCard = obj => {
		const itemProduct = {
			id: obj.id,
			img: obj.icon,
			name: obj.name,
			vlrUni: obj.price,
			cnt: quantyPrd,
			vlrTtl: obj.price * quantyPrd,
		}

		dispatch(addCarShop(itemProduct))
	}

	const modalOnChangeInput = event => {
		const nameType = event.target.name
		const value = event.target.value

		switch (nameType) {
			case 'amount':
				setFormCreateAmount(value)
				break
			case 'icon':
				setFormCreateIcon(value)
				setUrlImage(value)
				break
			case 'name':
				setFormCreateName(value)
				break
			case 'price':
				setFormCreatePrice(value)
				break
			default:
				break
		}
	}

	const handleCreateProduct = _ => {
		const requestConfg = {
			id:
				formCreateIdProduct !== null
					? parseInt(formCreateIdProduct)
					: formCreateIdProduct,
			amount: parseFloat(formCreateAmount),
			icon: formCreateIcon,
			idCategory: parseInt(formCreateIdCategory),
			name: formCreateName,
			price: parseFloat(formCreatePrice),
			product_register: null,
		}
		dispatch(axiosCreateProduct(requestConfg))
		closeModalProduct()
	}

	const editProduct = obj => {
		openModalProduct()

		setTitleModal(TEXT_UPDATE_TITLE)
		setnameBtn(TEXT_UPDATE_BUTTON)
		setFormCreateIdProduct(obj.id)
		setFormCreateAmount(obj.amount)
		setFormCreateIdCategory(obj.id)
		setFormCreateIcon(obj.icon)
		setUrlImage(obj.icon)
		setFormCreateName(obj.name)
		setFormCreatePrice(obj.price)
	}

	const cleanForm = _ => {
		setnameBtn(TEXT_SAVE_BUTTON)
		setTitleModal(TEXT_SAVE_TITLE)
		setFormCreateIdProduct('')
		setFormCreateAmount('')
		setFormCreateIdCategory('')
		setFormCreateIcon('')
		setFormCreateName('')
		setFormCreatePrice('')
	}

	const onChangeSelectCategory = obj => {
		setFormCreateIdCategory(obj.value)
	}

	const getNameCategory = idCategory => {
		const categorySelected = optionSelCat.find(Obj => Obj.value === idCategory)
		return categorySelected !== undefined
			? // eslint-disable-next-line dot-notation
			  categorySelected['label']
			: 'Sin categoría'
	}

	const onErrorImage = _ => {
		setUrlImage(URL_IMAGE_DEAFULT)
	}

	const onSearchInput = event => {
		const value = event.target.value
		setSearchInput(value)
		let listFilter = []
		if (value === '') {
			listFilter = products
		} else {
			listFilter = products.filter(
				product =>
					product.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
			)
		}
		setProductsFilter(listFilter)
	}

	const createNewProduct = _ => {
		openModalProduct()
		cleanForm()
	}

	return (
		<>
			<Modal isOpen={isOpenModalProduct} closeModal={closeModalProduct}>
				<div className='modal-title'>
					<h2>{titleModal}</h2>
				</div>
				<div className='form-saveProd'>
					<div className='container-image'>
						<img src={urlImage} onError={onErrorImage} />
					</div>
					<InputLabel htmlFor='selectCategories'>Categoría</InputLabel>
					<Select
						name='selectCategories'
						options={optionSelCat}
						onChange={onChangeSelectCategory}
					/>
					<TextField
						required
						id='name'
						name={'name'}
						label='Nombre'
						variant='standard'
						value={formCreateName}
						onChange={modalOnChangeInput}
					/>
					<TextField
						required
						id='price'
						name={'price'}
						label='Precio'
						variant='standard'
						value={formCreatePrice}
						onChange={modalOnChangeInput}
						type='number'
					/>
					<TextField
						required
						id='amount'
						name={'amount'}
						label='Cantidad en inventario'
						variant='standard'
						value={formCreateAmount}
						onChange={modalOnChangeInput}
						type='number'
					/>
					<TextField
						required
						id='icon'
						name={'icon'}
						label='Imagen'
						variant='standard'
						value={formCreateIcon}
						onChange={modalOnChangeInput}
					/>
					<div className='container-buttons'>
						<Button variant='contained' onClick={handleCreateProduct}>
							{nameBtn}
						</Button>
						<Button variant='outlined' onClick={closeModalProduct}>
							Cancelar
						</Button>
					</div>
				</div>
			</Modal>
			<div className='container-new-item'>
				<Button
					onClick={createNewProduct}
					startIcon={<AiOutlinePlusSquare />}
					variant='outlined'
				>
					CREAR NUEVO PRODUCTO
				</Button>
			</div>
			<div className='container-search'>
				<TextField
					id='search'
					name={'search'}
					label='Buscar productos'
					variant='outlined'
					value={searchInput}
					onChange={onSearchInput}
				/>
			</div>
			{productsFilter.length > 0 &&
				productsFilter.map((product, index) => (
					<div className='container' key={index}>
						<div className={`container-zIcon`}>
							<img className='ico-pro' src={product.icon} />
						</div>
						<div className={`btnsPrd ${rdxUser.auth && 'display-none'}`}>
							<button
								onClick={() => deleteProductId(product)}
								className={'btn-ico-color-delete'}
							>
								<div className='btn-icon'>
									<RiDeleteBin2Fill className='iconShop' />
									<label htmlFor=''></label>
								</div>
							</button>
							<button
								onClick={() => editProduct(product)}
								className={'btn-ico-color-edit'}
							>
								<div className='btn-icon'>
									<AiTwotoneEdit className='iconShop' />
									<label htmlFor=''></label>
								</div>
							</button>
						</div>
						<label className='container-zCategory'>
							{getNameCategory(product.idCategory)}
						</label>
						<label className='container-zName'>{product.name} </label>
						<label className='container-zPrice'>
							{formatterPeso.format(product.price)}
						</label>
						<label className='container-zDesc'>
							{`${product.amount} ${desc}`}
						</label>
						<div className='container-zBtn'>
							<button
								className='addCart'
								disabled={disabled}
								onClick={() => addItemCard(product)}
							>
								<div className='btn-icon'>
									<MdOutlineAddShoppingCart className='iconShop' />
									<label htmlFor=''>Agregar</label>
								</div>
							</button>
							<input
								className='quantityPrd'
								type='number'
								value={quantyPrd}
								onChange={handleChangeInput}
								min='1'
								max={product.amount}
								ref={refQuanty}
							/>
						</div>
					</div>
				))}
		</>
	)
}

export default CardProduct
