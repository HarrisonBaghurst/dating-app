'use client'

import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return createPortal(
        <div 
        onClick={onClose}
        className='fixed inset-0 z-50 flex justify-center bg-black/95 w-full h-full items-center
        '>
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className='w-[35%] h-[80%]'
            >
                {children}
            </motion.div>
        </div>,
        document.body
    )
}

export default Modal