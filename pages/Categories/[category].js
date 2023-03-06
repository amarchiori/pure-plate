import { getRecipesByCategory } from "@/utils/firestore/firestore";
import Link from "next/link";
import Image from "next/image";

const Recipe = ({ recipes, category }) => {

  console.log(recipes);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-6 h-screen overflow-y-scroll mb-10">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold font-All-Round-Gothic tracking-tight text-gray-900 sm:text-4xl">{category} recipes</h2>
      </div>
      <div className="mx-auto mt-10 grid w-full md:max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      {recipes && recipes.map((recipe) => (
              <div key={recipe.title}  className="bg-white border border-gray-100 flex rounded-lg shadow">
              <div className="relative hidden sm:block h-auto w-11/12">
              <Image 
                  src={recipe.imageUrl}
                  alt={recipe.imageUrl}
                  fill
                  sizes="50vw"
                  className="object-cover overflow-hidden"
              />
              </div>
              <div className="p-5 ">
                  <div className="sm:flex sm:flex-col">
                      <p className="mb-2 text-xl tracking-wide font-All-Round-Gothic text-gray-900">
                      {recipe.title.toUpperCase()}
                      </p>
                      <p className="mb-3 font-Sabon text-sm text-gray-700">
                      {recipe.description}
                      </p>
                      <div className="flex justify-between">
                          <Link href="/Categories/[category]/[slug]" as={`/Categories/${recipe.category}/${recipe.slug}`}
                              className="font-Sabon w-max px-3 py-2 text-sm font-medium text-white bg-lightOrange rounded-lg"
                          >
                          Full Recipe
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
          ))}
        </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params, query } = context;
  const { category } = params;
  const recipes = await getRecipesByCategory(context.query.category);

  return{
    props: {
      recipes,
      category,
    }
  }
}

export default Recipe;
