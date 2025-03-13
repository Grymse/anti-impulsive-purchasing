import { useScaling } from "~hooks/useScaling";
import IconSrc from "data-base64:~assets/icon.png"
import { createContext, useContext, useState, type ReactNode } from "react";
import { Card } from "./ui/card";

type ModalContext = {
    isOpen: boolean;
    close : () => void;
    setModal: (component: ReactNode) => void;
    scale: string;
}

const ModalContext = createContext<ModalContext>({isOpen: false, close: () => {}, setModal: () => {}, scale: "1"});
export const useModal = () => useContext(ModalContext);

type Props = {
    children: React.ReactNode;
}

function Modal({
    children,
}: Props) {
    const {close, isOpen, scale} = useModal();

    if(!isOpen) return null;

    return (
        <div
            id="popover-questionary"
            className={`fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center`}
            onClick={() => close()}
        >
            <div style={{
                transform: `scale(${scale})`,
            }} className="flex items-center flex-col gap-12">
                <div className="relative w-24 h-24">
                    <div className="-inset-4 rounded-full absolute bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-lg animate-pulse" />
                    <img
                    src={IconSrc}
                    alt="Extension Logo (On)"
                    className="relative w-auto h-auto animation-breathe"
                    />
                </div>
                <Card
                    className="max-w-xl bg-white"
                    onClick={(e) => e.stopPropagation()}>
                {children}
                </Card>
                <div className="h-24 w-2" />
            </div>
        </div>
    )
}

export default function createModal() {
    let setCurrentComponent: (component: ReactNode) => void;

    function close() {
        setCurrentComponent(null);
    }

    function open(component: ReactNode) {
        setCurrentComponent(component);
    }

    const ModalComponent = () =>
    {
        const [currentComponent, setCurrentComponentInner] = useState<ReactNode | null>(null);
        const {scale} = useScaling();
        setCurrentComponent = setCurrentComponentInner;
        const isOpen = currentComponent !== null;
        return <ModalContext.Provider value={{isOpen, close, setModal: setCurrentComponent, scale}}>
                <Modal>
                    {currentComponent ?? currentComponent}
                </Modal>
            </ModalContext.Provider>
    }
    
    return {
        openModal: open,
        closeModal: close,
        ModalComponent
    }
}
