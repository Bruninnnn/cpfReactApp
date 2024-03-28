import { MdDashboard, MdDataUsage } from "react-icons/md"


export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'home',
		label: 'Cadastro',
		path: '/home',
		icon: <MdDashboard size={24} />
	},
	{
		key: 'reports',
		label: 'Relatórios',
		path: '/reports',
		icon: <MdDataUsage size={24} />
	},
]

/* export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
] */