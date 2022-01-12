import { SignUpFormValues } from "../components/signUpForm"
import companies from "./companies.json"

type APIResponse<T> = {
    data?: T,
    status: string
}

export type Company = {
    id: number;
    name: string;
    description: string;
    email: string;
    address: string;
    phone: string;
}

export default class API {
    static signUp(formValues: SignUpFormValues): Promise<APIResponse<any>> {
        const { password, confirmPassword, ...user } = formValues;
        const hashedPassword = btoa(`${user.username}${password}`);
        window.localStorage.setItem(hashedPassword, JSON.stringify(user));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: user,
                    status: "success"
                })
            }, 1500)
        })
    }
    static login(username: string, password: string) {
        return new Promise((resolve, reject) => {
            const hashedPassword = btoa(`${username}${password}`);
            const userJSON = window.localStorage.getItem(hashedPassword)
            if (userJSON) {
                const user = JSON.parse(userJSON)
                if (user.username === username) {
                    setTimeout(() => {
                        resolve({
                            data: user,
                            status: "success"
                        })
                    }, 1500)
                    return
                }
            }
            setTimeout(() => {
                resolve({
                    data: {
                        message: "user not found"
                    },
                    status: "error"
                })
            }, 1500)
        })
    }
    static getCompanies(): Promise<APIResponse<Company[]>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: companies,
                    status: 'success'
                })
            }, 1500)
        })
    }
}