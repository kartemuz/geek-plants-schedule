import { React, useEffect, useState } from "react";
import { apiServer } from "../components/backend/Config"
import axios from "axios";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import Context from "../layouts/Context";
import { Link } from "@nextui-org/react";
import { HouseIcon } from "../assets/icons/HouseIcon";
import { ArrowIcon } from "../assets/icons/Arrow";
import ScheduleList from "./ScheduleList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GroupsList({ direction, direction_name }) {

  const [groups, setGroups] = useState([]);
  const Value = useContext(Context);
  
  useEffect(() => {
    axios.get(`${apiServer}/groups/get/?direction_id=`+direction)
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        toast.warning("Не удалось загрузить группы направления");
      });
  }, []);


  function handleSchedule(group, direction_name) {

    Value.loadContentPage(<ScheduleList groupAttr={group} direction_name={direction_name}/>);

}
  return (
    
    <div className="w-full ">
    <ToastContainer/>
    <div className="w-full bg-zinc-200 rounded-xl px-[15px] py-[15px] mb-[5px] mt-[15px] flex items-center"><Link href="/" className="mr-[10px]"><HouseIcon height="24" /></Link><ArrowIcon height="18" className="mr-[10px]" /><span>{direction_name}</span></div>
    {groups.length > 0 && (
        <div className="flex flex-row flex-wrap bg-white">
          {groups.map((group) => (
            <Button onClick={()=> {handleSchedule(group.id,direction_name )}} key={group.id} className="flex-1 m-[5px] min-w-[280px] px-[10px] py-[5px]">Группа №{group.id}</Button>
          ))}
        </div>
      ) || (
        <div className="text-center mt-[10px]">Нет групп</div>
      )}
  </div>
  );


}

export default GroupsList;