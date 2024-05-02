import {React, useEffect, useState} from "react";
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
import {columns, statusOptions} from "./data";
import {capitalize} from "./utils";
import AddTeacherForm from '../modalForms/AddTeacherForm'
import EditTeacherForm from '../modalForms/EditTeacherForm'
import DeleteTeacherForm from '../modalForms/DeleteTeacherForm'
import {ExportWordIcon} from "../assets/icons/ExportWordIcon";
import { useToast } from "../pages/context/ToastContext"
import { apiServer } from "../components/backend/Config";


const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

function TeachersPage(){

  document.title = 'Преподаватели';
  const [teachers, setTeachers] = useState([]);
  const toast = useToast();
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [action, setAction] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [idTeacher, setIdTeacher] = useState(0);


   useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${apiServer}/teachers/get`);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);



    function handleOpenModal(act){
      setAction(act);
      onOpen();
    };
  
    // const handleCloseModal = () => {
    //   onClose();
    // };
  
    function getForm() {
      switch (action) {
        case 'add':
          return <AddTeacherForm />;
        case 'edit':
          return <EditTeacherForm id={idTeacher}/>;
        case 'delete':
          return <DeleteTeacherForm id={idTeacher}/>;
        default:
          return null;
      }
    };


  

  const handleClick = () => {
    toast.error('Ваше сообщение об ошибке');
  };



    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState("all");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(teachers.length);
    const [sortDescriptor, setSortDescriptor] = React.useState({
      column: "age",
      direction: "ascending",
    });


    const [showSpan, setShowSpan] = React.useState(false);

    const handleChange = React.useMemo(() => (newSelectedKeys) => {
      setSelectedKeys(newSelectedKeys);
      setShowSpan(newSelectedKeys.size > 0);
    }, [selectedKeys]);

    const [page, setPage] = React.useState(1);
  
    const pages = Math.ceil(teachers.length / rowsPerPage);
  
    const hasSearchFilter = Boolean(filterValue);
  
    const headerColumns = React.useMemo(() => {
      if (visibleColumns === "all") return columns;
  
      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);
  
    const filteredItems = React.useMemo(() => {
      let filteredTeachers = [...teachers];
  
      if (hasSearchFilter) {
        filteredTeachers = filteredTeachers.filter((user) =>
          user.lastname.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredTeachers = filteredTeachers.filter((user) =>
          Array.from(statusFilter).includes(user.status),
        );
      }
  
      return filteredTeachers;
    }, [teachers, filterValue, statusFilter]);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
  
    const sortedItems = React.useMemo(() => {
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);
  
    const renderCell = React.useCallback((user, columnKey) => {

      const cellValue = user[columnKey];
  
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{radius: "full", size: "sm", src: user.avatar}}
              classNames={{
                description: "text-default-500",
              }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
            </div>
          );
        case "status":
        
          return (

            <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {
              statusOptions.map((status) => {
        // Внутреннее условие
        if (status.uid == user[columnKey]) {
          return (
           capitalize(status.name)
          );
        }  
      })
        }
          </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => { setIdTeacher(user.id); handleOpenModal('edit');}}>Изменить</DropdownItem>
                  <DropdownItem onClick={() => { setIdTeacher(user.id); handleOpenModal('delete');}}>Удалить</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
      
    }, []);
  
    const onRowsPerPageChange = React.useCallback((e) => {
      setRowsPerPage(Number(e.target.value));
      toast(e.target.value);
      setPage(1);
    }, []);

  
  
  
    const onSearchChange = React.useCallback((value) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    }, []);
  
    const topContent = React.useMemo(() => {
      return (
        <div className="flex flex-col gap-5">
          
          <div className="flex justify-between gap-3 items-end">
          <button onClick={handleClick}>Показать уведомление об ошибке</button>

            <Input
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="Поиск по ФИО преподавателя"
              size="lg"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="flat"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    size="lg"
                    variant="flat"
                  >
                    Колонки
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button
                className="text-background"
                color="primary"
                startContent={<PlusIcon />}
                size="lg"
                onPress={() => handleOpenModal('add')}
              >
                Добавить преподавателя
              </Button>
              <Button
                className="bg-foreground text-background"
                startContent={<ImportIcon />}
                size="lg"
              >
                Импорт данных
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center text-default-400 text-small">
              Отображать записей на странице:
              <Select onChange={onRowsPerPageChange} className="ml-[5px] w-[80px]" selectedKeys={"11"} aria-label="Выберите количество строк на странице">
                <SelectItem key={"11"} value={11}>
                11
                </SelectItem>
                <SelectItem key={"5"} value={5}>
                  5
                </SelectItem>
                <SelectItem key={"10"} value={10}>
                  10
                </SelectItem>
                <SelectItem key={"15"} value={15}>
                  15
                </SelectItem>
              </Select>

              {showSpan && <Button isIconOnly color="d" onPress={()=>{alert(selectedKeys === "all" ? "all" : selectedKeys ); console.log(selectedKeys)}}><ExportWordIcon /></Button>}

            </label>
          </div>
        </div>
      );

     
    }, [
      filterValue,
      statusFilter,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      teachers.length,
      hasSearchFilter,
    ]);

   
    const bottomContent = React.useMemo(() => {
      return (
        <div className="py-2 px-2 flex justify-between items-center">
          <span className="text-small text-default-400">
            {selectedKeys === "all"
              ? "Все записи выбраны"
              : `Выбрано преподавателей: ${selectedKeys.size} из ${items.length}`}
          </span>
          <span className="text-default-400 text-small">Всего преподавателей: {teachers.length}</span>
          <Pagination
            showControls
            classNames={{
              cursor: "bg-foreground text-background",
            }}
            color="default"
            isDisabled={hasSearchFilter}
            page={page}
            total={pages}
            variant="light"
            onChange={setPage}
          />
        </div>
      );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
  
    const classNames = React.useMemo(
      () => ({
        wrapper: ["max-h-[382px]", "max-w-3xl"],
        th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
        td: [
          // changing the rows border radius
          // first
          "group-data-[first=true]:first:before:rounded-none",
          "group-data-[first=true]:last:before:rounded-none",
          // middle
          "group-data-[middle=true]:before:rounded-none",
          // last
          "group-data-[last=true]:first:before:rounded-none",
          "group-data-[last=true]:last:before:rounded-none",
        ],
      }),
      [],
    );

    {showSpan && <p>Выбрано: {selectedKeys.size} строк</p>}

    return (
      <>
      <div className="px-[20px] text-[32px] font-bold tableName">Преподаватели</div>
      <div className="p-[20px] rounded-[20px] bg-stone-100">
      {/* <ToastContainer/> */}
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={handleChange}
        onSortChange={setSortDescriptor}
      
      >
        
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
        emptyContent={"Преподавателей не найдено"} 
        items={sortedItems}
        isLoading={isLoading}
        loadingContent={<Spinner label="Загрузка..." />}>
          {
          (item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              
            </TableRow>
          )
        }
        </TableBody>
      </Table>    
      </div>

      
      {showSpan && <Button isIconOnly color="d" onPress={()=>{alert(selectedKeys === "all" ? "all" : selectedKeys ); console.log(selectedKeys)}}><ExportWordIcon /></Button>}

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

export default TeachersPage;