import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { apiServer } from '../components/backend/Config';
import {
  Input,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import { useToast } from "../pages/context/ToastContext"
import md5 from 'md5';

function LoginPage(){


    document.title = 'Авторизация';
    const toast = useToast();

    const [formAuth, setFormAuth] = useState({
        login: "",
        password: ""
      });

    function onChangeInput(e){
        console.log(e.target.value);
        const newFormAuth = {...formAuth};
        if(e.target.id == "login"){
            newFormAuth[e.target.id] = e.target.value;
        }
        else if(e.target.id == "password"){ 
            newFormAuth[e.target.id] = md5(e.target.value);
        }  
        setFormAuth(newFormAuth);
      }



    function handleAuth(){
        axios.post(`${apiServer}/users/auth/`, formAuth)
        .then(response => {
            if(response.data != 'message_notFoundUser'){
                localStorage.setItem('jwtToken', response.data);
                document.location.href="/admin/";
            }else{
                toast.warning("Неверный логин и/или пароль");
            }
        })
        .catch(error => {
            toast.warning("Ошибка запроса авторизации");
        });

    }



    return(
        <div className="h-full flex justify-center items-center">
            <div className="form min-w-[420px] bg-zinc-200 p-[15px] rounded-2xl">
                <div className="header mb-[10px]">
                    <div className="title font-semibold text-[24px] py-[10px] text-center ">Авторизация</div>
                </div>      
                <div className="body flex flex-col gap-[10px]">
                <Input type="text" isRequired variant='flat' label="Логин" id="login" className="max-w-full" onChange={(e) => onChangeInput(e)}/>
                <Input type="text" isRequired variant='flat' label="Пароль" id="password" className="max-w-full" onChange={(e) => onChangeInput(e)}/>
                <Button className='mt-[10px]' onClick={()=>handleAuth()} color="primary">Войти</Button>

                </div>
            </div>
        </div>
    )
}

export default LoginPage;