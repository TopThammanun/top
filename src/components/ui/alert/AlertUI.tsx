import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '..';
import { Icon } from '@iconify/react/dist/iconify.js';
import { createRoot } from 'react-dom/client';
import { cn } from '@/lib/utils';

export type AlertUIProps = {
    icon?: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | React.ReactNode;
    noIcon?: boolean;
    color?: "primary" | "default" | "secondary" | "success" | "warning" | "danger";
    content: string | React.ReactNode;
    footerContent?: string | React.ReactNode
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
};

const CreateAlert = (props: AlertUIProps) => {
    const {
        icon,
        noIcon = false,
        color = "default",
        content,
        footerContent,
        size
    } = props

    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        onOpen()
    }, []);

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
                                <div className={cn(`text-6xl text-${color || "primary"}`)}>
                                    {icon}
                                </div>
                            }
                            {content}
                            {footerContent}
                            <Button
                                color={color}
                                className='px-20'
                                onPress={onClose}
                            >
                                ปิด
                            </Button>
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
}: AlertUIProps) => {
    const div = document.createElement('div');
    document.body.append(document.createElement('div'));
    const root = createRoot(div);
    root.render(
        <CreateAlert
            icon={icon}
            noIcon={noIcon}
            color={color}
            content={content}
            size={size}
        />);
};

export default ShowAlert
