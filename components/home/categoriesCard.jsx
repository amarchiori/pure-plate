import Image from "next/image"

function Category({ category, onClick, imageUrl}) {
  return (
    <div 
        className='h-80 w-full sm:w-3/12 m-auto'
        onClick={() => onClick(category)}
    >
        <div className="relative w-full h-56 z-10">
            <Image 
                src={imageUrl} 
                alt={imageUrl} 
                fill
                className="object-cover rounded-lg"
                quality={50}
                sizes="(min-width: 60em) 24vw,
                  (min-width: 28em) 45vw,
                    100vw"
                priority
                >
            </Image>
            <div className='absolute bottom-0 right-0 bg-white p-2 text-rosyBrown rounded-tl-lg font-semi-bold tracking-wide'>
            <h1>
                {category}
            </h1>
        </div>
        </div>
        
    </div>
  )
}

export default Category