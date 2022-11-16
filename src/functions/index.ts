export const getEndDate = (firstDate: Date, dureeCollect: string) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const date1 = new Date(firstDate);
    const date2 = new Date();
    const diffDays = Math.round(
        Math.abs((date1.getTime() - date2.getTime()) / oneDay)
    );
    return Number(dureeCollect) - diffDays;
};

export const getPercentage = (contribution: number, objectifCollect: number) => {
    let percent = 0;
    percent = (contribution * 100) / objectifCollect;
    return percent.toFixed(0);
};

export const isValidEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
export const isValidPassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/.test(password);

type TErrors = { email: string; password: string };

export const emailValidation = (event: React.ChangeEvent<HTMLInputElement>, setErrors: React.Dispatch<React.SetStateAction<TErrors>>, errors: TErrors, message: string) => {
    if (event.target.value) {
        if (!isValidEmail(event.target.value)) {
            setErrors({ ...errors, email: message });
        } else {
            setErrors({ ...errors, email: '' });
        }
    } else {
        setErrors({ ...errors, email: '' });
    }
}

export const passwordValidation = (event: React.ChangeEvent<HTMLInputElement>, setErrors: React.Dispatch<React.SetStateAction<TErrors>>, errors: TErrors, message: string) => {
    if (event.target.value) {
        if (!isValidPassword(event.target.value)) {
            setErrors({ ...errors, password: message });
        } else {
            setErrors({ ...errors, password: '' });
        }
    } else {
        setErrors({ ...errors, password: '' });
    }
}