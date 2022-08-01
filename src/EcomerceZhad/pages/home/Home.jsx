import './Home.css'
import './ProductModal.css'
import CardProduct from '../../../component/CardProduct/CardProduct'
import CardCategory from '../../../component/CardCategory/CardCategory'
import { useEffect, useState } from 'react'
import Modal from '../../../component/Modal/Modal'
import useModal from '../../../component/hooks/useModal'
import { useSelector, useDispatch } from 'react-redux'
import { setUserAuth } from '../../../component/redux/slice/users'
import TableCartShop from '../../../component/TableCartShop/TableCartShop'
import { IMAGE } from '../../../common/theme/imgIndex'
import { Button } from '@mui/material'

import { MdAdminPanelSettings, MdOutlineAddShoppingCart } from 'react-icons/md'
import { FaProductHunt } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi'

import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function Home() {
	const dispatch = useDispatch()
	const rdxUser = useSelector(state => state.users)
	const { list: listShop } = useSelector(state => state.addCarShop)
	const [isOpenModalShop, openModalShop, closeModalShop] = useModal(false)
	const [showCategories, setShowCategories] = useState(false)
	const [open, setOpen] = useState(false)

	const userAdmin = _ => {
		dispatch(setUserAuth(!rdxUser.auth))
		showCategories && setShowCategories(false)
	}

	const showCateg = _ => {
		setShowCategories(true)
	}

	const showProduct = _ => {
		setShowCategories(false)
	}

	const handleClose = _ => {
		setOpen(false)
	}

	const buyDone = bool => {
		setOpen(bool)
	}

	useEffect(() => {}, [])

	return (
		<>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
					Compra realizada exitosamente!
				</Alert>
			</Snackbar>
			<Modal isOpen={isOpenModalShop} closeModal={closeModalShop}>
				{listShop.length > 0 ? (
					<>
						<br />
						<br />
						<TableCartShop closeModalShop={closeModalShop} buyDone={buyDone} />
					</>
				) : (
					<div>
						<br />
						<br /> No hay elmentos en este momento en el carrito
					</div>
				)}
			</Modal>
			<div className='container-home'>
				<div className='navBar-component'>
					<div className='navCont'>
						<img src={IMAGE.LOGO} width={250} height={120} alt='logo2' />
					</div>
					<div>
						<div className='footer-top'></div>
						<div className='sc-hd-line'></div>
						<div className='footer-bottom'>
							<Button
								onClick={userAdmin}
								variant='contained'
								startIcon={<MdAdminPanelSettings />}
							>
								<label>Administrador</label>
							</Button>
							<Button
								className={`${
									rdxUser.ubication === 'products' || rdxUser.auth
										? 'display-none'
										: ''
								}`}
								onClick={showProduct}
								variant='contained'
								startIcon={<FaProductHunt />}
							>
								CRUD PRODUCTO
							</Button>
							<Button
								className={`${
									rdxUser.ubication === 'categories' || rdxUser.auth
										? 'display-none'
										: ''
								}`}
								onClick={showCateg}
								variant='contained'
								startIcon={<BiCategory />}
							>
								CRUD CATEGORIA
							</Button>
							<Button
								onClick={openModalShop}
								variant='contained'
								startIcon={<MdOutlineAddShoppingCart />}
								className={`${!rdxUser.auth && 'display-none'}`}
							>
								CARRITO DE COMPRA
							</Button>
						</div>
					</div>
				</div>
				<div className='body-component'>
					{showCategories ? <CardCategory /> : <CardProduct />}
				</div>
				<div className='footer-component'></div>
			</div>
		</>
	)
}

export default Home
