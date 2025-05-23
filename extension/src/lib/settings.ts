import { PersistentValue } from "./utils";

type StrategyType = "enforce-wait" | "none";

type Strategy = {
    name: string;
    description: string;
    code: StrategyType;
}

export const strategies : Strategy[] = [
    {
        code: "enforce-wait",
        name: "Enforce Wait-time",
        description: "Enforce a 24-hour wait time before you are allowed to buy",
    },
    {
        code: "none",
        name: "No strategy",
        description: "No strategy is enforced. You are left with your own self-control",
    }
]

export type Settings = {
    active: boolean;
    activeStrategies: StrategyType[];
    hasSeenWelcomeModal?: boolean;
}

export const settings = new PersistentValue<Settings>("settings",
    {
        active: true,
        activeStrategies: ["enforce-wait"],
        hasSeenWelcomeModal: false,
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
    return strategies[index].code
}

// Enforce activeStrategy changes
settings.onInit(prevSettings => {
    settings.value = {...prevSettings, activeStrategies: ["enforce-wait"]}
});
