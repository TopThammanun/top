"use client"

import { Fragment } from "react"
import { Icon } from "@iconify/react"
import { DateFormat } from "@/utils/date-format"
import dayjs from "dayjs"
import { DateRange, DayPicker } from "react-day-picker"
import { Calendar, Input, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { useEffect, useState } from "react"

type Props = {
    mode: "range"
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
}
type CalendarProps = React.ComponentProps<typeof DayPicker>;

const DateRangePicker = ({
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
    const isDateRange = (selected: DateRange | undefined) => (
        selected && !(selected instanceof Date) && !Array.isArray(selected) && selected.from && selected.to
    )
    const [textValue, setTextValue] = useState("")

    useEffect(() => {
        if (props.selected && isDateRange(props.selected)) {
            const formattedDates = `${DateFormat(dayjs(props.selected?.from), "DD/MM/YYYY")} - ${DateFormat(dayjs(props.selected?.to), "DD/MM/YYYY")}`
            setTextValue(formattedDates)
        } else {
            setTextValue("")
        }
    }, [props.selected])

    return (
        <Fragment>
            {!isDisabled && !isReadOnly
                ? <Popover placement="top">
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
export default DateRangePicker