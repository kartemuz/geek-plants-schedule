import ErrorLogo from '../assets/img/Error_logo.svg'
import Link from "@nextui-org/react";

function ErrorPage(){
    return(
        <div className="h-full flex justify-center items-center">
             <div className="">
                <img width="350px" src={ErrorLogo} alt="" />
             </div>
            <div className="ml-[60px]">
                <div className='text-[200px] font-bold text-stone-600 leading-[250px]'>404</div>
                <div className="w-[220px] h-[5px] bg-stone-600"></div>
                <span className='text-[50px] font-semibold text-stone-500 leading-[100px]'>Страница не найдена</span>
                <Link className='text-[50px] font-semibold text-stone-500 leading-[100px]' href="/home/">Страница не найдена</Link>
            </div>
        </div>
    )
}

export default ErrorPage;