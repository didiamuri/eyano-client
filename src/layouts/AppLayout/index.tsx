import React, { Fragment, ReactNode } from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { HeadSeo } from '@src/components';
import { siteMetadata } from '@src/data/Metadata';

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Fragment>
      <HeadSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"Website"}
      />
      <div className='flex h-screen overflow-hidden bg-gray-100'>
        {/* sidebar */}
        <Sidebar open={open} setOpen={setOpen} />
        {/* content-area */}
        <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
          <Header open={open} setOpen={setOpen} />
          <main className='px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto'>
            {children}
          </main>
        </div>
      </div>
    </Fragment>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default AppLayout;
