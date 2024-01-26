import React from 'react'
import { Modal, ModalContent } from '@nextui-org/react';
import { Spinner } from "@nextui-org/react";

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
            <ModalContent>
                <Spinner color="primary" size='lg'/>
            </ModalContent>
        </Modal>
    )
}

export default LoadingScreen