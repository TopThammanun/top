"use client"
import { Fragment } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import buddhistEra from 'dayjs/plugin/buddhistEra'

type Props = {
    children: React.ReactNode
}

const DateProvider = (props: Props) => {
    dayjs.extend(buddhistEra);
    dayjs.locale('en');

    return (
        <Fragment>{props.children}</Fragment>
    )
}

export default DateProvider