import {React, useEffect, useState} from "react";
import {apiServer} from "../components/backend/Config"
import axios from "axios";
import ScheduleList from "./ScheduleList";

function TeachersList({lastname}){

    // console.log('123');
    //    async function loadTeachers(){
    //     // await axios.get(`${apiServer}/searchSchedule/teacher?lastname=${lastname}`)
    //     // .then(response => {
    //     //   setData(response.data);
    //     // })
    //     // .catch(error => {
    //     //   console.error(error);
    //     // });
    //     }
    //     loadTeachers();

  return (
    <div className="flex ">
        Учителя
        {
        axios.get(`${apiServer}/searchSchedule/teacher?lastname=${lastname}`).then((data)=>{console.log(data.data)})

            // data.map((teacher) => (
            //     <div key={teacher.id} className="bg-stone-300 rounded-lg">{teacher.lastname}</div>
            //   ))
        }

    </div>  
  );
}

export default TeachersList;