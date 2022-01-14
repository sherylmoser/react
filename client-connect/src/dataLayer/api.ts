import { SignUpFormValues } from "../components/signUpForm"
import companies from "./companies.json"

type APIResponse<T> = {
    data?: T,
    status: string,
    message?: string
}

export type UserType = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
}

export type CompanyType = {
    id: number;
    name: string;
    description: string;
    email: string;
    address: string;
    phone: string;
}

function getConnectedCompaniesFromStorage() {
    const connectedCompaniesJSON = window.localStorage.getItem('connectedCompanies');
    let connectedCompanies = {} as any
    if (connectedCompaniesJSON) {
        connectedCompanies = JSON.parse(connectedCompaniesJSON)
    }
    return connectedCompanies
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
    static login(username: string, password: string): Promise<APIResponse<UserType>> {
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
                    message: "user not found",
                    status: "error"
                })
            }, 1500)
        })
    }
    static getCompanies(): Promise<APIResponse<CompanyType[]>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: companies,
                    status: 'success'
                })
            }, 1500)
        })
    }

    static getConnectedCompanies(userId: string): Promise<APIResponse<number[]>> {
        let connectedCompanies = getConnectedCompaniesFromStorage()
        return new Promise((resolve) => {
            setTimeout(resolve, 1500, {
                data: connectedCompanies[userId] || [],
                status: 'success'
            })
        })
    }

    static connectToCompany(userId: string, companyId: number): Promise<APIResponse<number[]>> {
        let connectedCompanies = getConnectedCompaniesFromStorage()
        connectedCompanies[userId] = connectedCompanies[userId] || [];
        connectedCompanies[userId].push(companyId)
        window.localStorage.setItem('connectedCompanies', JSON.stringify(connectedCompanies));
        return new Promise((resolve) => {
            setTimeout(resolve, 1500, {
                data: connectedCompanies[userId],
                status: 'success'
            })
        })
    }
    static disconnectFromCompany(userId: string, companyId: number): Promise<APIResponse<number[]>> {
        let connectedCompanies = getConnectedCompaniesFromStorage()
        connectedCompanies[userId] = connectedCompanies[userId] || [];
        connectedCompanies[userId].splice(connectedCompanies[userId].indexOf(companyId), 1)
        window.localStorage.setItem('connectedCompanies', JSON.stringify(connectedCompanies));
        return new Promise((resolve) => {
            setTimeout(resolve, 1500, {
                data: connectedCompanies[userId],
                status: 'success'
            })
        })
    }
}