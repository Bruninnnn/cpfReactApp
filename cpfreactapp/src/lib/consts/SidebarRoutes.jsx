import { MdDashboard, MdDataUsage } from "react-icons/md"
import { TbPigMoney } from "react-icons/tb"
import { VscDebugDisconnect } from "react-icons/vsc"


export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Cadastro',
		path: '/dashboard',
		icon: <MdDashboard size={24} />
	},
	{
		key: 'reports',
		label: 'Relatórios',
		path: '/dashboard/reports',
		icon: <MdDataUsage size={24} />
	},
	{
		key: 'openfinance',
		label: 'OpenFinance',
		path: '/dashboard/openfinance',
		icon: <VscDebugDisconnect size={24} />
	},
	{
		key: 'metas',
		label: 'Metas',
		path: '/dashboard/metas',
		icon: <TbPigMoney size={24} />
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