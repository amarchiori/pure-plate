import { useFieldArray, useForm } from "react-hook-form";
import { AddNewRecipe } from "@/utils/firestore/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function AddRecipe() {
  const router = useRouter();
  const { register, setValue, formState: {errors}, watch, control, handleSubmit, isSubmitting 
  } = useForm({
    defaultValues: {
      category: '',
      title: '',
      slug: '',
      servingSize: '',
      cookTime: '',
      description: '',
      ingredients: [{ name: '', amount: ''}],
      steps: [{value: ''}]
    }
  });

  const { fields: ingFields, append: ingAppend, remove: ingRemove} = useFieldArray({
    name: 'ingredients',
    control,
    rules: {
      required: "Please add at least 1 ingredient"
    }
  })

  const { fields: stepFields, append: stepAppend, remove: stepRemove} = useFieldArray({
    name: 'steps',
    control,
    rules: {
      required: "Please add at least 1 step"
    }
  })

  const titleExist = watch('title');
  const slug = titleExist ? titleExist.toLowerCase().replace(/\s+/g, '-') : '';


  const onSubmit = async (data) => {
    await setValue('slug', slug)
    await AddNewRecipe(data);

    alert(`Added new recipe ${data.title}`)
   
  }

  
  return (
    <div className="m-5 sm:w-10/12 md:w-7/12 sm:m-auto">
    <h1 className="text-freshGreen font-All-Round-Gothic text-center mt-10 mb-20 text-xl md:text-3xl">Add and Share to Friends and Family </h1>
    <form onSubmit={handleSubmit(onSubmit)} className='m-5 font-Sabon text-spaceCadet'>
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
                Title - {slug}
            </label>
            <input 
                type="text"
                {...register('title', {required: true})} 
                className="form-input recipeInput w-full"
            />
            {errors.title && <span>This field is required</span>}
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
          {errors.servingSize && <span>This field is required</span>}
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
            {errors.cookTime && <span>This field is required</span>}
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
              {errors.description && <span>This field is required</span>}

      </div>

  {/* Ingredients Section */}
      <div className="form-group mb-7">
        <label className="block mb-4 font-bold text-md">
          Ingredients
        </label>
        {ingFields.map((field, index) => {
          return (
            <section key={field.id} className='flex flex-row justify-end gap-x-3'>
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
        <p>{errors.ingredients?.root?.message}</p>
      </div>

  {/* Instructions Section */}
      <div className="form-group mb-6">
        <label className="block mb-4 font-bold text-md">
          Instructions
        </label>
      {stepFields.map((field, index) => {
          return (
            <section key={field.id} className='flex flex-row justify-end gap-x-3'>
              <div className="basis-11/12">
                <label className="block mb-2 text-sm">
                    <span>{index ? `Step ${index}:` : 'Step 0 Prep:'}</span>
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
        <p>{errors.steps?.root?.message}</p>
      </div>

  {/* Submitting */}
      <div className="mb-6">
        <button 
            type="submit"
            disabled={isSubmitting} 
            className="w-4/12 h-12 recipeInput bg-lightOrange text-white flex justify-center m-auto font-All-Round-Gothic text-xl">
            {isSubmitting ? 'Submitting...' : 'ADD RECIPE'}
        </button>
      </div>
    </form>
  </div>
  )
}
