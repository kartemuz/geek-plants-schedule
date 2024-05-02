import React, {useState} from "react";
import Favicon from "react-favicon";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import Context from "./Context";
import ProgramsList from "./ProgramsList";

document.title = 'Расписание СПБ ГБУ УМЦ';

export default function UserLayout() {

  const [contentPage, setContentPage] = useState(<ProgramsList/>);
  const loadContentPage = (content) => {setContentPage(content)};

  const value={
    contentPage,loadContentPage
  }

  return (
    <Context.Provider value={value}>
      <div className="h-dvh">
        <Favicon url="../../public/favicon.ico"></Favicon>
        <div className="container m-auto  h-[calc(100dvh_-130px)] overflow-auto">
          <Header />
          <div className="content px-[15px]">
            {contentPage}
          </div>
        </div>
        <Footer />
      </div>
    </Context.Provider>
  );
}