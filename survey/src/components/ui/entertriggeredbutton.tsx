import { useEffect, useRef } from "react";
import { Button } from "./button";

export function EnterTriggeredButton(
  props: React.ComponentProps<typeof Button>
) {
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = window.onkeydown;
    window.onkeydown = (event) => {
      if (event.key === "Enter") {
        button.current?.click();
      }
    };
    return () => {
      window.onkeydown = prev;
    };
  }, []);

  return (
    <Button ref={button} {...props}>
      {props.children}
    </Button>
  );
}
