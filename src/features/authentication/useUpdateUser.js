import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    
    const {mutate: updateUser, isLoading: isUpdatingUser} = useMutation({
    mutationFn: UpdateCurrentUser,
    onSuccess: ({user})=> {
        queryClient.setQueryData(["user"], user)
        toast.success(`user account was successfully updatet`);
    },
    onError: (err)=> toast.error(err.message)
    });

    return {updateUser, isUpdatingUser}
}