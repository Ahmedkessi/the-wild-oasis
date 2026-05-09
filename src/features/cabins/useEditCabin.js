import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin(idToEdit) {
    const queryClient = useQueryClient();
    
    const {mutate: editCabin, isLoading: isEditing} = useMutation({
    mutationFn: (data)=> createEditCabin(data, idToEdit),
    onSuccess: ()=> {
        toast.success(`cabin was successfully edited`);
        queryClient.invalidateQueries({
        queryKey: [`cabins`],
        })
    },
    onError: (err)=> toast.error(err.message)
    });

    return {editCabin, isEditing}
}