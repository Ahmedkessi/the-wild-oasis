import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const [searchParam] = useSearchParams();
    const page = !searchParam.get('page') ? 1 : Number(searchParam.get('page'));


//////////////////////////
    const filterVal = searchParam.get('status');
    const filter = filterVal === null || filterVal === 'all' ? null :
                     {field: 'status', value: filterVal};
                    //{field: 'totalPrice', value: 4000, method: 'gte'};

    const sortByRaw = searchParam.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = {field, direction};
///////////////////////////


///QUERY////////////////////////
    const {data: {data: bookings, count} = {}, isLoading, error} = useQuery({
        queryKey :['bookings', filter, sortBy, page],
        queryFn: ()=> getBookings(filter, sortBy, page),
    });
//////////////////////////


//PREFETCHING//////////////////
    const pageCount = Math.ceil(count / PAGE_SIZE);
    const queryClient = useQueryClient();
    
    if(page < pageCount) {
        queryClient.prefetchQuery({
        queryKey :['bookings', filter, sortBy, page + 1],
        queryFn: ()=> getBookings(filter, sortBy, page + 1),
    })
    }

    if(page > pageCount) {
        queryClient.prefetchQuery({
        queryKey :['bookings', filter, sortBy, page - 1],
        queryFn: ()=> getBookings(filter, sortBy, page - 1),
    })
    }
/////////////////////////


    return {
        bookings,
        isLoading,
        error,
        count, 
        page,
    }
}