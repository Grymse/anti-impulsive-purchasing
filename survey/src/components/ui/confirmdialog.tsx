import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  children: React.ReactNode;
  onConfirm: () => void;
  message: string;
  title?: string;
  asChild?: boolean;
  hasNestedButton?: boolean;
  className?: string;
  variant?:
    | "secondary"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
};

export default function ConfirmDialog({
  children,
  onConfirm,
  message,
  title = "Are you absolutely sure?",
  asChild,
  hasNestedButton,
  className,
  variant,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger
        className={className}
        hasNestedButton={hasNestedButton}
        asChild={asChild}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4 justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant={variant} onClick={onConfirm}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
