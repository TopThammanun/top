"use client";

import * as React from "react";
import { dateFormat } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { DayPicker, DropdownProps } from "react-day-picker";
import dayjs from "dayjs";
import { Select, SelectItem, cn } from '@nextui-org/react';

const formatCaption = (date: Date) => {
    const y = dateFormat(dayjs(date), "YYYY");
    const m = dayjs(date).format("MMMM");
    return `${m} ${y}`;
};

const formatYearCaption = (date: Date) => {
    const y = dateFormat(dayjs(date), "YYYY");
    return `${y}`;
};

const formatMonthCaption = (date: Date) => {
    const m = dateFormat(dayjs(date), "MMMM");
    return `${m}`;
};

const formatWeekdayName = (date: Date) => {
    const d = dateFormat(dayjs(date), "dd");
    return `${d}`;
};

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) => {
    return (
        <DayPicker
            formatters={{
                formatCaption,
                formatYearCaption,
                formatMonthCaption,
                formatWeekdayName,
            }}
            initialFocus
            fixedWeeks
            fromYear={new Date().getFullYear() - 5}
            toYear={new Date().getFullYear() + 5}
            showOutsideDays={showOutsideDays}
            className={cn("p-3 w-fit", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: `text-base font-medium ${props.captionLayout && props.captionLayout !== "buttons" && "hidden"}`,
                caption_dropdowns: "flex",
                nav: "space-x-1 flex items-center",
                nav_button: "opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-0",
                nav_button_next: "absolute right-0",
                table: "w-72 border-collapse space-y-1",
                head_row: "flex justify-center",
                head_cell:
                    "text-muted-foreground rounded-md w-10 font-normal text-[0.8rem]",
                row: "flex justify-center w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-default focus-within:relative focus-within:z-20",
                day: "flex justify-center items-center h-10 w-10 rounded-xl text-foreground hover:text-primary-foreground hover:bg-primary aria-selected:opacity-100 cursor-pointer",
                day_selected:
                    "[&:not([disabled])]:bg-primary [&:not([disabled])]:text-primary-foreground [&:not([disabled])]:hover:bg-primary [&:not([disabled])]:hover:text-primary-foreground",
                day_today: "bg-default text-default-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                    "[&:not([disabled])]:aria-selected:bg-default [&:not([disabled])]:aria-selected:text-default-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
                    const options = React.Children.toArray(
                        children
                    ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
                    const selected = options.find((child) => child.props.value === value);
                    const handleChange = (value: string) => {
                        const changeEvent = {
                            target: { value },
                        } as React.ChangeEvent<HTMLSelectElement>;
                        onChange?.(changeEvent);
                    };
                    console.log("value", value);

                    return (
                        <Select
                            selectedKeys={[`${value}`]}
                            disabledKeys={[`${value}`]}
                            aria-label="options"
                            labelPlacement="outside"
                            disableSelectorIconRotation
                            variant="bordered"
                            onChange={(event) => {
                                handleChange(event.target.value)
                            }}
                            className="w-28 mx-1"
                        >
                            {options.map((option) => (
                                <SelectItem
                                    key={`${option.props.value}`}
                                    value={option.props.value}
                                >
                                    {option.props.children}
                                </SelectItem>
                            ))}
                        </Select >
                    );
                },
                IconLeft: ({ ...props }) => (
                    <Icon icon="lucide:chevron-left" className="h-4 w-4" />
                ),
                IconRight: ({ ...props }) => (
                    <Icon icon="lucide:chevron-right" className="h-4 w-4" />
                ),
            }}
            {...props}
        />
    );
};
Calendar.displayName = "Calendar";

export default Calendar;
