import React from "react"
import st from "./Container.module.scss"

interface IContainer {
	children: React.ReactNode
}

const Container = ({ children }: IContainer) => {
	return <div className={st.container}>{children}</div>
}

export default Container
