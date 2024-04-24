import React from "react";

import {Link} from "@nextui-org/react";

import {AvatarIcon} from '../../../assets/icons/AvatarIcon.jsx'
import {ScheduleIcon} from '../../../assets/icons/ScheduleIcon.jsx'
import {GroupIcon} from '../../../assets/icons/GroupIcon.jsx'
import {FlowIcon} from '../../../assets/icons/FlowIcon.jsx'
import {TeacherIcon} from '../../../assets/icons/TeacherIcon.jsx'
import {DisciplineIcon} from '../../../assets/icons/DisciplineIcon.jsx'
import {DirectionIcon} from '../../../assets/icons/DirectionIcon.jsx'
import {UserIcon} from '../../../assets/icons/UserIcon.jsx'
import {OrganizationIcon} from '../../../assets/icons/OrganizationIcon.jsx'
import {LogoutIcon} from '../../../assets/icons/LogoutIcon.jsx'
import './sidebar.css';

function Sidebar(){

    const path = window.location.pathname;
    const segments = path.split('/');
    const currentURL = '/' + segments[1] + '/';

  let Links = [
    {
      name: 'Расписание', 
      icon: ScheduleIcon, 
      href: "/schedules/" 
    },
    {
      name: 'Группы', 
      icon: GroupIcon, 
      href: "/groups/" 
    },
    {
      name: 'Потоки', 
      icon: FlowIcon, 
      href: "/flows/" 
    },
    {
      name: 'Преподаватели', 
      icon: TeacherIcon, 
      href: "/teachers/" 
    },
    {
      name: 'Дисциплины', 
      icon: DisciplineIcon, 
      href: "/disciplines/" 
    },
    {
      name: 'Направления подготовки', 
      icon: DirectionIcon, 
      href: "/directions/" 
    },
    {
      name: 'Пользователи', 
      icon: UserIcon, 
      href: "/users/" 
    },
    {
      name: 'Информация об организации', 
      icon: OrganizationIcon, 
      href: "/organization/" 
    },
  ];

  return (
    <div className="sidebar flex flex-col flex-wrap justify-between flex-wrap items-baseline overflow-hidden relative group fixed z-[20] top-0 left-0 right-0 h-dvh w-[80px] px-[15px] py-[50px] bg-neutral-200 rounded-r-[20px] hover:w-[420px] hover:shadow-lg hover:shadow-lg:shadow-stone-700 transition-all duration-30">
        <div className="header float-left inline-flex justify-center items-center">
          <div className="logo float-left w-[50px] h-[50px] rounded-full bg-neutral-300 flex justify-center items-center" >
            <AvatarIcon width="25px" height="25px" className="text-stone-500"/>
          </div>
          <div className="user ml-[15px] whitespace-nowrap overflow-hiddden float-left text-small">
            <div className="font-medium text-[20px]">Иванов Иван Иванович</div>
            <div className="text-[16px] text-stone-500 ">Администратор</div>
          </div>
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
          <Link className="items-center mx-[12px] font-sm text-black" href="/logout/" underline="none">
                <LogoutIcon/>
                <span className="ml-[28px] text-[20px] whitespace-nowrap">Выход из системы</span>
          </Link>
        </div>
      </div>  
  );
}

export default Sidebar;