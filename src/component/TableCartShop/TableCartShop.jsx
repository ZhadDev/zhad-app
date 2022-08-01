import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import './TableCartShop.css'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { deleteCarShop } from '../redux/slice/carShop'

/** ICONOS */
import { RiDeleteBin2Fill } from 'react-icons/ri'

/* ASIGNADO VALORES POR DEFECTO */
const IVA = 19
const SUBTOTAL = 0
const TOTAL_IMPUESTO = 0
const VALOR_A_PAGAR = 0

function TableCartShop(props) {
	const dispatch = useDispatch()
	const { list: listShop } = useSelector(state => state.addCarShop)
	const [impTotal, setimpTotal] = useState({
		IVA,
		TOTAL: SUBTOTAL,
		TOTAL_IMP: TOTAL_IMPUESTO,
		TTL_VLR: VALOR_A_PAGAR,
	})

	const impuestoTotal = _ => {
		let cont = 0
		for (let index = 0; index < listShop.length; index++) {
			const items = listShop[index]
			cont = cont + items.vlrTtl
		}
		const impTot = (IVA * cont) / 100
		const deuda = cont + impTot

		setimpTotal({ IVA, TOTAL: cont, TOTAL_IMP: impTot, TTL_VLR: deuda })
	}

	useEffect(() => {
		impuestoTotal()
	}, [listShop])

	const deleteItemShops = obj => {
		const res = listShop.filter(item => {
			return item.id !== obj.id
		})
		dispatch(deleteCarShop(res))
	}

	const onBuy = _ => {
		// eslint-disable-next-line react/prop-types
		props.closeModalShop()
		dispatch(deleteCarShop([]))
		// eslint-disable-next-line react/prop-types
		props.buyDone(true)
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='spanning table'>
					<TableHead>
						<TableRow>
							<TableCell align='center' colSpan={4}>
								Detalles
							</TableCell>
							<TableCell align='right'>Precio</TableCell>
							<TableCell align='right'>Opción</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align='center'>Imagen.</TableCell>
							<TableCell align='left'>Nombre</TableCell>
							<TableCell align='center'>Vlr Unitario</TableCell>
							<TableCell align='center'>Cantidad</TableCell>
							<TableCell align='center'>Vlr Total</TableCell>
							<TableCell align='center'>Eliminar</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{listShop.map((row, index) => (
							<TableRow key={index}>
								<TableCell align='center'>
									<img src={row.img} width={40} height={35} />
								</TableCell>
								<TableCell align='left'>{row.name}</TableCell>
								<TableCell align='center'>{row.vlrUni}</TableCell>
								<TableCell align='center'>{row.cnt}</TableCell>
								<TableCell align='center'>{row.vlrTtl}</TableCell>
								<TableCell align='center'>
									<div onClick={() => deleteItemShops(row)}>
										<RiDeleteBin2Fill />
									</div>
								</TableCell>
							</TableRow>
						))}
						<TableRow>
							<TableCell colSpan={2}>Subtotal</TableCell>
							<TableCell align='right'>{impTotal.TOTAL}</TableCell>
							<TableCell rowSpan={3} colSpan={3}>
								<div className={'container-shop-btn'}>
									<Button
										className={'btn-shp-item'}
										variant='contained'
										onClick={onBuy}
									>
										Comprar
									</Button>
									<Button
										className={'btn-shp-item'}
										variant='outlined'
										// eslint-disable-next-line react/prop-types
										onClick={props.closeModalShop}
									>
										Cancelar
									</Button>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>IVA</TableCell>
							<TableCell align='right'>{`${impTotal.IVA} %`}</TableCell>
							<TableCell align='right'>{impTotal.TOTAL_IMP}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell align='right'>{impTotal.TTL_VLR}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default TableCartShop
