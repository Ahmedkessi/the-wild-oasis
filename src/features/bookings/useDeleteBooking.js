import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    
      const {mutate: deleteBookingMutation, isLoading: isDeleting} = useMutation({
        mutationFn: (id)=> deleteBooking(id),
        onSuccess: ()=> {
          toast.success(`Booking successfully deleted`)
          queryClient.invalidateQueries({
            queryKey: [`bookings`]
          })
        },
        onError: (err)=> toast.error(err.message)
      })

      return {deleteBookingMutation, isDeleting}
}