import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { refresh } from "./actions/authAction"
import Navigation from "./components/navigation/Navigation"
import { publicRoute, userRoute } from "./components/routes"
import { useAppDispatch, useAppSelector } from "./hooks/redux"

const App = () => {
	const { isAuth } = useAppSelector(state => state.authSlice)
	const dispatch = useAppDispatch()

	useEffect(() => {
		localStorage.getItem("accessToken") && dispatch(refresh())
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
