import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    const numBookings = bookings?.length;
    const sales = bookings?.reduce((acc, curr)=> acc + curr.totalPrice, 0);
    const checkin = confirmedStays.length;
    const occupation = confirmedStays?.reduce((acc, curr)=> acc + curr.numNights, 0) / (numDays * cabinCount);
    return (
        <>
            <Stat 
                title={"Bookings"} 
                icon={<HiOutlineBriefcase />} 
                value={numBookings} 
                color="blue" 
            />

            <Stat 
                title={"Sales"} 
                icon={<HiOutlineBanknotes />} 
                value={formatCurrency(sales)} 
                color="green" 
            />

            <Stat 
                title={"Check ins"} 
                icon={<HiOutlineCalendarDays />} 
                value={numBookings} 
                color="indigo" 
            />

            <Stat 
                title={"Occupancy rate"} 
                icon={<HiOutlineChartBar />} 
                value={Math.round(occupation * 100) + "%"} 
                color="yellow" 
            />
        </>
    )
}