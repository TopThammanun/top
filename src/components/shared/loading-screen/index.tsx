import React, { Fragment } from 'react'
import { Image, Modal, ModalContent } from '@nextui-org/react';
import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {
    isLoading: boolean
}

const LoadingScreen = (props: Props) => {
    const { isLoading } = props
    return (
        <Modal
            isOpen={isLoading}
            isDismissable={false}
            hideCloseButton={true}
            className="bg-transparent border-none shadow-none text-primary"
        >
            <ModalContent className="w-fit ">
                <Icon icon="line-md:loading-twotone-loop" className="w-10 h-10" />
            </ModalContent>
        </Modal>
    )
}

export default LoadingScreen