import { PersistentValue } from "./utils";


type StrategyType = "need-this" | "enforce-wait";

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

// Enforce activeStrategy changes
/* settings.onInit(_ => {
    settings.value.activeStrategies = ["need-this", "enforce-wait"];
}) */