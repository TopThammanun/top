"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { DateFormat } from "@/utils/date-format"
import dayjs from "dayjs"
import { DayPicker } from "react-day-picker"
import Calendar from "../calendar"
import { Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@/components/ui"

type Props = {
    placeholder?: string
    mode: "multiple"
    classNameInput?: string
}
type CalendarProps = React.ComponentProps<typeof DayPicker>;

const DateMultiplePicker = ({ placeholder, classNameInput, ...props }: CalendarProps & Props) => {
    const isMultipleDate = (selected: Date[] | undefined): selected is Date[] => Array.isArray(selected);
    const [textValue, setTextValue] = useState("")

    useEffect(() => {
        if (props.selected && isMultipleDate(props.selected)) {
            const formattedDates = props.selected.map((item) => {
                return DateFormat(dayjs(item), "DD/MM/YYYY");
            });
            setTextValue(formattedDates.join(', '))
        } else {
            setTextValue("")
        }
    }, [props.selected])

    return (
        <Popover placement="top">
            <PopoverTrigger>
                <div>
                    <Textarea
                        variant="bordered"
                        labelPlacement="outside"
                        minRows={1}
                        label="MultipleDatePicker"
                        value={textValue}
                        placeholder={placeholder}
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
export default DateMultiplePicker