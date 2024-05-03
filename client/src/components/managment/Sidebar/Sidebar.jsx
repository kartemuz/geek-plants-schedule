import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { apiServer } from '../../backend/Config.jsx';
import {
  Input,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useNavbar
} from "@nextui-org/react";
import { useToast } from '../../../pages/context/ToastContext.jsx';
import {Link} from "@nextui-org/react";
import {AvatarIcon} from '../../../assets/icons/AvatarIcon.jsx'
import {ScheduleIcon} from '../../../assets/icons/ScheduleIcon.jsx'
import {GroupIcon} from '../../../assets/icons/GroupIcon.jsx'
import {FlowIcon} from '../../../assets/icons/FlowIcon.jsx'
import {TeacherIcon} from '../../../assets/icons/TeacherIcon.jsx'
import {DisciplineIcon} from '../../../assets/icons/DisciplineIcon.jsx'
import {DirectionIcon} from '../../../assets/icons/DirectionIcon.jsx'
import {UserIcon} from '../../../assets/icons/UserIcon.jsx'
import {HouseIcon} from '../../../assets/icons/HouseIcon.jsx'
import {LogoutIcon} from '../../../assets/icons/LogoutIcon.jsx'
import './sidebar.css';
import { isAuthenticated } from '../../auth.jsx';
import { useNavigate } from 'react-router-dom';

function Sidebar(){

  console.log("OK")

  const toast = useToast();

    const path = window.location.pathname;
    const segments = path.split('/');
    const currentURL = '/' + segments[1] + '/' + segments[2] + '/';

  let Links = [
    {
      name: 'Расписание', 
      icon: ScheduleIcon, 
      href: "/admin/schedules/",
      code_opportunity: "schedules"
    },
    {
      name: 'Группы', 
      icon: GroupIcon, 
      href: "/admin/groups/",
      code_opportunity: "groups"
    },
    {
      name: 'Потоки', 
      icon: FlowIcon, 
      href: "/admin/flows/",
      code_opportunity: "flows"
    },
    {
      name: 'Преподаватели', 
      icon: TeacherIcon, 
      href: "/admin/teachers/",
      code_opportunity: "teachers"
    },
    {
      name: 'Замены', 
      icon: TeacherIcon, 
      href: "/admin/changes/",
      code_opportunity: "changes"
    },
    {
      name: 'Дисциплины', 
      icon: DisciplineIcon, 
      href: "/admin/disciplines/",
      code_opportunity: "disciplines"
    },
    {
      name: 'Направления подготовки', 
      icon: DirectionIcon, 
      href: "/admin/directions/",
      code_opportunity: "directions" 
    },
    {
      name: 'Пользователи', 
      icon: UserIcon, 
      href: "/admin/users/",
      code_opportunity: "users" 
    },
    {
      name: 'Информация об организации', 
      icon: HouseIcon, 
      href: "/admin/organization/",
      code_opportunity: "organization" 
    },
  ];

  const [userData, setUserData] = useState({});

 

useEffect(() => {
  if(localStorage.getItem('jwtToken') != null){
    const token = localStorage.getItem('jwtToken');
    axios.post(`${apiServer}/users/get`, null, {
  headers: {
    'auth-token': token
  }
  })
.then(response => {
  toast.success(response.data);
  setUserData(response.data);
})
.catch(error => {
  // Обработка ошибки
});
  }
},[]);

const navigate = useNavigate();

function handleLogOut() {
  axios.post(`${apiServer}/users/delete/`, null, {
    headers: {
      'auth-token': localStorage.getItem('jwtToken')
    }
  })
  .then(response => {
    localStorage.removeItem('jwtToken');
    navigate('/admin/login'); // Перенаправляем пользователя на страницу входа
  })
  .catch(error => {
    // Обработка ошибки
  });
}


  return (
    <div className="sidebar flex flex-col flex-wrap justify-between flex-wrap items-baseline overflow-hidden relative group fixed z-[20] top-0 left-0 right-0 h-dvh w-[80px] px-[15px] py-[50px] bg-zinc-200 rounded-r-[20px] hover:w-[420px] hover:shadow-lg hover:shadow-lg:shadow-stone-700 transition-all duration-30">
        <div className="header float-left inline-flex justify-center items-center">
          <div className="logo float-left w-[50px] h-[50px] rounded-full bg-neutral-300 flex justify-center items-center" >
            <AvatarIcon width="25px" height="25px" className="text-stone-500"/>
          </div>
          <Link href="/admin/profile/">
          <div className="user ml-[15px] whitespace-nowrap overflow-hiddden float-left text-small">
            <div className="font-medium text-[20px] text-black">{userData !== undefined && userData.lastname + " " + userData.firstname + " " + userData.surname }</div>
            <div className="text-[16px] text-stone-500 ">{userData !== undefined && userData.user_role !== undefined && userData.user_role.title }
</div>
          </div>
          </Link>
        </div>
        <div className="menu">
          <ul className="flex flex-col">

            {
              Links.map((link) => 

              

              // Делайте подобное только в случае, если у элементов нет постоянных идентификаторов
              <li key={link.href} className="my-[10px]">
              <Link className={`items-center mx-[12px] font-sm ${currentURL == link.href ? 'text-rose-600' : 'text-black'}`} href={link.href} underline="none">
                <link.icon />
                <span className="ml-[28px] text-[20px] whitespace-nowrap">{link.name}</span>
              </Link>
            </li>
            )}
          </ul>
        </div>
        <div className="footer_btn">
          <Link onClick={()=> {handleLogOut()}} className="items-center mx-[12px] font-sm text-black" href="#" underline="none">
                <LogoutIcon/>
                <span className="ml-[28px] text-[20px] whitespace-nowrap">Выход из системы</span>
          </Link>
        </div>
      </div>  
  );
}

export default Sidebar;