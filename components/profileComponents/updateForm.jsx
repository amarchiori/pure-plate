import { useState } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { faTrashCan} from "@fortawesome/free-regular-svg-icons";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';

const RecipeUpdateForm = ({ recipe, closeUpdateForm }) => {
  const { register, handleSubmit, reset, control, errors, isSubmitting } = useForm({
    defaultValues: recipe
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const recipeRef = doc(db, 'recipes', recipe.id);
      await updateDoc(recipeRef, data);
      toast.success(`Successfully updated ${data.title}`)
      setIsUpdating(false);
      // reset();
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
    }
  };

  const { fields: ingFields, append: ingAppend, remove: ingRemove} = useFieldArray({
    name: 'ingredients',
    control,
  })

  const { fields: stepFields, append: stepAppend, remove: stepRemove} = useFieldArray({
    name: 'steps',
    control,
  })

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center '>
      <div className='bg-gray-100 rounded-md p-10 overflow-y-scroll max-h-[90vh] relative'>
        <button className='h-10 w-10 absolute -top-2 -left-2' onClick={closeUpdateForm}>
            <FontAwesomeIcon icon={faCircleXmark} style={{color: "#191919",}} />
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 md:grid-cols-2 mb-10">
            <div>
              <label className="block mb-2 text-md font-bold">
                Type of Recipe
              </label>
              <select  className="form-select recipeInput w-full"
                {...register('category', {required: true})}>
                  <option value='American'>American</option>
                  <option value='European'>European</option>
                  <option value='Asian'>Asian</option>
                  <option value='Latin American'>Latin American</option>
                  <option value='Dessert'>Dessert</option>
                  <option value='Other'>Other</option>
              </select>
            </div>
            <div >
                <label className="block mb-2 text-md font-bold">
                    Title
                </label>
                <input 
                    type="text"
                    {...register('title', {required: true})} 
                    className="form-input recipeInput w-full"
                />
                {/* {errors.title && <span>This field is required</span>} */}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-10">
            <div>
              <label className="block mb-2 text-md font-bold">
                Serving Size
              </label>
              <input 
                type="number" 
                className="recipeInput w-full"
                {...register('servingSize', {required: true})}
              />
              {/* {errors.servingSize && <span>This field is required</span>} */}
            </div>
            <div >
                <label className="block mb-2 text-md font-bold">
                    Cook Time
                </label>
                <input 
                    type="text"
                    {...register('cookTime', {required: true})} 
                    className="form-input recipeInput w-full"
                />
                {/* {errors.cookTime && <span>This field is required</span>} */}
            </div>
          </div>
          
          <div className="form-group mb-6">
              <label className="block mb-2 text-md font-bold">
                  Short Description
              </label>
              <textarea 
                  type="textarea" 
                  placeholder="add a short description"
                  className="block w-full text-sm recipeInput"
                  {...register('description', {required: true, minLength: 10})}       
              />
                  {/* {errors.description && <span>This field is required</span>} */}

          </div>

      {/* Ingredients Section */}
          <div className="form-group mb-7">
            <label className="block mb-4 font-bold text-md">
              Ingredients
            </label>
            {ingFields.map((field, index) => {
              return (
                <section key={field.id} className='flex flex-row justify-end gap-x-3 my-2'>
                  <div className="basis-6/12">
                    <label className="block mb-2 text-sm">
                      <span>Item:</span>
                    </label>
                    <input {...register(`ingredients.${index}.name`)} 
                      className="recipeInput w-full"/>
                  </div>
                  <div className="basis-5/12">
                    <label className="block mb-2 text-sm">
                        <span>Quantity:</span>
                    </label>
                    <input {...register(`ingredients.${index}.amount`)} 
                      className="recipeInput w-full"/>
                  </div>
                  <button 
                    type='button' 
                    className="basis-1/12 mt-5"
                    onClick={() => ingRemove(index)} >
                    <FontAwesomeIcon icon={faTrashCan} className='h-6'/>
                  </button>
                </section>
              );
            })}
            <button 
              type='button' 
              className="block text-lightOrange mt-4 font-bold text-md"
              onClick={() => ingAppend({
                  name: '',
                  amount: ''
                })}
            >
              Add Ingredient
            </button>
            {/* <p>{errors?.ingredients?.root?.message}</p> */}
          </div>

      {/* Instructions Section */}
          <div className="form-group mb-6">
            <label className="block mb-4 font-bold text-md">
              Instructions
            </label>
          {stepFields.map((field, index) => {
              return (
                <section key={field.id} className='flex flex-row justify-end gap-x-3 my-2'>
                  <div className="basis-11/12">
                    <label className="block mb-2 text-sm">
                        <span>{index ? `Step ${index}:` : 'Prep:'}</span>
                    </label>
                    <textarea 
                      className="block recipeInput w-full"
                      {...register(`steps.${index}.value`)}
                    />
                  </div>
                  <button 
                    type='button' 
                    className="basis-1/12 mt-5"
                    onClick={() => stepRemove(index)}>
                      <FontAwesomeIcon icon={faTrashCan} className='h-6'/>
                  </button>
                </section>
              );
            })}
            <button type='button' 
                className="block text-lightOrange mt-4 font-bold text-md"
                onClick={() => stepAppend({
                  value: '',
                })}
            >Add Step
            </button>
            {/* <p>{errors.steps?.root?.message}</p> */}
          </div>

          {/* Submitting */}
          <div className="mb-6">
            <button 
                type="submit"
                disabled={isSubmitting} 
                className="w-4/12 h-12 recipeInput bg-lightOrange text-white flex justify-center m-auto font-All-Round-Gothic text-xl">
                {isSubmitting ? 'Submitting...' : 'UPDATE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeUpdateForm;