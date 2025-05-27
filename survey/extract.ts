import { writeFileSync } from 'fs';
import { questions, strategies } from './src/components/survey/surveySetup';

function getStrategy(id: number) {
    id = Math.floor((id - 20) / 2);
    return strategies[id];
}

questions.filter(q => 20 <= q.id).forEach(q => {
    const strategy = getStrategy(q.id);

    // @ts-expect-error Adding new variables
    q.strategy = strategy.strategy;
    // @ts-expect-error Adding new variables
    q.shortStrategy = strategy.short;
    // @ts-expect-error Adding new variables
    q.example = strategy.example;
})

writeFileSync("./questions.json", JSON.stringify(questions));