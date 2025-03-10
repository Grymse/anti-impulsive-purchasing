import { useScaling } from "~hooks/useScaling";
import IconSrc from "data-base64:~assets/icon.png"

type Props = {
    children: React.ReactNode;
    onClick: () => void;
}

export default function ModalBackground({
    children,
    onClick
}: Props) {
    const {scale} = useScaling();

    return (
        <div
            id="popover-questionary"
            className={`fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center`}
            onClick={onClick}
        >
            <div style={{
            transform: `scale(${scale})`,
            }} className="absolute w-full h-full flex items-start justify-center">
                <div className="relative mt-10">
                    <div className="-inset-4 rounded-full absolute bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-lg animate-pulse" />
                    <img
                    src={IconSrc}
                    alt="Extension Logo (On)"
                    width={100}
                    height={100}
                    className="relative w-auto h-auto max-w-[100px] animation-breathe"
                    />
                </div>
            </div>
            {children}
        </div>
    )
}