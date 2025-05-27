type Props = {
  children?: React.ReactNode;
};

export default function Null({ children }: Props) {
  return children ?? null;
}
