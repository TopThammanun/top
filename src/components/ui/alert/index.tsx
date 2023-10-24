import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '..';
import { Icon } from '@iconify/react/dist/iconify.js';
import { createRoot } from 'react-dom/client';
import ShowAlert, { AlertUIProps } from './AlertUI';

const Alert = {
    icons: {
        info: <Icon icon="icon-park-twotone:info" className='text-primary' />,
        danger: <Icon icon="ph:x-circle-duotone" className='text-danger' />,
        warning: <Icon icon="ph:warning-duotone" className='text-warning' />,
        success: <Icon icon="icon-park-twotone:check-one" className='text-success' />,
    },

    info({ icon, noIcon, color, content, size }: AlertUIProps) {
        ShowAlert({
            icon: icon || this.icons.info,
            noIcon,
            color: color || 'primary',
            content,
            size
        })
    },
    warning({ icon, noIcon, color, content, size }: AlertUIProps) {
        ShowAlert({
            icon: icon || this.icons.warning,
            noIcon,
            color: color || 'warning',
            content,
            size
        })
    },

    danger({ icon, noIcon, color, content, size }: AlertUIProps) {
        ShowAlert({
            icon: icon || this.icons.danger,
            noIcon,
            color: color || 'danger',
            content,
            size
        })
    },
    success({ icon, noIcon, color, content, size }: AlertUIProps) {
        ShowAlert({
            icon: icon || this.icons.success,
            noIcon,
            color: color || 'success',
            content,
            size
        })
    },

    question({ icon, noIcon, color, content, size }: AlertUIProps) {
        ShowAlert({
            icon: icon || this.icons.success,
            noIcon,
            color: color || 'success',
            content,
            size,
            footerContent: <div>asd</div>
        })
    },

}

export default Alert;
