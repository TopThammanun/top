"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { Icon } from "@iconify/react"
import { DateFormat } from "@/utils/date-format"
import dayjs from "dayjs"
import { DayPicker } from "react-day-picker"
import Calendar from "../calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui"

type Props = {
    placeholder?: string
    mode: "multiple"
    classNameInput?: string
}
type CalendarProps = React.ComponentProps<typeof DayPicker>;

const DateMultiplePicker = ({ placeholder, classNameInput, ...props }: CalendarProps & Props) => {
    const isMultipleDate = (selected: Date[] | undefined): selected is Date[] => Array.isArray(selected);

    return (
        <Popover placement="top">
            <PopoverTrigger>
                <div
                    className={cn(
                        "flex flex-wrap gap-y-2 justify-start text-sm text-left font-normal border-2 border-default-200 p-2 cursor-pointer",
                        "hover:border-default-400 h-unit-10 min-h-unit-10 rounded-medium",
                        !props.selected && "text-muted-foreground", classNameInput
                    )}
                >
                    <Icon icon="solar:calendar-outline" className="mr-2 h-5 w-5" />
                    {props.selected && isMultipleDate(props.selected) ?
                        props.selected.map((item, index) => (
                            <div key={index} className="flex justify-center items-center text-xs bg-default rounded-full px-2 py-[0.125rem] mr-1">{DateFormat(dayjs(item), "DD/MM/YYYY")}</div>
                        )) :
                        <span>{placeholder}</span>}
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
export default DateMultiplePicker