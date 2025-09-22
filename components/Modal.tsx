'use client'

import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    modalKey: number;
}

const Modal = ({ isOpen, onClose, children, modalKey }: ModalProps) => {
    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
            key='backdrop'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex justify-center bg-black/95 w-full h-full pt-[10dvh]'
            >
                <motion.div
                key={modalKey}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className='w-[35%] h-fit'
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    )
}

export default Modal