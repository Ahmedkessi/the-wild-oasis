import supabase, {supabaseUrl} from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
    .from('cabins')
    .select('*')
    
    if(error){
        throw new Error(`cabins could not load!`)
    }

    return data
}


export async function deleteCabin(id) {
    const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)


    if(error) {
        throw new Error(`Cabins could not be deleted!`)
    }

    return data;
}


export async function createEditCabin(newCabin, id) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(`/`, ``);
    const imagePath = typeof(newCabin.image) === `string` ?
    newCabin.image
    :
    `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    let query = supabase.from('cabins');


    if(!id) query = query.insert([{...newCabin, image: imagePath}])
    if(id) query = query.update({...newCabin, image: imagePath}).eq(`id`, id) 
    
    
    

    const { data, error } = await query.select();


    if(error) {
        throw new Error(`Cabins could not be created!`)
    }


    const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

    if(storageError) {
        await supabase.from('cabins').delete().eq('id', data.id)
        throw new Error(`Cabin image could not be updated and the cabin was not created!`)
    }

    return data;
}