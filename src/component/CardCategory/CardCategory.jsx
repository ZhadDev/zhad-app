import './CardCategory.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
	axiosDeleteCategory,
	axiosCreateCategory,
	axiosAllCategory,
} from '../redux/slice/category'
import useModal from '../hooks/useModal'
import Modal from '../Modal/Modal'
import { TextField, Button } from '@mui/material'

import { BiCategory } from 'react-icons/bi'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { AiTwotoneEdit, AiOutlinePlusSquare } from 'react-icons/ai'
import { setUbication } from '../redux/slice/users'

const TEXT_SAVE_BUTTON = 'GUARDAR'
const TEXT_UPDATE_BUTTON = 'EDITAR'
const TEXT_SAVE_TITLE = 'Guardar producto'
const TEXT_UPDATE_TITLE = 'Editar producto'

const CardCategory = _ => {
	const [isOpenModalCategory, openModalCategory, closeModalCategory] =
		useModal(false)
	const [nameBtn, setnameBtn] = useState(TEXT_SAVE_BUTTON)
	const [formCreateCatIdCategory, setFormCreateCatIdCategory] = useState(null)
	const [formCreateCatNameCategory, setFormCreateCatNameCategory] = useState('')

	const dispatch = useDispatch()
	const { list: categories } = useSelector(state => state.categories)

	const [titleModal, setTitleModal] = useState(TEXT_SAVE_TITLE)

	useEffect(() => {
		dispatch(axiosAllCategory())
	}, [dispatch])

	useEffect(() => {
		dispatch(setUbication('categories'))
	}, [])

	const editCategory = obj => {
		openModalCategory()
		setnameBtn(TEXT_UPDATE_BUTTON)
		setTitleModal(TEXT_UPDATE_TITLE)
		setFormCreateCatIdCategory(obj.id)
		setFormCreateCatNameCategory(obj.name)
	}

	const createCategory = _ => {
		openModalCategory()
		setnameBtn(TEXT_SAVE_BUTTON)
		setTitleModal(TEXT_SAVE_TITLE)
		setFormCreateCatIdCategory('')
		setFormCreateCatNameCategory('')
	}

	const deleteCategory = obj => {
		dispatch(axiosDeleteCategory(obj.id))
	}

	const modalOnChangeInput = event => {
		setFormCreateCatNameCategory(event.target.value)
	}

	const handleCreateCategory = _ => {
		setFormCreateCatNameCategory('')
		const requestConfg = {
			id:
				formCreateCatIdCategory !== null
					? parseInt(formCreateCatIdCategory)
					: formCreateCatIdCategory,
			name: formCreateCatNameCategory,
			state: 0,
		}
		dispatch(axiosCreateCategory(requestConfg))
		closeModalCategory()
	}

	return (
		<>
			<Modal isOpen={isOpenModalCategory} closeModal={closeModalCategory}>
				<div className='modal-title'>
					<h2>{titleModal}</h2>
				</div>
				<div className='form-saveCategory form-saveProd'>
					<TextField
						required
						id='category'
						name={'category'}
						label='Categoría'
						variant='standard'
						value={formCreateCatNameCategory}
						onChange={modalOnChangeInput}
					/>
					<div className='container-buttons'>
						<Button variant='contained' onClick={handleCreateCategory}>
							{nameBtn}
						</Button>
						<Button variant='outlined' onClick={closeModalCategory}>
							CANCELAR
						</Button>
					</div>
				</div>
			</Modal>
			<div className='container-new-item'>
				<Button
					className='ctgDelete'
					onClick={createCategory}
					startIcon={<AiOutlinePlusSquare />}
					variant='outlined'
				>
					CREAR NUEVA CATEGORÍA
				</Button>
			</div>
			{categories?.length !== undefined &&
				categories.map((category, index) => (
					<div className='containerCtgry' key={index}>
						<BiCategory className='ctgIcon' />
						<div className='ctgName'>{category.name}</div>
						<Button
							className='ctgEdit'
							onClick={() => editCategory(category)}
							variant='contained'
							startIcon={<AiTwotoneEdit />}
						>
							EDITAR
						</Button>
						<Button
							className='ctgDelete'
							onClick={() => deleteCategory(category)}
							color='error'
							variant='contained'
							startIcon={<RiDeleteBin2Fill />}
						>
							ELIMINAR
						</Button>
					</div>
				))}
		</>
	)
}

export default CardCategory
