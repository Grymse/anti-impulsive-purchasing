import { DarkmodeContext } from "@/contexts/DarkmodeProvider";
import { useContext } from "react";

export function useDarkmode() {
  return useContext(DarkmodeContext);
}
