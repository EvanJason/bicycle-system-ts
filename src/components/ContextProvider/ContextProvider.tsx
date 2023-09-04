import React, { useState } from "react";
import { AppStateValue, defaultContextValue } from './contants';

//子组件调用
export const appContext = React.createContext(defaultContextValue);

// 更新上下文值
export const appSetStateContext = React.createContext<
    React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined);

//父组件调用
export function AppStateProvider(props: any) {
    const [state, setState] = useState(defaultContextValue);

    return (
        <appContext.Provider value={state}>
            <appSetStateContext.Provider value={setState}>
                {props.children}
            </appSetStateContext.Provider>
        </appContext.Provider>
    );
};