import { useContext } from "react";
import { StateContext } from "./state";

export const useSurvey = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a StateProvider');
    }
    return context;
};