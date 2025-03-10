import { PersistentValue } from "./utils";

type StrategyType = "need-this" | "enforce-wait" | "visualize-alternatives"  | "max-purchases" | "corporate-agenda" | "review-third-party" | "alternate-activities";

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
        code: "visualize-alternatives",
        name: "Visualize Alternatives",
        description: "See how your money could grow over time if invested instead of spent on this purchase",
    },
    {
        code: "corporate-agenda",
        name: "Corporate Agenda",
        description: "Remind yourself of the marketing tactics used by companies to manipulate you into making impulsive purchases",
    },
    {
        code: "max-purchases",
        name: "Max Purchases",
        description: "Set a limit on the number of purchases you can make in a month",
    },
    {
        code: "review-third-party",
        name: "Review Third-party",
        description: "Before buying, review the third-party sellers' reputation and customer reviews",
    },
    {
        code: "alternate-activities",
        name: "Alternative Activities",
        description: "Explore alternative activities like hobbies, learning, or exercise instead of shopping",
    }
]

export type Settings = {
    active: boolean;
    activeStrategies: StrategyType[];
}

export const settings = new PersistentValue<Settings>("settings",
    {
        active: true,
        activeStrategies: ["max-purchases"]
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
