import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient = useQueryClient();
    
      const {mutate: deleteCabinMutation, isLoading: isDeleting} = useMutation({
        mutationFn: (id)=> deleteCabin(id),
        onSuccess: ()=> {
          toast.success(`cabins successfully deleted`)
          queryClient.invalidateQueries({
            queryKey: [`cabins`]
          })
        },
        onError: (err)=> toast.error(err.message)
      })

      return {deleteCabinMutation, isDeleting}
}