import { Badge } from './badge'

type Props = {labels: string[], current: string, setCurrent?: (label: string) => void}

export function Progress({
    labels,
    current,
    setCurrent
}: Props) {
    const currentIndex = labels.indexOf(current)

    const isLast = currentIndex === labels.length - 1;

    const leftSideLabels = currentIndex === -1 ? labels : labels.slice(0, currentIndex);
    const currentLabel = currentIndex === -1 ? "" : labels[currentIndex];
    const rightSideLabels = labels.slice(currentIndex + 1);

  return (
    <div className="flex justify-between w-full items-center relative">
        <div className="w-full h-1 absolute bg-muted" />

        <div className="flex gap-2 z-10">
            {leftSideLabels.map((label) => <Badge onClick={() => setCurrent(label)}  key={label} variant="secondary">{label}</Badge>)}
            {0 < currentLabel.length && !isLast && <Badge>{currentLabel}</Badge>}
        </div>

        <div className="flex gap-2 z-10">
            {rightSideLabels.map((label) => (
                <Badge onClick={() => setCurrent(label)} key={label} variant="secondary">{label}</Badge>
            ))}
            {isLast && <Badge>{labels.at(-1)}</Badge>}
        </div>
    </div>
  )
}