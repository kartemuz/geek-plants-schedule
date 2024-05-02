import { React, useEffect, useState, memo } from "react";
import { apiServer } from "../components/backend/Config"
import axios from "axios";
import { Button, spacer } from "@nextui-org/react";
import { useContext } from "react";
import Context from "../layouts/Context";
import { Link, Tabs, Tab } from "@nextui-org/react";
import { HouseIcon } from "../assets/icons/HouseIcon";
import { ArrowIcon } from "../assets/icons/Arrow";
import 'react-toastify/dist/ReactToastify.css';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, eachDayOfInterval, parse } from 'date-fns';
import { CalendarIcon } from "../assets/icons/CalendarIcon";
import { AddressIcon } from "../assets/icons/AddressIcon";
import { AvatarIcon } from "../assets/icons/AvatarIcon";
import { GroupIcon } from "../assets/icons/GroupIcon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ScheduleList({ teacherAttr, teacherFIO, groupAttr, direction_name }) {

    const Value = useContext(Context);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState(format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd'));
    const [daysWeek, setDaysWeek] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [typeSchedule, setTypeSchedule] = useState('week');

    const handleNextWeek = () => {
        setCurrentDate(prevDate => addWeeks(prevDate, 1));
    };

    const handlePrevWeek = () => {
        setCurrentDate(prevDate => subWeeks(prevDate, 1));
    };

    useEffect(() => {
        try {
            const start = startOfWeek(currentDate, { weekStartsOn: 1 });
            const end = endOfWeek(currentDate, { weekStartsOn: 1 });
            const days = eachDayOfInterval({ start, end });
            setDaysWeek(days);
            setStartDate(format(start, 'yyyy-MM-dd'));
            setEndDate(format(end, 'yyyy-MM-dd'));
        } catch (e) {
            console.log("error useEffect");
        }
    }, [currentDate]);

    function DateString(dateString) {
        const options = { day: 'numeric', month: 'short', weekday: 'short', weekday: 'short' };
        try {
            const date = new Date(dateString);
            const res = date.toLocaleDateString('ru-RU', options).split(' ');
            res[0] = res[0].substring(0, 2);
            return res;
        } catch (e) {
            console.log("error DateString");
        }
    }

    function toStandartDate(date) {
        try {
            const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
            return format(parsedDate, 'dd.MM.yyyy', { awareOfUnicodeTokens: true });
        } catch (e) {
            console.log("error toStandartDate");
        }
    }

    function getMonth(dateString) {
        try {
            const date = parse(dateString, 'yyyy-MM-dd', new Date());
            const month = date.getMonth();
            const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            ];

            return months[month];
        } catch (e) {
            console.log("error");
        }
    }

    function timeToMinute(time) {

        return time.substring(0, 5);
    }

    useEffect(() => {
        let apiRequest = '';
        if(teacherAttr != null){
            apiRequest = `${apiServer}/schedule/get/?teacher_id=` + teacherAttr + "&start_of_week=" + startDate;
        }else{
            apiRequest = `${apiServer}/schedule/get/?group_id=` + groupAttr + "&start_of_week=" + startDate;
        }

        axios.get(apiRequest)
            .then(response => {
                setSchedule(response.data);
            })
            .catch(error => {
                toast.warning("Не удалось загрузить расписание");
            });
    }, [startDate]);

    const hasSchedule = daysWeek.some(dayWeek => (
        schedule.filter(item => item.date === format(dayWeek, 'yyyy-MM-dd')).length > 0
    ));

    return (

        <div>
            <ToastContainer />
            <div>
                <div className="w-full bg-zinc-200 rounded-2xl px-[15px] py-[10px] mb-[5px] mt-[15px] flex items-center">
                    <Link href="/" className="mr-[10px]">
                        <HouseIcon height="24" />
                        </Link>
                        <ArrowIcon height="18" className="mr-[10px]" />
                        {groupAttr != null && (
                            <div className="flex items-center">
                        <span>{direction_name}</span>
                        <ArrowIcon height="18" className="m-[10px]" />
                        <span>Группа №{groupAttr}</span>
                        </div>
                        ) || (
                            <span>
                        <span>{teacherFIO}</span>
                        </span>
                        )}
                </div>
                <div className="flex items-center justify-between mt-[15px] flex-row-reverse">
                    <div className="blockType flex items-center justify-center">

                        {/* {typeSchedule == 'day' && (
                            <Button color="without" isIconOnly className="mr-[10px]">
                                <CalendarIcon />
                            </Button>
                        )} */}
                        <Tabs size="lg" radius="lg" aria-label="Тип расписания" onSelectionChange={(key) => { setTypeSchedule(key) }}>
                            <Tab key="week" title="Неделя" />
                            <Tab key="day" title="День" />
                        </Tabs>
                    </div>

                </div>

            </div>

            {typeSchedule === "week" && (
                <div>

                    <div className="flex justify-center items-center mt-[-45px] mb-[15px]">
                        <Button isIconOnly radius="full" color="black" onClick={handlePrevWeek}><ArrowIcon style={{ transform: "rotate(180deg)" }} /></Button>
                        <span className="bg-zinc-200 py-[10px] px-[15px] rounded-full">{toStandartDate(startDate)} — {toStandartDate(endDate)}</span>
                        <Button isIconOnly color="black" radius="full" onClick={handleNextWeek}><ArrowIcon /></Button>
                    </div>
                    <div className="flex items-center w-full">

                        {hasSchedule && (
                            <div className="mb-[15px] w-full">

                                {daysWeek.map((dayWeek) => (
                                    <div key={dayWeek} className="flex leading-[20px] mb-[15px] text-[18px] w-full " >
                                        {schedule.filter((item) => item.date === format(dayWeek, 'yyyy-MM-dd')).length > 0 ? (
                                            <>
                                                <div className="dateBlock w-[100px] pt-[5px]">
                                                    <div className="text-[22px]">
                                                        <span className="font-bold text-[22px]">{DateString(dayWeek)[1] + " "}</span>
                                                        <span className="font-semibold text-[18px]">{DateString(dayWeek)[2]}</span>
                                                    </div>
                                                    <div className="text-zinc-600">{DateString(dayWeek)[0].substring(0, 2)}</div>
                                                </div>
                                                <div className="w-full">
                                                    {schedule.filter((item) => item.date === format(dayWeek, 'yyyy-MM-dd')).length > 0 ? (

                                                        schedule.filter((item) => item.date === format(dayWeek, 'yyyy-MM-dd')).map((item) => (
                                                            <div key={item.id} className="w-full">
                                                                <div className="flex bg-zinc-200 mb-[10px] rounded-2xl w-full p-[15px]">
                                                                    <div className="time leading-[28px] pr-[30px]">
                                                                        {timeToMinute(item.time_start)} — {timeToMinute(item.time_end)}
                                                                    </div>
                                                                    <div className="main_block leading-[28px] flex flex-col text-[16px]">
                                                                        <div className="discipline text-[18px] font-semibold ">{item.discipline.name}</div>
                                                                        <div className="type text-zinc-600 text-[18px] py-[5px]">{item.type}</div>
                                                                        <div className="type text-zinc-600 flex items-center">
                                                                            <GroupIcon width="18px" className="mr-[5px]" />
                                                                            Группа №{item.group_id}
                                                                        </div>
                                                                        <div className="teacher text-zinc-600 flex items-center ">
                                                                            <AvatarIcon width="18px" className="mr-[5px]" />

                                                                            {item.change != null && (
                                                                                <div>
                                                                                    <span>{item.change.changed_teacher.lastname + " " + item.change.changed_teacher.firstname.substring(0, 1) + "." + item.change.changed_teacher.surname.substring(0, 1) + "."}</span> (<s>{item.teacher.lastname + " " + item.teacher.firstname.substring(0, 1) + "." + item.teacher.surname.substring(0, 1) + "."}</s>)
                                                                                </div>
                                                                            ) || (
                                                                                    <span>
                                                                                        {item.teacher.lastname + " " + item.teacher.firstname.substring(0, 1) + "." + item.teacher.surname.substring(0, 1) + "."}
                                                                                    </span>
                                                                                )


                                                                            }

                                                                        </div>
                                                                        <div className="room text-zinc-600 flex items-center ">
                                                                            <AddressIcon width="18px" className="mr-[5px]" />
                                                                            Каб. {item.room}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </>

                                        ) : (
                                            <span></span>
                                        )}
                                    </div>

                                ))
                                }
                            </div>
                        ) || (
                            <div className="w-full text-center">Занятий на этой неделе нет</div>
                            )}

                    </div>
                </div>
            )}



            {typeSchedule == "day" && (
                <div>

                    <div className="flex justify-between items-center mt-[-40px]">
                        <div className="text-[20px] font-bold ">
                            {getMonth(startDate)}

                        </div>
                        <div className="flex gap-[10px] leading-none items-center">
                            <Button className="py-[10px]" isIconOnly radius="xl" color="black" onClick={handlePrevWeek}><ArrowIcon style={{ transform: "rotate(180deg)" }} /></Button>
                            {daysWeek.map((day) => (
                                <Button key={day.toLocaleDateString()} onClick={() => setCurrentDate(day)} className={`${currentDate.toLocaleDateString() === day.toLocaleDateString() ? "font-semibold bg-zinc-500 text-white" : ""}`} isIconOnly>
                                    <div className="flex flex-col leading-[14px]">
                                        <div>{DateString(day)[1]}</div>
                                        <div className="text-[12px]">{DateString(day)[0]}</div>
                                    </div>
                                </Button>
                            ))}
                            <Button isIconOnly color="black" radius="xl" onClick={handleNextWeek}><ArrowIcon /></Button>

                        </div>
                        <div className=""></div>
                    </div>
                    <div className="flex items-center">
                        {hasSchedule && (
                            <div className="mt-[15px] w-full">

                                {schedule.filter((item) => item.date === format(currentDate, 'yyyy-MM-dd')).length > 0 ? (

                                    schedule.filter((item) => item.date === format(currentDate, 'yyyy-MM-dd')).map((item, key) => (

                                        <div key={key} className="blockItem w-full mb-[20px]">
                                            <div className="headerItem flex items-center mb-[10px]">
                                                <div className="flex items-center justify-center w-[20px] h-[20px] p-[20px] bg-zinc-200 rounded-xl mr-[15px]">
                                                    {(key + 1)}
                                                </div>
                                                <div>
                                                    {timeToMinute(item.time_start)} — {timeToMinute(item.time_end)}
                                                </div>
                                            </div>
                                            <div className="main_block w-full bg-zinc-200 rounded-2xl leading-[28px] flex flex-col py-[15px] px-[25px] text-[16px]">
                                                <div className="discipline text-[18px] font-semibold ">{item.discipline.name}</div>
                                                <div className="type text-zinc-600 text-[18px] py-[5px]">{item.type}</div>
                                                <div className="type text-zinc-600 flex items-center">
                                                    <GroupIcon width="18px" className="mr-[5px]" />
                                                    Группа №{item.group_id}
                                                </div>
                                                <div className="teacher text-zinc-600 flex items-center ">
                                                    <AvatarIcon width="18px" className="mr-[5px]" />

                                                    {item.change != null && (
                                                        <div>
                                                            <span>{item.change.changed_teacher.lastname + " " + item.change.changed_teacher.firstname.substring(0, 1) + "." + item.change.changed_teacher.surname.substring(0, 1) + "."}</span> (<s>{item.teacher.lastname + " " + item.teacher.firstname.substring(0, 1) + "." + item.teacher.surname.substring(0, 1) + "."}</s>)
                                                        </div>
                                                    ) || (
                                                            <span>
                                                                {item.teacher.lastname + " " + item.teacher.firstname.substring(0, 1) + "." + item.teacher.surname.substring(0, 1) + "."}
                                                            </span>
                                                        )


                                                    }

                                                </div>
                                                <div className="room text-zinc-600 flex items-center ">
                                                    <AddressIcon width="18px" className="mr-[5px]" />
                                                    Кабинет {item.room}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full text-center">Занятий нет</div>
                                )}
                            </div>
                        )|| (
                            <div className="w-full text-center mt-[10px]">Занятий нет</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ScheduleList;