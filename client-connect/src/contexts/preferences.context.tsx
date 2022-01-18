import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer, useState } from "react"
import API, { UserType } from "../dataLayer/api"

type PreferencesState = {
    theme?: string;
    language?: string;
    region?: string;
}

type ActionType = {
    type: "all" | "language" | "theme" | "region";
    data?: any;
}

type ProviderPreferencesState = {
    state: PreferencesState;
    dispatch?: (action: ActionType) => void
    onChangeTheme?: (theme: string) => void;
    onChangeLanguage?: (language: string) => void;
    onChangeRegion?: (region: string) => void;
    onChange?: (key: "language" | "theme" | "region", value: string) => void;
}

const PreferencesContext = createContext<ProviderPreferencesState>({ state: {} });

function reducer(state: PreferencesState, action: ActionType) {
    const { type, data } = action;
    switch (type) {
        case "all":
            return { ...state, ...data };
        case "theme":
            return { ...state, theme: data };
        case "language":
            return { ...state, language: data };
        case "region":
            return { ...state, region: data };
        default:
            return state;
    }
}

type Props = {
    children: ReactNode
}

export const usePreferencesContext = () => {
    return useContext(PreferencesContext)
}

const stateJSON = window.localStorage.getItem('preferences');
const defaultState = stateJSON ? JSON.parse(stateJSON) : { theme: 'light', language: 'en', region: 'mst' }

export function PreferencesContextProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, defaultState)

    useEffect(() => {
        console.log(state);

        window.localStorage.setItem('preferences', JSON.stringify(state))
    }, [state])

    return (
        <PreferencesContext.Provider value={{
            state,
            dispatch,
            onChange: (key: "language" | "theme" | "region", value: string) => {
                dispatch({ type: key, data: value })
            },
            onChangeLanguage: (language: string) => {
                dispatch({ type: 'language', data: language })
            },
            onChangeRegion: (Region: string) => {
                dispatch({ type: 'region', data: Region })
            },
            onChangeTheme: (theme: string) => {
                dispatch({ type: 'theme', data: theme })
            }
        }}>
            {children}
        </PreferencesContext.Provider>
    )
}

