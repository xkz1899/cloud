import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { publicRoute, userRoute } from "./components/routes"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import Navigation from "./components/navigation/Navigation"
import { refresh } from "./actions/authAction"

const App = () => {
	const { isAuth } = useAppSelector(state => state.authSlice)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			dispatch(refresh())
		}
	}, [])

	return (
		<>
			<Navigation />
			{isAuth ? (
				<Routes>
					{userRoute.map(({ path, Element }) => (
						<Route key={path} path={path} element={<Element />} />
					))}
				</Routes>
			) : (
				<Routes>
					{publicRoute.map(({ path, Element }) => (
						<Route key={path} path={path} element={<Element />} />
					))}
				</Routes>
			)}
		</>
	)
}

export default App
