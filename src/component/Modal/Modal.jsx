import './Modal.css'
import ReactDOM from 'react-dom'

import { useEffect } from 'react'

// eslint-disable-next-line react/prop-types
const Modal = ({ children, isOpen, closeModal }) => {
	const handleModalClick = event => event.stopPropagation()
	const container = document.getElementById('portal-root')

	useEffect(() => {
		const closeOnEscapeKey = e => (e.key === 'Escape' ? closeModal() : null)
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [closeModal])

	const body = (
		<article className={`modal ${!!isOpen && 'is-open'}`} onClick={closeModal}>
			<div className='modal-container' onClick={handleModalClick}>
				<button className='modal-close' onClick={closeModal}>
					X
				</button>
				{children}
			</div>
		</article>
	)

	return ReactDOM.createPortal(body, container)
}

export default Modal
