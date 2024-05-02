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

function ProfilePage(){

    document.title = 'Профиль';
    const toast = useToast();
    const storedData = localStorage.getItem('userData');
    const retrievedData = JSON.parse(storedData);

    const [userData, setUserData] = useState({
        lastname: retrievedData.lastname,
        user_role_id: retrievedData.user_role.id,
        firstname: retrievedData.firstname,
        surname: retrievedData.surname,
        login: retrievedData.login,
        password: retrievedData.password
      });

      console.log(retrievedData);

    function onChangeInput(e){
        
        const newUserData = {...userData};
        newUserData[e.target.id] = e.target.value
        setUserData(newUserData);

        console.log(userData);
    }

    function handleSave(){
        
        axios.post(`${apiServer}/users/edit/`, userData)
        .then(response => {
            toast.success("Информация о пользователе обновлена");
        })
        .catch(error => {
            toast.warning("Не удалось обновить информацию о пользователе");
        });
    }

    return(
<div className="px-[20px] max-w-[500px]">
        <div className=" text-[32px] font-bold tableName">Профиль</div>
        <div className="mt-[20px] flex flex-col gap-[15px]">
        <Input type="text" isRequired variant='faded' label="Фамилия" value={userData.lastname} id="lastname" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" variant='faded' label="Имя" value={userData.firstname} id="firstname" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" variant='faded' label="Отчество" value={userData.surname} id="surname" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" isReadOnly isDisabled variant='faded' label="Логин" value={userData.login} id="login" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" isDisabled variant='faded' label="Роль в системе" value={retrievedData.user_role.title} id="role" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="password" isDisabled variant='faded' label="Новый пароль" id="password" className="max-w-full" onChange={(e) => onChangeInput(e)}/>
        <Button onClick={()=>handleSave()} color="primary">Сохранить</Button>

        </div>
        </div>
    )
}

export default ProfilePage;