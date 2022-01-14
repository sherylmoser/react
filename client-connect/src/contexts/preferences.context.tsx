import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer, useState } from "react"
import API, { UserType } from "../dataLayer/api"

type PreferencesState = {
    theme?: string;
    language?: string;
    region?: string;
}

type ProviderPreferencesState = {
    state: PreferencesState;
    onChangeTheme?: (theme: string) => void;
    onChangeLanguage?: (language: string) => void;
    onChangeRegion?: (region: string) => void;
    onChange?: (newState: PreferencesState) => void;
}

type ActionType = {
    type: string;
    data?: any;
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
export function PreferencesContextProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, { theme: 'light', language: 'en', region: 'mst' })

    return (
        <PreferencesContext.Provider value={{
            state,
            onChange: (state: PreferencesState) => {
                dispatch({ type: 'all', data: state })
            },
            onChangeLanguage: (language: string) => {
                dispatch({ type: 'language', data: language })
            },
            onChangeRegion: (Region: string) => {
                dispatch({ type: 'Region', data: Region })
            },
            onChangeTheme: (theme: string) => {
                dispatch({ type: 'theme', data: theme })
            }
        }}>
            {children}
        </PreferencesContext.Provider>
    )
}

