import { PersistentValue } from "./utils";

type StrategyType = "need-this" | "enforce-wait" | "max-purchases";

type Strategy = {
    name: string;
    description: string;
    code: StrategyType;
}

export const strategies : Strategy[] = [
    {
        code: "need-this",
        name: "Need This",
        description: "Before committing to a purchase, ask yourself a couple of questions, about whether you really need this",
    },
    {
        code: "enforce-wait",
        name: "Enforce Wait-time",
        description: "Enforce a 24-hour wait time before you are allowed to buy",
    }
]

export type Settings = {
    active: boolean;
    activeStrategies: StrategyType[];
}

export const settings = new PersistentValue<Settings>("settings",
    {
        active: true,
        activeStrategies: ["need-this"]
    }
);


function hexToNumber(hex: string) {
    return parseInt(hex, 16);
}

function idToIndex(id: string, max: number) {
    const segment = id.split("-")[0];
    const number = hexToNumber(segment);
    return number % max;
}

function selectStrategyFromId(id: string) : StrategyType {
    const index = idToIndex(id, strategies.length);
    return strategies[index].code;
}

// Enforce activeStrategy changes
/* getUserId().then(userId => {
    settings.onInit(prevSettings => {
        settings.value = {...prevSettings, activeStrategies: [selectStrategyFromId(userId)]};
    })
}); */
