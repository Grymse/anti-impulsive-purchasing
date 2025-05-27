import { SimpleTooltip } from "@/components/ui/tooltip";

type Props = { children: React.ReactNode; description: string };

export default function Statistic({ children, description }: Props) {
  return (
    <SimpleTooltip message={description}>
      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors border border-input bg-background shadow-sm h-9 px-4 py-2 gap-1 text-sm">
        {children}
      </div>
    </SimpleTooltip>
  );
}
