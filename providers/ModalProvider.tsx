'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import Modal from "@/components/Modal";

type ModalContextType = {
    openModal: (context: ReactNode) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);
    const [modalKey, setModalKey] = useState<number>(0);

    const openModal = (newContent: ReactNode) => {
        setContent(newContent);
        setIsOpen(true);
        setModalKey((prev) => prev + 1);
    }

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Modal
            isOpen={isOpen}
            onClose={closeModal}
            modalKey={modalKey}
            >
                {content}
            </Modal>
        </ModalContext.Provider>
    )
}

export function useModal() { 
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('useModal must be use inside ModalProvider');
    return ctx;
}
