import React, { FC } from 'react'
import { MdBugReport, MdDashboard, MdHelp, MdInventory, MdMail, MdManageAccounts, MdNotificationsActive, MdSettings, MdTopic } from 'react-icons/md'
import { HiLightBulb } from 'react-icons/hi'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SidebarItemLink from '../SidebarItemLink'
import { RiCloseFill } from 'react-icons/ri'

type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: FC<Props> = ({ open, setOpen }) => {

  const trigger = React.useRef<any>(null);
  const sidebar = React.useRef<any>(null);
  const router = useRouter();

  const storedSidebarExpanded = typeof window !== 'undefined' ? localStorage.getItem('sidebar-expanded') : null;
  const [sidebarExpanded, setSidebarExpanded] = React.useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  React.useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!sidebar.current || !trigger.current) return;
      if (!open || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  React.useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!open || keyCode !== 27) return;
      setOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sidebar-expanded', sidebarExpanded as any);
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const menuItems = [
    {
      title: "Tableau de bord",
      icon: <MdDashboard className='nav-icon' />,
      path: '/dashboard'
    },
    {
      title: "Ventures",
      icon: <HiLightBulb className='nav-icon' />,
      path: '/my-ventures'
    },
    {
      title: "Applications",
      icon: <MdTopic className='nav-icon' />,
      path: '/applications'
    },
    {
      title: "Messages",
      icon: <MdMail className='nav-icon' />,
      path: '/messages'
    },
    {
      title: "Notifications",
      icon: <MdNotificationsActive className='nav-icon' />,
      path: '/messages'
    },
    {
      title: "Gestion de projets",
      icon: <MdInventory className='nav-icon' />,
      path: '/projects-management'
    },
    {
      title: "Utilisateurs",
      icon: <MdManageAccounts className='nav-icon' />,
      path: '/users-management'
    },
  ];

  const buttonMenuItem = [
    {
      title: "Paramètres",
      icon: <MdSettings className='nav-icon' />,
      path: '/settings'
    },
    {
      title: "Aide & Support",
      icon: <MdHelp className='nav-icon' />,
      path: '/support'
    },
    {
      title: "Signaler un problème",
      icon: <MdBugReport className='nav-icon' />,
      path: '/support'
    },
  ];

  return (
    <div>
      {/* sidebar mobile only */}
      <div className={`fixed inset-0 bg-slate-900 text-slate-100 bg-opacity-30 lg:hidden transition-opacity duration-200 ${open ? 'opacity-75 z-40' : 'opacity-0 z-auto pointer-events-none'}`} aria-hidden="true"></div>
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col justify-start text-slate-100 items-start shadow absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-16 md:w-16 lg:sidebar-expanded:!w-64 xl:!w-72 shrink-0 bg-slate-800 py-4 transition-all duration-200 ease-in-out ${open ? 'translate-x-0 md:w-72 w-72' : '-translate-x-64'}`}
      >
        {/* sidebar header */}
        <div className='flex justify-between mb-10 pr-3 sm:px-2'>
          <button
            ref={trigger}
            className='lg:hidden absolute top-2 right-4 text-slate-300 rounded-full text-2xl hover:text-slate-400'
            onClick={() => setOpen(!open)}
            aria-controls="sidebar"
            aria-expanded={open}
          >
            <span className='sr-only'>Close sidebar</span>
            <RiCloseFill />
          </button>
          {/* logo */}
          <Link href='/' className='block' legacyBehavior>
            <a className={`flex items-center gap-2 ${open ? 'px-5' : 'px-2 xl:px-5'}`}>
                <img src="/assets/images/logo/logo.png" className={`hidden xl:block ${open ? 'block' : ''}`} alt="logo" />
                <img src="/assets/images/logo/icon.png" className={`xl:hidden block ${open ? 'block xl:block' : ''} w-14 xl:w-14 xl:h-14`} alt="logo" />
            </a>
          </Link>
        </div>
        {/* links */}
        <div className='flex flex-col flex-1 w-full py-8 space-y-5 gap-0.5'>
          {menuItems.slice(0, 5).map((item, index) => (
            <SidebarItemLink key={index} item={item} open={open} route={router.route} />
          ))}
          <div className='w-full border-t border-gray-400'></div>
          {menuItems.slice(5).map((item, index) => (
            <SidebarItemLink key={index} item={item} open={open} route={router.route} />
          ))}
        </div>
        <div className='xl:flex flex-col items-center w-full justify-start space-y-4 mb-5'>
          <div className='w-full border-t border-gray-400'></div>
          {buttonMenuItem.map((item, index) => (
            <SidebarItemLink key={index} item={item} open={open} route={router.route} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar