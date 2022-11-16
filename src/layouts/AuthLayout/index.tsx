import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

interface AuthLayoutProps {
    children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="mx-auto overflow-hidden bg-[#fbf8f6] ">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}

AuthLayout.propTypes = {
    children: PropTypes.node
};

export default AuthLayout