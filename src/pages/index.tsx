// import MainLayout from '@/components/layouts/MainLayout'
// import RootLayout from '@/components/layouts/RootLayout'
import { Fragment, ReactElement, useState } from 'react'
import { useTheme } from "next-themes";
import RootLayout from '@/components/layouts/RootLayout';
import MainLayout from '@/components/layouts/MainLayout';
import { Button, Calendar, DateMultiplePicker, DatePicker, DateRangePicker, Input } from '@/components/ui';
import { DateRange } from 'react-day-picker';
import { Icon } from '@iconify/react';
type Props = {}

const Home = (props: Props) => {
  const { theme, setTheme } = useTheme()
  const [date, setDate] = useState<Date | undefined>()
  const [arrDate, setArrDate] = useState<Date[] | undefined>()
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>()

  return (
    <Fragment>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-center items-center gap-5'>Tempalte NextJs and NextUI
          <Button color="primary">
            Button
          </Button>
        </div>
        <div className='flex items-center gap-2 p-5 rounded-lg border-1'>
          The current theme is: {theme}
          <Button onClick={() => setTheme('light')}>Light Mode</Button>
          <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
        </div>
        <Calendar captionLayout='buttons' className='bg-card border rounded-xl ' />
        <DatePicker
          mode="single"
          placeholder='Picker Date'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <DateMultiplePicker
          mode="multiple"
          placeholder='Picker Date'
          captionLayout='dropdown-buttons'
          min={1}
          selected={arrDate}
          onSelect={setArrDate}
        />
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          variant='bordered'
        />
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          variant='bordered'
        />
        <DateRangePicker
          mode="range"
          placeholder='Picker Date'
          defaultMonth={rangeDate?.from}
          captionLayout='dropdown-buttons'
          selected={rangeDate}
          onSelect={setRangeDate}
          numberOfMonths={2}
        />
      </div>
    </Fragment >
  )
}
export default Home

Home.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <RootLayout>
        <MainLayout>
          {page}
        </MainLayout>
      </RootLayout>
    </Fragment>
  );
};