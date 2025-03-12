import { useScaling } from "~hooks/useScaling";
import IconSrc from "data-base64:~assets/icon.png"
import { createContext, useContext, useState, type ReactNode } from "react";

type ModalContext = {
    isOpen: boolean;
    close : () => void;
    setModal: (component: ReactNode) => void;
    scale: string
}

const ModalContext = createContext<ModalContext>({isOpen: false, close: () => {}, setModal: () => {}, scale: "1"});
export const useModal = () => useContext(ModalContext);

type Props = {
    children: React.ReactNode;
}

function Modal({
    children,
}: Props) {
    const {scale, close, isOpen} = useModal();
    

    if(!isOpen) return null;

    return (
        <div
            id="popover-questionary"
            className={`fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center`}
            onClick={() => close()}
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
        setCurrentComponent = setCurrentComponentInner;
        const {scale} = useScaling();
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
