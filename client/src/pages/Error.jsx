import ErrorLogo from '../assets/img/Error_logo.svg'
import {Link} from "@nextui-org/react";

function ErrorPage(){

    document.title = 'Ошибка 404';

    return(
        <div className="h-full flex justify-center items-center px-[100px]">
             <div className="">
                <img width="350px" src={ErrorLogo} />
             </div>
            <div className="ml-[100px]">
                <div className='text-[200px] font-bold text-stone-700 leading-[250px]'>404</div>
                <div className="w-[220px] h-[5px] bg-stone-600"></div>
                <div className='text-[50px] mt-[30px] font-semibold text-stone-600 leading-1'>Страница не найдена</div>
                <Link className='text-[26px] mt-[10px] font-normal text-stone-500 leading-[10px]' href="/">Вернуться на главную </Link>
            </div>
        </div>
    )
}

export default ErrorPage;