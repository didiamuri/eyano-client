import Link from 'next/link';
import React, { FC } from 'react'

interface LinkItem {
    title: string;
    icon: JSX.Element;
    path: string;
}

type Props = {
    item: LinkItem;
    open: boolean;
    route: string
}

const SidebarItemLink: FC<Props> = ({ item, open, route }) => {
    return (
        <Link href={item.path} legacyBehavior>
            <a className={`flex items-center ${open ? 'justify-start' : 'justify-center'} w-full ${route === item.path ? 'border-vodafone p-3 text-vodafone bg-slate-900' : 'border-transparent text-slate-300'} space-x-2 font-light px-5 cursor-pointer group xl:justify-start hover:text-vodafone border-l-[6px] `}>
                <span>{item.icon}</span>
                <h1 className={`group-hover:text-vodafone group-hover:font-light xl:flex ${open ? 'block' : 'hidden'}`}>{item.title}</h1>
            </a>
        </Link>
    )
}

export default SidebarItemLink