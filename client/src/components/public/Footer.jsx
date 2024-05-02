import { React, useState, useEffect } from "react";
import { TelegramIcon } from "../../assets/icons/TelegramIcon.jsx";
import { VKIcon } from "../../assets/icons/VKIcon.jsx";
import axios from 'axios';
import { apiServer } from "../backend/Config.jsx";
import { format, getYear } from 'date-fns';

function Footer() {

    const [dataOrg, setDataOrg] = useState([]);

    useEffect(() => {
        axios.get(`${apiServer}/org/get/`)
            .then(response => {
                setDataOrg(response.data);
            })
            .catch(error => {
                toast.warning("Не удалось загрузить информацию об организации");
            });
    }, []);

    return (
        <div className="z-index-1000 w-full h-[130px] py-[30px] rounded-t-3xl bg-zinc-100">
            <div className="container m-auto flex justify-between">
                <div className="">
                    <div>Адрес {dataOrg.address}</div>
                    <div>Телефон {dataOrg.phone}</div>
                    <div>Email {dataOrg.email}</div>
                </div>
                <div className="">
                    <div className="mb-[5px]">Социальные сети</div>
                    <div className="social_links flex gap-[5px]">
                        {dataOrg.telegram != "" && (
                            <a href={dataOrg.telegram}>
                                <TelegramIcon />
                            </a>
                        )}

                        {dataOrg.vk != "" && (
                            <a href={dataOrg.vk}>
                                <VKIcon />
                            </a>
                        )}

                    </div>
                </div>
            </div>
            <div className="full_nameOrg text-center">
            {"©" + dataOrg.full_name + ", " + getYear(new Date())}
            </div>
        </div>
    );
}

export default Footer;