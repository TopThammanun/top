import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { createRoot } from 'react-dom/client';
import { cn } from '@/lib/utils';

export type ShowAlertProps = {
    icon?: "info" | "error" | "warning" | "success" | React.ReactNode;
    noIcon?: boolean;
    color?: "primary" | "default" | "secondary" | "success" | "warning" | "danger";
    content: string | React.ReactNode;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
    noButton?: boolean
};
export type ButtonCancle = {
    onCancle?: () => void;
    labelCancle?: string
};
export type ButtonSubmit = {
    onSubmit?: () => void;
    labelSubmit?: string
};

const Alert = (props: ShowAlertProps & ButtonCancle & ButtonSubmit) => {
    const {
        icon,
        noIcon = false,
        color = "default",
        content,
        size,
        noButton,
        onCancle,
        labelCancle,
        onSubmit,
        labelSubmit
    } = props

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen()
    }, []);

    const handleCancle = async () => {
        onCancle && await onCancle()
        onClose()
    }

    const handleSubmit = async () => {
        onSubmit && await onSubmit()
        onClose()
    }

    return (
        <Modal
            size={size || 'sm'}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <ModalBody>
                        <div className='flex flex-col gap-3 m-5 items-center'>
                            {!noIcon &&
                                <div className={cn(`text-6xl text-${color}`)}>
                                    {icon || <Icon icon="icon-park-twotone:info" />}
                                </div>
                            }
                            {content}
                            {!noButton &&
                                <div className='flex gap-2'>
                                    {labelCancle &&
                                        <Button color={color} variant='bordered' onClick={handleCancle}>
                                            {labelCancle}
                                        </Button>
                                    }
                                    {labelSubmit &&
                                        <Button color={color} onClick={handleSubmit}>
                                            {labelSubmit}
                                        </Button>
                                    }
                                </div>
                            }
                        </div>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    )
}


const ShowAlert = ({
    icon,
    noIcon,
    color,
    content,
    size,
    noButton,
    onCancle,
    labelCancle,
    onSubmit,
    labelSubmit
}: ShowAlertProps & ButtonCancle & ButtonSubmit) => {
    const div = document.createElement('div');
    document.body.append(document.createElement('div'));
    const root = createRoot(div);
    root.render(
        <Alert
            icon={icon}
            noIcon={noIcon}
            color={color}
            content={content}
            size={size}
            noButton={noButton}
            onCancle={onCancle}
            labelCancle={labelCancle}
            onSubmit={onSubmit}
            labelSubmit={labelSubmit}
        />
    );
};

export default ShowAlert
