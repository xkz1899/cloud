import React from "react"
import st from "./Modal.module.scss"

interface IModal {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	children: React.ReactNode
}

const Modal = ({ visible, setVisible, children }: IModal) => {
	return visible ? (
		<div className={st.background} onClick={() => setVisible(false)}>
			<div onClick={e => e.stopPropagation()}>{children}</div>
		</div>
	) : (
		<></>
	)
}

export default Modal
