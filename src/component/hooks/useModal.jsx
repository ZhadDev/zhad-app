import { useState } from 'react'

const useModal = (initialValue = false) => {
	const [isOpen, setIsOpen] = useState(initialValue)

	const openModal = _ => setIsOpen(true)
	const closeModal = _ => setIsOpen(false)

	return [isOpen, openModal, closeModal]
}

export default useModal
