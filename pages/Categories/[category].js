import { getRecipesByCategory } from "@/utils/firestore/firestore";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Recipe = ({ recipes, category }) => {

  console.log(recipes);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-6 h-screen">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold font-All-Round-Gothic tracking-tight text-gray-900 sm:text-4xl">{category} recipes</h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {recipes && recipes.map((recipe) => (
              <div key={recipe.title}  className="max-w-sm bg-white border border-gray-100 rounded-lg shadow">
                <div className="p-5">
                    <p className="mb-2 text-2xl font-All-Round-Gothic tracking-tight text-gray-900">
                      {recipe.title.toUpperCase()}
                    </p>
                    <p className="mb-3 font-Sabon font-normal text-gray-700">
                      {recipe.description}
                    </p>
                    <Link href="/Categories/[category]/[slug]" as={`/Categories/${recipe.category}/${recipe.slug}`}
                          className="font-Sabon inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rosyBrown rounded-lg hover:bg-earth"
                    >
                      Full Recipe{" "}
                      <FontAwesomeIcon icon={faArrowRight}/>
                    </Link>
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
