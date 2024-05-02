import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Фамилия", uid: "lastname", sortable: true},
  {name: "Имя", uid: "firstname", sortable: true},
  {name: "Отчество", uid: "surname", sortable: true},
  {name: "Должность", uid: "position", sortable: true},
  {name: "Профиль", uid: "teaching_profile", sortable: true},
  {name: "Действия", uid: "actions"}
];

const statusOptions = [
  {name: "Работает", uid: "active"},
  {name: "В отпуске", uid: "paused"},
  {name: "Уволен", uid: "vacation"},
];

const teachers = [
  {
    "id": 2,
    "lastname": "Иванов",
    "firstname": "Иванов",
    "surname": "Иванов",
    "position": "Иванов",
    "teaching_profile": "Иванов"
},
{
    "id": 3,
    "lastname": "Петров",
    "firstname": "Петр",
    "surname": "Петр",
    "position": "Петр",
    "teaching_profile": "ИвПетранов"
},
{
    "id": 5,
    "lastname": "string2345",
    "firstname": "string",
    "surname": "string",
    "position": "string",
    "teaching_profile": "string"
},
{
    "id": 6,
    "lastname": "vcvc",
    "firstname": "xcvxvc",
    "surname": "xvccv",
    "position": "xcvxcv",
    "teaching_profile": "xvcv"
},
{
    "id": 14,
    "lastname": "Иванов",
    "firstname": "Иванов",
    "surname": "Иванов",
    "position": "Иванов",
    "teaching_profile": "string"
},
{
    "id": 15,
    "lastname": "Иванов",
    "firstname": "Иванов",
    "surname": "Иванов",
    "position": "Иванов",
    "teaching_profile": "string"
},
{
    "id": 16,
    "lastname": "Иванов",
    "firstname": "Иванов",
    "surname": "Иванов",
    "position": "Иванов",
    "teaching_profile": "string"
},
{
    "id": 17,
    "lastname": "Иванов",
    "firstname": "Иванов",
    "surname": "Иванов",
    "position": "Иванов",
    "teaching_profile": "string"
},
{
    "id": 34,
    "lastname": "",
    "firstname": "",
    "surname": null,
    "position": "",
    "teaching_profile": ""
},
{
    "id": 35,
    "lastname": "",
    "firstname": "",
    "surname": null,
    "position": "",
    "teaching_profile": ""
},
{
    "id": 36,
    "lastname": "sxcxcxcx",
    "firstname": "xccxc",
    "surname": "",
    "position": "xcxcsxc",
    "teaching_profile": "xcxxcxx"
},
{
    "id": 37,
    "lastname": "",
    "firstname": "",
    "surname": "",
    "position": "",
    "teaching_profile": ""
}
];

export {columns, teachers, statusOptions};
