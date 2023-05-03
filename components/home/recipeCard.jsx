import Link from "next/link"
import Image from "next/image"

function RecipeCard({title, imageUrl, description, ID, cookTime}) {
  return (
    <div className="h-full w-full sm:w-2/5 lg:w-1/4 mx-auto py-10">
        <div className="h-[250px] w-full border-2 border-grey-600 relative">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    fill
                    alt={title}
                    className="object-cover"
                    sizes="(max-width: 60em) 24vw,
                    (max-width: 28em) 45vw,
                    100vw"
                    placeholder="blur"
                    blurDataURL={imageUrl}
                />
            ) : (
                <></>
            )}
        </div>
        <div className="grid grid-cols-4 grid-rows-3 p-5 bg-white text-xs gap-2">
            <h3 className="row-start-1 col-span-2 font-bold">{title}</h3>
            <h3 className="row-start-1 col-start-4 text-end">{cookTime}</h3>
            <p className="row-start-2 col-span-full">{description}...</p>
            <Link className='text-rosyBrown row-start-3 col-start-4 text-bold text-end'
                href={`/recipe/${ID}`}>
                FULL RECIPE
            </Link>
        </div>
    </div>
  )
}

export default RecipeCard