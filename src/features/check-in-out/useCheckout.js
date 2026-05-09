import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useCheckout = () => {
    const queryClient = useQueryClient();

    const {mutate: checkout, isLoading: isCheckingOut} = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, {
        status: "checked-out",
    }),


    onSuccess: (data) => {
        toast.success(`Booking #${data.id} checked out successfully!`);
        queryClient.invalidateQueries({active: true});
    },

    onError: () => {
        toast.error("Failed to check out booking. Please try again.");
    }
    });

    return {checkout, isCheckingOut};
};

export default useCheckout;