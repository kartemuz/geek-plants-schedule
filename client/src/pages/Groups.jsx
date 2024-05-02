import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Select,
  SelectItem,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Modal, 
  ModalContent, 
  useDisclosure, 
  Spinner 
} from "@nextui-org/react";
import {PlusIcon} from "../assets/icons/PlusIcon";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {SearchIcon} from "../assets/icons/SearchIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {ImportIcon} from "../assets/icons/ImportIcon";
import {columns} from "./data/groups";
import {capitalize} from "./utils";
import AddTeacherForm from '../modalForms/AddTeacherForm'
import EditTeacherForm from '../modalForms/EditTeacherForm'
import DeleteTeacherForm from '../modalForms/DeleteTeacherForm'
import {ExportWordIcon} from "../assets/icons/ExportWordIcon";
import { useToast } from "../pages/context/ToastContext"
import { useContext } from "react";
import Context from "../layouts/Context";
import { apiServer } from "../components/backend/Config";
import axios from "axios";
import ProgramList from "../layouts/ProgramsList";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

function GroupsPage(){

  document.title = 'Группы';
  const [groups, setGroups] = React.useState([]);
  const toast = useToast();
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [action, setAction] = React.useState('');
  const [loadindData, setLoadingData] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [idTeacher, setIdTeacher] = React.useState(0);

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

  function getForm() {
    switch (action) {
      case 'add':
        return <AddGroupForm handleFunction={() => {setIsLoading(true)}}/>;
      case 'delete':
        return <DeleteGroupForm handleFunction={() => {setIsLoading(true)}} id={idTeacher} fio={fio}/>;
      default:
        return null;
    }
  };
  
    return (
      <>
      <div className="px-[20px] text-[32px] font-bold tableName">Группы</div>
      <div className="p-[20px] rounded-[20px] bg-stone-100">
      {
        data.map((direction) => (
          <Button onClick={() => { handleDirectionGroup(direction.id, direction.name + " (" + direction.type + ")") }} key={direction.id} className="flex-1 m-[5px] min-w-[280px] px-[10px] py-[5px]">{direction.name + " (" + direction.type + ")"}</Button>
        ))
      }
      </div>

      

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <>
              {getForm()}
            </>

        </ModalContent>
      </Modal>

      </>
    );
}

export default GroupsPage;