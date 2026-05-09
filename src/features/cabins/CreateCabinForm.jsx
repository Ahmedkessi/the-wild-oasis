import {useForm} from "react-hook-form"
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";







function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  const {id: idToEdit, ...toEditValues} = cabinToEdit;
  const isEditionSesion = Boolean(idToEdit);

  const {createCabin, isCreating} = useCreateCabin();
  const {editCabin, isEditing} = useEditCabin(idToEdit);


  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditionSesion ? toEditValues : {}
  });
  const {errors} = formState;

  

  const isWorking = isCreating || isEditing;


  function submit(data){
    const imageHasUrl = typeof(data.image) === `string`;
    isEditionSesion ? 
    editCabin({...data, image: imageHasUrl ? data.image : data.image[0]}, {
      onSuccess: ()=> {
        reset();
        onCloseModal?.();
      }
    }) :  
    
    createCabin({...data, image: data.image[0]}, {
      onSuccess: ()=> {
        reset();
        onCloseModal?.();
      },
    }) 
  }
 

  function errorHandle(err) {
    console.log(errors);
  }
  


  return (
    <Form onSubmit={handleSubmit(submit, errorHandle)} type={onCloseModal ? `modal` : `regular`}> 
      <FormRow label={`Cabin name`} error={errors?.name?.message}>
        <Input disabled={isWorking} type="text" id="name" {...register(`name`, {required: `this field is required!`})} />
      </FormRow>

      <FormRow label={`Maximum capacity`} error={errors?.maxCapacity?.message}>
        <Input disabled={isWorking} type="number" id="maxCapacity" {...register(`maxCapacity`, 
          {required: `this field is required!`,
            min: {
              value: 1,
              message: `Cabacity should be atleast one`
            },
          })} />
      </FormRow>



      <FormRow label={`Regular price`} error={errors?.regularPrice?.message}>
        <Input disabled={isWorking} type="number" id="regularPrice" {...register(`regularPrice`, 
          {required: `this field is required!`,
            min: {
              value: 10,
              message: `Price should be atleast 10`
            },
          })} />
      </FormRow>

      <FormRow label={`Discount`} error={errors?.discount?.message}>
        <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register(`discount`, 
          {required: `this field is required!`,
            validate: (val)=> val <= +getValues().regularPrice || `Discount should be less than regular price`,
          })} />
      </FormRow>

      <FormRow label={`Description for website`} error={errors?.description?.message}>
        <Textarea disabled={isWorking} type="number" id="description" defaultValue="" {...register(`description`, {required: `this field is required!`})} />
      </FormRow>

      <FormRow label={`Cabin photo`} error={errors?.name?.image}>
        <FileInput disabled={isWorking} id="image" accept="image/*" {...register(`image`, {required: isEditionSesion ? false : `this field is required!`})} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" disabled={isWorking} type="reset" onClick={()=> onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditionSesion ? `Edit cabin` : `Create new cabin`}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
