import { BASE_URL, LOCAL_BASE_URL } from '@src/constants/config';
import { ISignUpBody } from '@src/interfaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, ReactNode, createContext } from 'react';
import { toast } from 'react-toastify';

type AppContextType = {
    sidebarToggle: any;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    handleSignup: () => void;
    handleVerifyEmail: () => void;
    handleResendOtp: () => void;
    handleVerifyOtp: (otp: number) => void;
    getUserData: () => void;
    handleSignin: (email: string, password: string) => void;
    signupBody: ISignUpBody;
    setSignupBody: React.Dispatch<React.SetStateAction<ISignUpBody>>;
    onEmailKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, emailField: React.MutableRefObject<any>, passwordField: React.MutableRefObject<any>) => void;
    onPasswordKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, emailField: React.MutableRefObject<any>, passwordField: React.MutableRefObject<any>) => void;
    isLoading: boolean;
    delay: number;
    setDelay: React.Dispatch<React.SetStateAction<number>>;
    isLoadingResendOtp: boolean;
    verificationKey: string | undefined;
};

type Props = {
    children: ReactNode;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = ({ children }: Props) => {

    const [sidebarToggle, setSidebarToggle] = useState(false);
    const toggleSidebar = () => setSidebarToggle(!sidebarToggle);
    const closeSidebar = () => setSidebarToggle(false);

    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingResendOtp, setIsLoadingResendOtp] = React.useState<boolean>(false);
    const [signupBody, setSignupBody] = React.useState<ISignUpBody>({ firstname: '', name: '', email: '', password: '' });
    const [verificationKey, setVerificationKey] = React.useState<string>();

    const [delay, setDelay] = React.useState(120);

    const getUserData = () => {
        const data = typeof window !== "undefined" ? sessionStorage.getItem('userData') : null;
        const parsed = data ? JSON.parse(data as any) : null;
        return parsed;
    }

    const setUserData = (data: object) => typeof window !== "undefined" ? sessionStorage.setItem('userData', JSON.stringify(data)) : null;

    const handleVerifyEmail = async () => {

        if (!signupBody.name || !signupBody.firstname.length || !signupBody.email.length || !signupBody.password) {
            toast.warning("Veuillez replir tous les champs du formulaire", { autoClose: 5000 });
            return;
        }

        setIsLoading(true);
        await axios.post(`${LOCAL_BASE_URL}/otp/check-email`, { email: signupBody.email, type: 'VERIFICATION' })
            .then(res => {
                setIsLoading(false);
                setVerificationKey(JSON.stringify(res.data?.item));
                router.push({ pathname: '/account-verification' }, undefined, { shallow: true });
            })
            .catch(e => {
                setIsLoading(false);
                toast.error(e?.response?.data?.message, { autoClose: 5000 });
            })
    }

    const handleResendOtp = async () => {
        setIsLoadingResendOtp(true);
        await axios.post(`${LOCAL_BASE_URL}/otp/check-email`, { email: signupBody.email, type: 'VERIFICATION' })
            .then(res => {
                setIsLoadingResendOtp(false);
                setVerificationKey(JSON.stringify(res.data?.item));
                setDelay(120);
            })
            .catch(e => {
                setIsLoadingResendOtp(false);
                toast.error(e?.response?.data?.message, { autoClose: 5000 });
            })
    }

    const handleVerifyOtp = async (otp: number) => {
        setIsLoading(true);
        await axios.post(`${LOCAL_BASE_URL}/otp/verify`, { verificationKey: verificationKey, check: signupBody.email, otp: otp })
            .then(res => {
                handleSignup();
            })
            .catch(e => {
                setIsLoading(false);
                toast.error(e?.response?.data?.message, { autoClose: 5000 });
                console.log(e);
            })
    }

    const handleSignup = async () => {
        const body = {
            firstName: signupBody.firstname,
            lastName: signupBody.name,
            email: signupBody.email,
            password: signupBody.password,
            verified: true
        }
        await axios.post(`${LOCAL_BASE_URL}/user/register`, body)
            .then(res => {
                setIsLoading(false);
                setUserData(res.data?.item);
                router.replace({ pathname: '/dashboard' }, undefined, { shallow: true });
            })
            .catch(e => {
                setIsLoading(false);
                toast.error(e?.response?.data?.message, { autoClose: 5000 });
            })
    }

    const handleSignin = async (email: string, password: string) => {
        setIsLoading(true);
        await axios.post(`${LOCAL_BASE_URL}/user/login`, { email, password})
            .then(res => {
                setIsLoading(false);
                setUserData(res.data?.item);
                router.replace({ pathname: '/dashboard' }, undefined, { shallow: true });
            })
            .catch(e => {
                setIsLoading(false);
                toast.error(e?.response?.data?.message, { autoClose: 5000 });
            })
    }

    const onEmailKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, emailField: React.MutableRefObject<any>, passwordField: React.MutableRefObject<any>) => {
        if (e.key === 'Enter') {
            if (emailField.current.value === '') {
                emailField.current.focus();
                return;
            }
            passwordField.current.focus();
        }
    };

    const onPasswordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, emailField: React.MutableRefObject<any>, passwordField: React.MutableRefObject<any>) => {
        if (e.key === 'Enter') {
            if (emailField.current.value === '') {
                emailField.current.focus();
                return;
            }
            if (passwordField.current.value === '') {
                passwordField.current.focus();
                return;
            }
            handleSignin(emailField.current.value, passwordField.current.value);
        }
    };

    return (
        <AppContext.Provider value={{
            sidebarToggle, toggleSidebar, closeSidebar,
            delay, setDelay,
            handleSignup, handleVerifyEmail, handleSignin, onEmailKeyPress, onPasswordKeyPress,
            handleResendOtp, handleVerifyOtp,
            getUserData,
            setSignupBody, signupBody,
            isLoading, isLoadingResendOtp,
            verificationKey
        }}>
            {children}
        </AppContext.Provider>
    );
}