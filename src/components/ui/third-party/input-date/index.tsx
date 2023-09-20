"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"
import { DateFormat } from "@/utils/date-format"
import dayjs from "dayjs"
import { DayPicker } from "react-day-picker"
import Calendar from "../calendar"
import { Input, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"

type Props = {
    mode: "single" | "multiple" | "range"
    label?: string
    placeholder?: string
    labelPlacement?: "inside" | "outside" | "outside-left"
    variant?: "bordered" | "faded" | "flat" | "underlined"
    radius?: "full" | "lg" | "md" | "sm" | "none"
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
    size?: "sm" | "md" | "lg"
    isDisabled?: boolean
    isReadOnly?: boolean
    isRequired?: boolean
    isInvalid?: boolean
    description?: React.ReactNode
    errorMessage?: React.ReactNode
    classNameInput?: string
    value: string
}
type CalendarProps = React.ComponentProps<typeof DayPicker>;

const InputDate = ({
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
    value,
    ...props
}: CalendarProps & Props) => {
    return (
        <React.Fragment>
            {!isDisabled && !isReadOnly ?
                <Popover placement="top">
                    <PopoverTrigger>
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
                                value={value}
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
                </Popover> :
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
                    value={value}
                    startContent={
                        <Icon icon="solar:calendar-outline" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    classNames={{
                        mainWrapper: "w-full"
                    }}
                    className={classNameInput}
                />
            }
        </React.Fragment>
    )
}
export default InputDate