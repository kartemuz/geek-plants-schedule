import React from "react";

import {Link} from "@nextui-org/react";

import AvatarIcon from '../../assets/icons/Avatar.svg'
import ScheduleIcon from '../../assets/icons/Schedule.svg'
import GroupIcon from '../../assets/icons/Group.svg'
import FlowIcon from '../../assets/icons/Flow.svg'
import TeacherIcon from '../../assets/icons/Teacher.svg'
import DisciplineIcon from '../../assets/icons/Discipline.svg'
import DirectionIcon from '../../assets/icons/Direction.svg'
import UserIcon from '../../assets/icons/User.svg'
import OrganizationIcon from '../../assets/icons/Organization.svg'
import LogoutIcon from '../../assets/icons/Logout.svg'

function Sidebar(){

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
    <div className="sidebar flex flex-col flex-wrap justify-between flex-wrap items-baseline overflow-hidden relative group fixed z-10 top-0 left-0 right-0 h-full w-[80px] px-[15px] py-[50px] bg-stone-300 rounded-r-[20px] hover:w-[390px] transition-width duration-30">
        <div className="header float-left inline-flex justify-center items-center">
          <div className="logo float-left w-[50px] h-[50px] rounded-full bg-stone-400 flex justify-center items-center" >
            <img className="w-[25px]" src={AvatarIcon} alt="" />
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
              <Link className="items-center mx-[12px] font-sm text-stone-600" href={link.href} underline="none">
                <img className="w-[25px]" src={link.icon} alt="" />
                <span className="ml-[28px] text-[20px] whitespace-nowrap">{link.name}</span>
              </Link>
            </li>
            )}
          </ul>
        </div>
        <div className="footer_btn">
          <Link className="items-center mx-[12px] font-sm text-stone-600" href="/logout/" underline="none">
                <img className="w-[25px]" src={LogoutIcon} alt="" />
                <span className="ml-[28px] text-[20px] whitespace-nowrap">Выход из системы</span>
              </Link>
        </div>
      </div>  
  );
}

export default Sidebar;