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

function DeleteTeacherForm({id, fio}) {
    const [formData, setFormData] = useState({
        lastname: "",
        firstname: "",
        surname: "",
        position: "",
        teaching_profile: ""
    });

        // try {
        //   const url = apiServer + '/teachers/get?id=2';
    
        //   const response = axios.get(url);
        //   console.log(response);
        //   return true; // Успешный запрос
        // } catch (error) {
        //   alert('Ошибка запроса. Подробности в console');
        //   console.error('Error fetching data:', error);
        //   setIsSuccess(false);
        //   return false; // Ошибка при запросе
        // }

    function onChangeInput(e){
        const newFormData = {...formData}
        newFormData[e.target.id] = e.target.value
        setFormData(newFormData);
    }

    function capitalizeLetter(data) {
        return data[0].toUpperCase() + data.slice(1);
    }

    async function deleteTeacher() {
            try {
                const url = apiServer + '/teachers/delete?id='+id;
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

    

    return (
        <ModalContent>
        {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Предупреждение</ModalHeader>
                <ModalBody>
                    <span>Вы уверены, что хотите удалить преподавателя <strong>{fio}?</strong></span>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" type="submit" onClick={async () => {
                        try {
                            const isSuccess = await deleteTeacher();
                            if (isSuccess) {
                                onClose();
                            }
                        } catch (error) {
                            alert('Ошибка запроса. Подробности в console');
                            console.error('Error submitting form:', error);
                        }
                    }}>
                        Удалить
                    </Button>
                </ModalFooter>
            </>
        )}
    </ModalContent>
  );
};

export default DeleteTeacherForm;