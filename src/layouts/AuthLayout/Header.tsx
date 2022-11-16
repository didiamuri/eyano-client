import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const AuthHeader = () => {

    const router = useRouter();

    return (
        <header className="header sticky">
            <nav className="flex items-center justify-center sm:justify-between">
                <section className="flex items-center space-x-8">
                    <Link href="/" legacyBehavior>
                        <a>
                            <div className="flex items-center space-x-2">
                                <img
                                    width="48"
                                    height="48"
                                    src="/assets/img/logo.png"
                                    alt="logo"
                                    className="w-12 h-auto object-cover"
                                />
                            </div>
                        </a>
                    </Link>
                </section>
                <section className="hidden sm:flex items-center space-x-5">
                    {router.route === '/sign-up' &&
                        <div>You already have an account ?
                            <Link href={'/sign-in'} legacyBehavior>
                                <a className="text-vodafone"> Connectez-vous</a>
                            </Link>
                        </div>
                    }
                    {router.route === '/' &&
                        <div>You do not have an account ?
                            <Link href={'/sign-up'} legacyBehavior>
                                <a className="text-vodafone"> Register</a>
                            </Link>
                        </div>
                    }
                    {router.route === '/account-verification' &&
                        <div>Vous avez déjà un compte ?
                            <Link href={'/sign-in'} legacyBehavior>
                                <a className="text-vodafone"> Connectez-vous</a>
                            </Link>
                        </div>
                    }
                </section>
            </nav>
        </header>
    );
};

export default AuthHeader;
