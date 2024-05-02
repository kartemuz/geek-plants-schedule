import { React, useState } from 'react';
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

function AddTeacherForm() {

  const toast = useToast();
  const [formData, setFormData] = useState({
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

  async function sendDataForm() {
    try {
      const url = apiServer + '/teachers/new';

      await axios.post(url, { 
        lastname: capitalizeLetter(formData.lastname),
        firstname: capitalizeLetter(formData.firstname),
        position: formData.position,
        surname: capitalizeLetter(formData.surname),
        teaching_profile: formData.teaching_profile
       });
      return true; // Успешный запрос
    } catch (error) {
      toast.warning("Ошибка при попытке добавления преподавателя")
      console.error('Error fetching data:', error);
      return false; // Ошибка при запросе
    }
  }

  return (
    <ModalContent>
      
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Новый преподаватель</ModalHeader>
          <ModalBody>
            <Input type="text" label="Фамилия" id="lastname" className="max-w-full" isRequired onChange={(e) => onChangeInput(e)}/>
            <div className="flex justifyBetween gap-3">
              <Input type="text" label="Имя" id="firstname" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
              <Input type="text" label="Отчество" id="surname" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
            </div>
            <Input type="text" label="Должность" id="position" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
            <Input type="text" label="Профиль" id="teaching_profile" className="max-w-full"  onChange={(e) => onChangeInput(e)}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={async () => {
                const isSuccess = await sendDataForm();
                if (isSuccess) {
                  toast.success(`Преподаватель ${formData.lastname + " " + formData.firstname + " " + formData.surname} успешно добавлен`)

                  onClose();
                }
            }}>
              Добавить
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};

export default AddTeacherForm;