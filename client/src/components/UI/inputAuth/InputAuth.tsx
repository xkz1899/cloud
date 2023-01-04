import React from "react"
import st from "./InputAuth.module.scss"

const Input = ({ ...props }) => {
	return <input className={st.input} {...props} />
}

export default Input
