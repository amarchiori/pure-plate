import { useRouter } from "next/router";
import { getIndividualRecipe } from "@/utils/firebase";

function IndividualRecipe({ recipeData }) {
  const router = useRouter();
  const { category, slug } = router.query;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-6 h-screen">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold font-All-Round-Gothic tracking-tight text-gray-900 sm:text-4xl">{recipeData.title}</h2>
      </div>
      <div className="border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">

      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { category, slug} = params;

  const recipeData = await getIndividualRecipe(category, slug)

  return{
    props: {
      recipeData
    }
  }
}

export default IndividualRecipe
