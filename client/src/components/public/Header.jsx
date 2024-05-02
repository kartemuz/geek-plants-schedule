import { React, useState, useEffect } from "react";
import Logo from "../../assets/img/Logo.svg"
import { Link, Input, Tabs, Tab, Button } from "@nextui-org/react";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { useContext } from "react";
import Context from "../../layouts/Context";
import ProgramsList from "../../layouts/ProgramsList";
import axios from "axios";
import { ArrowLeft } from "../../assets/icons/ArrowLeft";
import { apiServer } from "../backend/Config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScheduleList from "../../layouts/ScheduleList";


function Header() {

  const [searchText, setSearchText] = useState('');
  const [typeSearch, setTypeSearch] = useState('group');
  const Value = useContext(Context);
  const [dataOrg, setDataOrg] = useState({
    full_name: "",
    abbr_name: "",
    address: "",
    phone: "",
    email: "",
    vk: "",
    telegram: ""
  });

  const returnButton = <Button className="m-[5px] bg-foreground text-background" startContent={<ArrowLeft width={20} />} onPress={() => { setSearchText(''); Value.loadContentPage(<ProgramsList />); setSearchText('') }}>Вернуться обратно</Button>;

  useEffect(() => {
    axios.get(`${apiServer}/org/get/`)
        .then(response => {
            setDataOrg(response.data);
        });
}, []);

  function handleTeachersSearch(teachersData) {

    Value.loadContentPage(
      <div className="w-full">

        {returnButton}

        <div className="flex flex-row flex-wrap bg-white">
          {
            teachersData.map((teacher) =>
              <Button onClick={() => handleTimeTableTeacher(teacher.id, teacher.lastname + " " + teacher.firstname + " " + teacher.surname)} className="flex-1 m-[5px] min-w-[280px] px-[10px] py-[5px]" href="#" key={teacher.id}>
                <div>{teacher.lastname + " " + teacher.firstname + " " + teacher.surname}</div>
              </Button>

            )
          }
        </div>
      </div>
    );

  }

  function handleTimeTableGroup(group, direction_name){
    Value.loadContentPage(<ScheduleList groupAttr={group} direction_name={direction_name}/>);
  }


  function handleTimeTableTeacher(teacher_id, teacher_fio){
    Value.loadContentPage(<ScheduleList teacherAttr={teacher_id} teacherFIO={teacher_fio}/>);
  }


  function handleGroupsSearch(groupsData) {

    Value.loadContentPage(
      <div className="w-full">

        {returnButton}

        <div className="flex flex-row flex-wrap bg-white">
          {
            groupsData.map((group) =>
              <Button onClick={()=>handleTimeTableGroup(group.id, group.name + " (" + group.type + ")")} className="flex-1 m-[5px] min-w-[280px] px-[10px] py-[5px]" href="#" key={group.id}>
                <div><strong>Группа № {group.id}</strong> | {group.name + " (" + group.type + ")"}</div>
              </Button>

            )
          }
        </div>
      </div>
    );
  }


  function handleClickSearch() {

    console.log(typeSearch);
    if (searchText != '') {
      if (typeSearch == 'group') {
        console.log('вывод учителей');
        axios.get(`${apiServer}/searchSchedule/group?name=` + searchText).then((groups) => {
          if (groups.data.length > 0) {
;            handleGroupsSearch(groups.data);
          } else {
            toast.info("Группы не найдены");
          }
        }).catch((error) => { toast.error("Ошибка поиска: " + error.message) });
      }

      if (typeSearch == 'teacher') {
        console.log('вывод учителей');
        axios.get(`${apiServer}/searchSchedule/teacher?lastname=` + searchText).then((teachers) => {
          if (teachers.data.length > 0) {
            handleTeachersSearch(teachers.data);
          } else {
            toast.info("Преподаватели не найдены");
          }
        });
      }

    }
  }

  return (

    <div className="flex py-[20px] px-[20px] justify-between h-[120px]">
      <div className="LogoBox flex items-center">
        <Link href="/">
          <img src={Logo} height={70} className="" />
        </Link>
        <div className="w-[2px] h-[80%] bg-zinc-600 mx-[20px]"></div>
        <div>
          <div className="font-bold text-[30px] leading-[34px]">{dataOrg.abbr_name}</div>
          <div className="text-[20px] leading-[22px]">Расписание занятий</div>
          </div>
      </div>
      <ToastContainer />
      <div className="flex flex-col items-end w-[400px]">
        <div className="flex">
          <Input
            isClearable
            onValueChange={(value) => { setSearchText(value) }}
            classNames={{
              base: "w-full mb-[10px] sm:max-w-full mr-[10px]",
              inputWrapper: "border-1",
            }}
            value={searchText}
            placeholder="Поиск расписания"
            size="lg"
            startContent={<SearchIcon className="text-default-300" />}
            variant="flat"
          />
          <Button isDisabled={searchText.length == 0} size="lg" className="w-[30px]" type="button" onPress={handleClickSearch}>
            <SearchIcon />
          </Button >
        </div>
        <Tabs radius="lg" aria-label="Тип поиска" onSelectionChange={(key) => { setTypeSearch(key) }}>
          <Tab key="group" title="по группе" />
          <Tab key="teacher" title="по преподавателю" />
        </Tabs>
      </div>

    </div>
  );
}

export default Header;