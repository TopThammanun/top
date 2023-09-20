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
    placeholder?: string
    mode: "single"
    classNameInput?: string
}
type CalendarProps = React.ComponentProps<typeof DayPicker>;

const DatePicker = ({ placeholder, classNameInput, ...props }: CalendarProps & Props) => {
    const isDate = (selected: Date | undefined): selected is Date => selected instanceof Date;

    return (
        <Popover placement="top">
            <PopoverTrigger>
                <div>
                    {/* <div
                        className={cn(
                            "flex flex-wrap gap-2 justify-start items-center text-sm text-left font-normal border-2 border-default-200 pl-3 cursor-pointer",
                            "hover:border-default-400 h-unit-10 min-h-unit-10 rounded-medium",
                            !props.selected && "text-default-400", classNameInput
                        )}
                    >
                        <Icon icon="solar:calendar-outline" className="text-2xl text-default-400" />
                        {props.selected && isDate(props.selected) ?
                            DateFormat(dayjs(props.selected), "DD/MM/YYYY") :
                            <span>{placeholder}</span>}
                    </div> */}
                    <Input
                        type="text"
                        label="DatePicker"
                        placeholder={placeholder}
                        labelPlacement="outside"
                        value={props.selected ? DateFormat(dayjs(props.selected), "DD/MM/YYYY") : ""}
                        variant="bordered"
                        startContent={
                            <Icon icon="solar:calendar-outline" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
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
export default DatePicker
