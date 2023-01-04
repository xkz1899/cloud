import { IRoute } from "../models/IRoute"
import Login from "../pages/login/Login"
import Registration from "../pages/registration/Registration"
import Disk from "./../pages/disk/Disk"
import Greeting from "./../pages/greeting/Greeting"

import { GREETING_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from "../utils/consts"
import { REGISTRATION_ROUTE } from "./../utils/consts"

export const publicRoute: IRoute[] = [
	{ path: GREETING_ROUTE, Element: Greeting },
	{ path: LOGIN_ROUTE, Element: Login },
	{ path: REGISTRATION_ROUTE, Element: Registration },
	{ path: "*", Element: Login },
]

export const userRoute: IRoute[] = [
	{ path: MAIN_ROUTE, Element: Disk },
	{ path: "*", Element: Disk },
]
