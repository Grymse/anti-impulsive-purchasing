import { Button } from "../ui/button";
import { SimpleTooltip } from "../ui/tooltip";
import { useDarkmode } from "@/hooks/useDarkmode";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function DarkmodeButton() {
  const { setDarkmode, isDarkmode } = useDarkmode();

  function toggleDarkmode() {
    setDarkmode(!isDarkmode);
  }

  return (
    <SimpleTooltip
      message={isDarkmode ? "Turn off darkmode" : "Turn on darkmode"}
      asChild
    >
      <Button variant="secondary" size="icon" onClick={toggleDarkmode}>
        {isDarkmode ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </Button>
    </SimpleTooltip>
  );
}
