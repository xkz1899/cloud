import { IRoute } from "../models/IRoute"
import Login from "../pages/login/Login"
import Registration from "../pages/registration/Registration"
import Disk from "./../pages/disk/Disk"

import { LOGIN_ROUTE, MAIN_ROUTE, USER_ROUTER } from "../utils/consts"
import { REGISTRATION_ROUTE } from "./../utils/consts"
import User from "./../pages/user/User"

export const publicRoute: IRoute[] = [
	{ path: LOGIN_ROUTE, Element: Login },
	{ path: REGISTRATION_ROUTE, Element: Registration },
	{ path: "*", Element: Login },
]

export const userRoute: IRoute[] = [
	{ path: MAIN_ROUTE, Element: Disk },
	{ path: USER_ROUTER, Element: User },
	{ path: "*", Element: Disk },
]
