"use client"

import { Fragment, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"
import { DayPicker } from "react-day-picker"
import Calendar from "../calendar"
import { Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { formatDate } from "@/utils/formatDate"

type Props = {
    mode: "single"
    label?: string | React.ReactNode
    placeholder?: string
    labelPlacement?: "inside" | "outside" | "outside-left"
    variant?: "bordered" | "faded" | "flat" | "underlined"
    radius?: "full" | "lg" | "md" | "sm" | "none"
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
    size?: "sm" | "md" | "lg"
    isReadOnly?: boolean
    isDisabled?: boolean
    isRequired?: boolean
    isInvalid?: boolean
    description?: React.ReactNode
    errorMessage?: React.ReactNode
    classNameInput?: string
}
type CalendarProps = React.ComponentProps<typeof DayPicker>;

const DatePicker = ({
    label,
    placeholder,
    labelPlacement,
    variant,
    radius,
    color,
    size,
    isDisabled,
    isReadOnly,
    isRequired,
    isInvalid,
    description,
    errorMessage,
    classNameInput,
    ...props
}: CalendarProps & Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [textValue, setTextValue] = useState("")
    const isDate = (selected: Date | undefined): selected is Date => selected instanceof Date;
    useEffect(() => {
        if (props.selected && isDate(props.selected)) {
            const formattedDates = formatDate(dayjs(props.selected), "DD/MM/YYYY")
            setTextValue(formattedDates)
        } else {
            setTextValue("")
        }
        setIsOpen(false)
    }, [props.selected])

    return (
        <Fragment>
            {!isDisabled && !isReadOnly
                ? <Popover placement="top" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                    <PopoverTrigger className="z-0">
                        <div>
                            <Input
                                type="text"
                                label={label}
                                placeholder={placeholder}
                                labelPlacement={labelPlacement}
                                variant={variant}
                                radius={radius}
                                color={color}
                                size={size}
                                isDisabled={isDisabled}
                                isReadOnly={isReadOnly}
                                isRequired={isRequired}
                                isInvalid={isInvalid}
                                description={description}
                                errorMessage={errorMessage}
                                value={textValue}
                                startContent={
                                    <Icon icon="solar:calendar-outline" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                classNames={{
                                    mainWrapper: "w-full"
                                }}
                                className={classNameInput}
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            {...props}
                        />
                    </PopoverContent>
                </Popover>
                : <Input
                    type="text"
                    label={label}
                    placeholder={placeholder}
                    labelPlacement={labelPlacement}
                    variant={variant}
                    radius={radius}
                    color={color}
                    size={size}
                    isDisabled={isDisabled}
                    isReadOnly={isReadOnly}
                    isRequired={isRequired}
                    isInvalid={isInvalid}
                    description={description}
                    errorMessage={errorMessage}
                    value={textValue}
                    startContent={
                        <Icon icon="solar:calendar-outline" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    classNames={{
                        mainWrapper: "w-full"
                    }}
                    className={classNameInput}
                />
            }
        </Fragment>
    )
}
export default DatePicker
