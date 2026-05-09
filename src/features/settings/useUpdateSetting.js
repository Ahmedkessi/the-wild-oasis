import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as UpdateSettingAPI } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();
    
    const {mutate: updateSetting, isLoading: isUpdating} = useMutation({
    mutationFn: UpdateSettingAPI,
    onSuccess: ()=> {
        toast.success(`setting was successfully updated`);
        queryClient.invalidateQueries({
        queryKey: [`settings`],
        })
    },
    onError: (err)=> toast.error(err.message)
    });

    return {updateSetting, isUpdating}
}