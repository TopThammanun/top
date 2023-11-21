import { Fragment, ReactElement, useState } from 'react'
import { useTheme } from "next-themes";
import RootLayout from '@/components/layouts/root-layout';
import MainLayout from '@/components/layouts/main-layout';
import { DateMultiplePicker, DatePicker, DateRangePicker } from '@/components/ui';
import { DateRange } from 'react-day-picker';
import Alert from '@/components/ui/alert';
import { Button, Input } from '@nextui-org/react';
type Props = {}

const Home = (props: Props) => {
  const { theme, setTheme } = useTheme()
  const [date, setDate] = useState<Date | undefined>()
  const [arrDate, setArrDate] = useState<Date[] | undefined>()
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>()

  return (
    <Fragment>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-wrap justify-center items-center gap-5'>
          Tempalte NextJs and NextUI
        </div>
        <div className='flex flex-wrap justify-center items-center gap-5'>
          <Button color="primary" onClick={() => (
            Alert.message({
              content: "Open Message",
              noButton: true,
            })
          )}>
            Open Message
          </Button>

          <Button color="primary" onClick={() => (
            Alert.error({
              content: "Open Error",
            })
          )}>
            Open Error
          </Button>

          <Button color="primary" onClick={() => (
            Alert.warning({
              content: "Open warning",
            })
          )}>
            Open warning
          </Button>

          <Button color="primary" onClick={() => (
            Alert.success({
              content: "Open success",
            })
          )}>
            Open success
          </Button>

          <Button color="primary" onClick={() => (
            Alert.question({
              content: "Open Question",
            })
          )}>
            Open Question
          </Button>

        </div>
        <div className='flex items-center gap-2 p-5 rounded-lg border-1'>
          The current theme is: {theme}
          <Button onClick={() => setTheme('light')}>Light Mode</Button>
          <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
        </div>
        <DatePicker
          mode="single"
          label="DatePicker"
          placeholder='Picker Date'
          labelPlacement="inside"
          variant="faded"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
        />
        <DateMultiplePicker
          mode="multiple"
          label="DateMultiplePicker"
          placeholder='DateMultiplePicker'
          labelPlacement="outside"
          variant="bordered"
          captionLayout='dropdown-buttons'
          selected={arrDate}
          onSelect={setArrDate}
          defaultMonth={arrDate ? arrDate[0] : new Date()}
        />
        <DateRangePicker
          mode="range"
          label="DateRangePicker"
          placeholder='DateMultiplePicker'
          labelPlacement="inside"
          variant="bordered"
          captionLayout='dropdown-buttons'
          selected={rangeDate}
          onSelect={setRangeDate}
          numberOfMonths={2}
          defaultMonth={rangeDate?.from}
        />
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="inside"
          variant='bordered'
        />
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          variant='bordered'
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