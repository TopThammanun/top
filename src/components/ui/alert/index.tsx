import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import ShowAlert, { ButtonCancle, ButtonSubmit, ShowAlertProps } from './ShowAlert';

const Alert = {
    message({ icon, noIcon, color, content, size, onSubmit, labelSubmit, noButton }: ShowAlertProps & ButtonSubmit) {
        ShowAlert({
            icon: icon || <Icon icon="line-md:alert-circle-twotone" />,
            noIcon: noIcon,
            color: color || 'primary',
            content: content,
            size: size,
            onSubmit: onSubmit,
            labelSubmit: labelSubmit || 'ปิด',
            noButton: noButton
        })
    },
    error({ icon, noIcon, color, content, size, onSubmit, labelSubmit, noButton }: ShowAlertProps & ButtonSubmit) {
        ShowAlert({
            icon: icon || <Icon icon="line-md:close-circle-twotone" />,
            noIcon: noIcon,
            color: color || 'primary',
            content: content,
            size: size,
            onSubmit: onSubmit,
            labelSubmit: labelSubmit || 'ปิด',
            noButton: noButton
        })
    },
    warning({ icon, noIcon, color, content, size, onSubmit, labelSubmit, noButton }: ShowAlertProps & ButtonSubmit) {
        ShowAlert({
            icon: icon || <Icon icon="line-md:alert-twotone" />,
            noIcon: noIcon,
            color: color || 'primary',
            content: content,
            size: size,
            onSubmit: onSubmit,
            labelSubmit: labelSubmit || 'ปิด',
            noButton: noButton
        })
    },
    success({ icon, noIcon, color, content, size, onSubmit, labelSubmit, noButton }: ShowAlertProps & ButtonSubmit) {
        ShowAlert({
            icon: icon || <Icon icon="line-md:confirm-circle-twotone" />,
            noIcon: noIcon,
            color: color || 'primary',
            content: content,
            size: size,
            onSubmit: onSubmit,
            labelSubmit: labelSubmit || 'ปิด',
            noButton: noButton
        })
    },
    question({ icon, noIcon, color, content, size, onCancle, labelCancle, onSubmit, labelSubmit, noButton }: ShowAlertProps & ButtonCancle & ButtonSubmit) {
        ShowAlert({
            icon: icon || <Icon icon="line-md:question-circle-twotone" />,
            noIcon: noIcon,
            color: color || 'primary',
            content: content,
            size: size,
            onCancle: onCancle,
            labelCancle: labelCancle || 'ยกเลิก',
            onSubmit: onSubmit,
            labelSubmit: labelSubmit || 'ยืนยัน',
            noButton: noButton
        })
    },
}

export default Alert;
