import React, { FC, Fragment } from 'react'
import { Avatar, Dropdown } from 'flowbite-react'
import { MdDashboard, MdLockOpen, MdMail, MdNotificationsActive, MdSearch, MdSettings, MdTopic } from 'react-icons/md'
import { RiMenu3Fill } from 'react-icons/ri'
import { AppContext } from '@src/contexts/AppContext'

type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<Props> = ({ open, setOpen }) => {

  const [searchModalOpen, setSearchModalOpen] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<any>(null)

  const { getUserData } = React.useContext(AppContext);

  React.useEffect(() => {
    const user = getUserData();
    setUser(user);
  }, []);

  return (
    <Fragment>
      <header className='sticky top-0 bg-white border-b border-slate-200 z-30'>
        <div className='px-4 py-2 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16 -mb-px'>
            {/* header left side */}
            <div className='flex'>
              <button
                className="text-slate-500 hover:text-slate-600 lg:hidden"
                aria-controls="sidebar"
                aria-expanded={open}
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
              >
                <span className="sr-only">Open sidebar</span>
                <RiMenu3Fill size={25} className='text-vodafone' />
              </button>
              <div>
                <form className='w-full hidden lg:block'>
                  <div className='relative'>
                    <MdSearch className='absolute left-2 top-3' />
                    <input
                      type='text'
                      placeholder='Rechercher...'
                      className='bg-gray-100 py-2 pl-8 pr-4 outline-none rounded-lg border-none w-full'
                    />
                  </div>
                </form>
                <button
                  className={`w-8 h-8 flex lg:hidden items-center justify-center bg-vodafone text-white hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${searchModalOpen && 'bg-slate-200'}`}
                  onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); }}
                  aria-controls="search-modal"
                >
                  <span className="sr-only">Search</span>
                  <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current text-slate-50" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path className="fill-current text-slate-100" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                  </svg>
                </button>
              </div>
            </div>
            {/* header side */}
            <div className='flex items-center space-x-3'>
              <button className='relative p-2 bg-gray-100 rounded-lg'>
                <MdMail size={20} className='text-vodafone' />
                <div className='absolute flex items-center justify-center rounded-full right-0 top-0 text-[12px] bg-red-500 text-white p-2 w-3 h-3'>
                  <span>5</span>
                </div>
              </button>
              <button className='relative p-2 bg-gray-100 rounded-lg'>
                <MdNotificationsActive size={20} className='text-vodafone' />
                <div className='absolute flex items-center justify-center rounded-full right-0 top-0 text-[12px] bg-red-500 text-white p-2 w-3 h-3'>
                  <span>8</span>
                </div>
              </button>
              <div className='flex items-center justify-between sm:p-2 rounded-lg sm:hover:bg-gray-100'>
                <Dropdown
                  label={
                    <Avatar img='/assets/img/avatar1.png' status='online' statusPosition='top-right' size="sm">
                      <div className='sm:flex flex-col items-start justify-start hidden'>
                        <div className='font-bold text-md m-0 p-0'>{user?.firstName?.concat(' ').concat(user?.lastName)}</div>
                        <div className='font-light text-sm text-gray-500 m-0 p-0'>Project Manager</div>
                      </div>
                    </Avatar>
                  }
                  arrowIcon={true}
                  inline={true}
                >
                  <div className=''>
                    <Dropdown.Header>
                      <span className="block font-bold text-lg">
                      {user?.firstName?.concat(' ')?.concat(user?.lastName)}
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {user?.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item icon={MdDashboard}>
                      Tableau de bord
                    </Dropdown.Item>
                    <Dropdown.Item icon={MdTopic}>
                      Mes applications
                    </Dropdown.Item>
                    <Dropdown.Item icon={MdMail}>
                      Messages
                    </Dropdown.Item>
                    <Dropdown.Item icon={MdSettings}>
                      Paramètres du compte
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item icon={MdLockOpen}>
                      Se déconnecter
                    </Dropdown.Item>
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  )
}

export default Header