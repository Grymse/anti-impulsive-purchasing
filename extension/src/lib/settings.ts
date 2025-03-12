import { getUserId } from "./analytics";
import { PersistentValue } from "./utils";

type StrategyType = "need-this" | "enforce-wait" | "visualize-alternatives"  | "max-purchases" | "corporate-agenda" | "alternate-activities" | "none";

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
        activeStrategies: [],
        hasSeenWelcomeModal: false
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
/* getUserId().then(userId => {
    const strategy = selectStrategyFromId(userId);
    settings.onInit(prevSettings => {
        settings.value = {...prevSettings, activeStrategies: [strategy]};
    })
}); */
