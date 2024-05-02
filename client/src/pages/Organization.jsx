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

function OrganizationPage(){

    document.title = 'Сведения об организации';
    const toast = useToast();

    const [dataOrg, setDataOrg] = useState({
        full_name: "",
        abbr_name: "",
        address: "",
        phone: "",
        email: "",
        vk: "",
        telegram: ""
      });

    
    useEffect(() => {
        axios.get(`${apiServer}/org/get/`)
            .then(response => {
                setDataOrg(response.data);
                console.log("sdf");
            })
            .catch(error => {
                toast.warning("Не удалось загрузить информацию об организации");
            });
    }, []);

    function onChangeInput(e){
        console.log(e.target.value);
        const newDataOrg = {...dataOrg};
        newDataOrg[e.target.id] = e.target.value
        setDataOrg(newDataOrg);
      }



    function handleSave(){
        axios.post(`${apiServer}/org/edit/`, dataOrg)
        .then(response => {
            toast.success("Информация обновлена");
        })
        .catch(error => {
            toast.warning("Не удалось обновить информацию об организации");
        });
    }

    return(
        <div className="px-[20px] max-w-[500px]">
        <div className=" text-[32px] font-bold tableName">Организация</div>
        <div className="mt-[20px] flex flex-col gap-[15px]">
        <Input type="text" isRequired variant='faded' label="Полное наименование" value={dataOrg.full_name} id="full_name" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" variant='faded' label="Сокращенное наименование" value={dataOrg.abbr_name} id="abbr_name" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" variant='faded' label="Адрес" value={dataOrg.address} id="address" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" variant='faded' label="Телефон" value={dataOrg.phone} id="phone" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" variant='faded' label="Email" value={dataOrg.email} id="email" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" variant='faded' label="VK" value={dataOrg.vk} id="vk" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Input type="text" variant='faded' label="Telegram" value={dataOrg.telegram} id="telegram" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
        <Button onClick={()=>handleSave()} color="primary">Сохранить</Button>

        </div>
        </div>
    )
}

export default OrganizationPage;