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


function EditTeacherForm({id, handleFunction}) {

    const toast = useToast();
    const [formData, setFormData] = useState({
        id: "",
        lastname: "",
        firstname: "",
        surname: "",
        position: "",
        teaching_profile: ""
    });


    function onChangeInput(e){
        const newFormData = {...formData}
        newFormData[e.target.id] = e.target.value
        setFormData(newFormData);
    }

    function capitalizeLetter(data) {
        return data[0].toUpperCase() + data.slice(1);
    }


    useEffect(() => {
        async function getDataForm() {
            try {
                const url = apiServer + '/teachers/get?id='+id;
                const response = await axios.get(url);
                setFormData(response.data);
                return true; // Успешный запрос
            } catch (error) {
                alert('Ошибка запроса. Подробности в console');
                console.error('Error fetching data:', error);
                setIsSuccess(false);
                return false; // Ошибка при запросе
            }
        }
    
        getDataForm();
      }, []);

    function sendDataForm(){
        return axios.post(apiServer + '/teachers/edit', formData)
        .then((response) => {
            return true;
        })
        .catch((error) => {
            console.error('Ошибка отправки данных:', error);
            return false;
        });
    }


    async function handleClick() {
        try {
            const success = await sendDataForm();
            toast.success('Изменения успешно внесены');
            return true;
        } catch (error) {
            toast.warning('Ошибка обновления данных');
            return false;
        }
    }
    return (
        <ModalContent>
        {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Преподаватель {formData.lastname + ' ' + formData.firstname}</ModalHeader>
                <ModalBody>
                    <Input type="text" label="Фамилия" id="lastname" value={formData.lastname} className="max-w-full" isRequired onChange={(e) => onChangeInput(e)}/>
                    <div className="flex justifyBetween gap-3">
                        <Input type="text" label="Имя" id="firstname" value={formData.firstname} className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
                        <Input type="text" label="Отчество" id="surname" value={formData.surname} className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
                    </div>
                    <Input type="text" label="Должность" id="position" value={formData.position} className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
                    <Input type="text" label="Профиль" id="teaching_profile" value={formData.teaching_profile} className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit" onClick={() => {handleClick() && handleFunction(); onClose(); }}>
                        Сохранить
                    </Button>
                </ModalFooter>
            </>
        )}
    </ModalContent>
  );
};

export default EditTeacherForm;