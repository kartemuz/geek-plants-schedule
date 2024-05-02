import { React, useEffect, useState } from "react";
import { apiServer } from "../components/backend/Config"
import axios from "axios";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import Context from "../layouts/Context";
import GroupsList from "../layouts/GroupsList";

function ProgramsList() {

  const [data, setData] = useState([]);
  const Value = useContext(Context);

  function handleDirectionGroup(direction_id, direction_name) {

      Value.loadContentPage(<GroupsList direction={direction_id} direction_name={direction_name}/>);

  }

  useEffect(() => {
    axios.get(`${apiServer}/directions/get/`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
    <div className="text-[28px] font-semibold mb-[10px]">Направления подготовки</div>
    <div className="flex flex-row flex-wrap bg-white">
        {
        data.map((direction) => (
          <Button onClick={() => { handleDirectionGroup(direction.id, direction.name + " (" + direction.type + ")") }} key={direction.id} className="flex-1 m-[5px] min-w-[280px] px-[10px] py-[5px]">{direction.name + " (" + direction.type + ")"}</Button>
        ))
      }

    </div>
    </>
  );
}

export default ProgramsList;