import Image from "next/image";
import logo from '../../public/images/PurePlateHLogo.png'

const LoadingAnimation = () => {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse h-80 w-80 relative">
          <Image 
            src={logo} 
            alt="Logo" 
            fill
            className="object-contain"
            priority
            sizes="(min-width: 60em) 24vw,
            (min-width: 28em) 45vw,
            100vw"
          />
        </div>
      </div>
    );
  };
  
  export default LoadingAnimation;