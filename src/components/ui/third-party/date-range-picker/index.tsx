"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { Icon } from "@iconify/react"
import { DateFormat } from "@/utils/date-format"
import dayjs from "dayjs"
import { DateRange, DayPicker } from "react-day-picker"
import { Calendar, Input, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { useEffect, useState } from "react"

type Props = {
    placeholder?: string
    mode: "range"
    classNameInput?: string
}
type CalendarProps = React.ComponentProps<typeof DayPicker>;

const DateRangePicker = ({ placeholder, classNameInput, ...props }: CalendarProps & Props) => {
    const isDateRange = (selected: DateRange | undefined) => (
        selected && !(selected instanceof Date) && !Array.isArray(selected) && selected.from && selected.to
    )
    const [textValue, setTextValue] = useState("")

    useEffect(() => {
        if (props.selected && isDateRange(props.selected)) {
            const x = `${DateFormat(dayjs(props.selected?.from), "DD/MM/YYYY")} - ${DateFormat(dayjs(props.selected?.to), "DD/MM/YYYY")}`
            setTextValue(x)
        } else {
            setTextValue("")
        }
    }, [props.selected])


    return (
        <Popover placement="top">
            <PopoverTrigger>
                <div>
                    <Input
                        variant="bordered"
                        labelPlacement="outside"
                        label="RangeDatePicker"
                        value={textValue}
                        placeholder={placeholder}
                        className="overflow-x-hidden"
                        startContent={
                            <Icon icon="solar:calendar-outline" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{
                            input: "flex",
                        }}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    {...props}
                />
            </PopoverContent>
        </Popover>
    )
}
export default DateRangePicker