import { React, useState } from 'react';
import  axios from 'axios';

import {
  Input,
  Select,
  SelectItem,
  Button,
  Checkbox,
  Link,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import { apiServer } from '../components/backend/Config';

function AddTeacherForm() {

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
    console.log(newFormData);
  }

  function dd(){
    try{
      3==4;
      return true;
    }catch(r){
      return false;
    }
  }


  async function handleAxiosRequest() {
    const url = apiServer + '/teachers/sxzc';

    try {
      const response = await axios.post(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          lastname: formData.lastname,
          firstname: formData.firstname,
          position: formData.position,
          teaching_profile: formData.teaching_profile
      },
      });
  
      if (response.status === 200) {
        console.log('Request successful!', response.data);
        return true;
      } else {
        console.error('Request failed:', response.status, response.statusText);
        return false; // Return false for failed response
      }
    } catch (error) { // Handle errors
      console.error('Error during request:', error);
      return false; // Return false for errors
    }
  }

  function sendForm(event) {
    const url = apiServer + '/teachers/sxzc';
    
  
      const request = Axios.post(url, {
        lastname: formData.lastname,
        firstname: formData.firstname,
        position: formData.position,
        teaching_profile: formData.teaching_profile
    }).then((response) => {
      return true;

    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      return false;
    });

    return true;
  }

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={(e) => handleAxiosRequest(e)}>
          <ModalHeader className="flex flex-col gap-1">Новый преподаватель</ModalHeader>
          <ModalBody>
            <div className="flex justifyBetween gap-3">
              <Input type="text" label="Фамилия" id="lastname" className="max-w-xs" onChange={(e) => onChangeInput(e)}/>
              <Input type="text" label="Имя" id="firstname" className="max-w-xs" onChange={(e) => onChangeInput(e)}/>
            </div>
            <Input type="text" label="Должность" id="position" className="max-w-full" onChange={(e) => onChangeInput(e)}/>
            <Input type="text" label="Профиль" id="teaching_profile" className="max-w-full" onChange={(e) => onChangeInput(e)}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="button" onClick={(event) => {
              if (dd(event)) {
                console.log('Form submitted successfully');
                onClose();
              } else {
                console.error('Error submitting form');
              }
            }}>
              Добавить
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default AddTeacherForm;