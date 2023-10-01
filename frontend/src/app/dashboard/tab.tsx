"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  PlusIcon,
  ArrowPathIcon,
  TrashIcon,
  ListBulletIcon,
  PencilIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
  NumberInput,
  TextInput,
  Button,
  SearchSelect,
  SearchSelectItem,
  List,
  ListItem,
  Icon,
  Card,
  Callout,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Table,
} from "@tremor/react";
import Skeleton from "../skeleton";

import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, editUser } from "@/redux/usersSlice";
import { AppDispatch, RootState } from "@/redux/store";

import * as Yup from "yup";

export default function UsersTab() {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const tabs = [
    { icon: ListBulletIcon, label: "Listar" },
    { icon: PlusIcon, label: "Criar" },
    { icon: ArrowPathIcon, label: "Atualizar" },
    { icon: TrashIcon, label: "Excluir" },
  ];

  const listActions = [
    { action: "edit", tab: 2, icon: PencilIcon, tooltip: "Editar usuário" },
    { action: "delete", tab: 3, icon: TrashIcon, tooltip: "Excluir usuário" },
  ];

  const [tab, setTab] = useState<number>(0);

  const [isHovered, setIsHovered] = useState(false);

  const [addName, setAddName] = useState<string>("");
  const [addAge, setAddAge] = useState<string>("");
  const [addEmail, setAddEmail] = useState<string>("");
  const [addformError, setAddFormError] = useState<Partial<FormError>>({});

  const [editName, setEditName] = useState<string>("");
  const [editAge, setEditAge] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editformError, setEditFormError] = useState<Partial<FormError>>({});
  const [selectedEditUserId, setSelectedEditUserId] = useState<
    number | undefined
  >(undefined);

  const [selectedDeleteUserId, setSelectedDeleteUserId] = useState<
    number | undefined
  >(undefined);

  const addOrEditUserSchema = Yup.object().shape({
    name: Yup.string()
      .required("Opa! Não esqueceu de digitar o nome, né?")
      .min(2, "tese"),
    email: Yup.string()
      .email("Hmm, esse email parece estar estranho, tenta outro")
      .required("O email é obrigatório, não dá para pular essa."),
    age: Yup.number()
      .positive("Ei, a idade precisa ser maior ou igual a 1.")
      .required("A idade é importante, não deixe em branco!")
      .integer("Ops, a idade deve ser um número inteiro, sem casas decimais!"),
  });

  const handleListAction = (action: string, selectedId: number) => {
    switch (action) {
      case "edit":
        setSelectedEditUserId(selectedId);
        setTab(2);
        break;
      case "delete":
        setSelectedDeleteUserId(selectedId);
        setTab(3);
        break;
    }
  };

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name: addName.trim(),
      age: parseInt(addAge, 10),
      email: addEmail.trim(),
    };

    try {
      await addOrEditUserSchema.validate(
        {
          name: addName.trim(),
          age: parseInt(addAge || "0", 10),
          email: addEmail.trim(),
        },
        { abortEarly: false }
      );
      setAddFormError({});

      await dispatch(addUser(userData));

      setAddName("");
      setAddAge("");
      setAddEmail("");
    } catch (error: any) {
      const errors: Errors = {};

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) errors[err.path] = err.message;
        });
      }

      setAddFormError(errors);
    }
  };

  const handleEditUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name: editName.trim(),
      age: parseInt(editAge, 10),
      email: editEmail.trim(),
    };

    try {
      await addOrEditUserSchema.validate(
        {
          name: editName.trim(),
          age: parseInt(editAge || "0", 10),
          email: editEmail.trim(),
        },
        { abortEarly: false }
      );
      setEditFormError({});

      await dispatch(editUser({ id: selectedEditUserId as number, userData }));
    } catch (error: any) {
      const errors: Errors = {};

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) errors[err.path] = err.message;
        });
      }

      setEditFormError(errors);
    }
  };

  const handleDeleteUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(deleteUser(selectedDeleteUserId as number));
    setSelectedDeleteUserId(undefined);
  };

  const selectedEditUser: User | undefined = users.users.find(
    (user) => user.id === selectedEditUserId
  );

  const selectedDeleteUser: User | undefined = users.users.find(
    (user) => user.id === selectedDeleteUserId
  );

  useEffect(() => {
    if (selectedEditUserId !== undefined && selectedEditUser) {
      setEditName(selectedEditUser.name);
      setEditAge(selectedEditUser.age.toString());
      setEditEmail(selectedEditUser.email);
    } else {
      setSelectedEditUserId(undefined);
      setEditName("");
      setEditAge("");
      setEditEmail("");
    }
  }, [selectedEditUserId, selectedEditUser]);

  return (
    <TabGroup index={tab}>
      <TabList>
        {tabs.map((tabInfo, index) => (
          <Tab key={index} icon={tabInfo.icon} onClick={() => setTab(index)}>
            {tabInfo.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="mt-10">
            <section className="bg-white dark:bg-gray-900">
              <div className="pb-8 px-4 mx-auto max-w-2xl lg:pb-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Listar usuários
                </h2>

                {users.loading ? (
                  <List>
                    <ListItem>
                      <Skeleton className="w-2/12" />
                      <span>
                        <Skeleton className="inline-flex w-6 h-4" />
                        <Skeleton className="inline-flex w-6 h-4 ms-2" />
                      </span>
                    </ListItem>
                    <ListItem>
                      <Skeleton className="w-3/12" />
                      <span>
                        <Skeleton className="inline-flex w-6 h-4" />
                        <Skeleton className="inline-flex w-6 h-4 ms-2" />
                      </span>
                    </ListItem>
                    <ListItem>
                      <Skeleton className="w-1/12" />
                      <span>
                        <Skeleton className="inline-flex w-6 h-4" />
                        <Skeleton className="inline-flex w-6 h-4 ms-2" />
                      </span>
                    </ListItem>
                  </List>
                ) : users.users.length ? (
                  <List>
                    {users.users.map((user) => (
                      <ListItem key={user.id}>
                        <span>{user.name}</span>

                        <span>
                          {listActions.map((action) => (
                            <Icon
                              key={action.action}
                              variant={"shadow"}
                              size="xs"
                              icon={action.icon}
                              tooltip={action.tooltip}
                              className={`ms-2 cursor-pointer`}
                              onClick={() =>
                                handleListAction(action.action, user.id)
                              }
                            />
                          ))}
                        </span>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Card className="text-center dark:text-white  pb-10">
                    {isHovered ? (
                      <Icon
                        size="xl"
                        icon={FaceSmileIcon}
                        tooltip="Está na hora de fazer o seu!"
                        className="cursor-pointer"
                        onClick={() => setTab(1)}
                        onMouseLeave={() => setIsHovered(!isHovered)}
                      />
                    ) : (
                      <Icon
                        size="xl"
                        icon={FaceFrownIcon}
                        onMouseEnter={() => setIsHovered(!isHovered)}
                      />
                    )}
                    <p>Nenhum usuário encontrado</p>
                  </Card>
                )}
              </div>
            </section>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="mt-10">
            <section className="bg-white dark:bg-gray-900">
              <div className="pb-8 px-4 mx-auto max-w-2xl lg:pb-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Adicionar usuário
                </h2>
                <form onSubmit={handleAddUser}>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="w-full">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nome
                      </label>
                      <TextInput
                        placeholder="Natã Santos"
                        className="p-1"
                        value={addName}
                        onChange={(e) => setAddName(e.target.value)}
                        error={Boolean(addformError.name)}
                        errorMessage={addformError.name}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="age"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Idade
                      </label>
                      <NumberInput
                        placeholder="24"
                        className="p-1"
                        value={addAge}
                        onChange={(e) => setAddAge(e.target.value)}
                        error={Boolean(addformError.age)}
                        errorMessage={addformError.age}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        E-mail
                      </label>
                      <TextInput
                        placeholder="email@exemplo.com"
                        className="p-1"
                        value={addEmail}
                        onChange={(e) => setAddEmail(e.target.value)}
                        error={Boolean(addformError.email)}
                        errorMessage={addformError.email}
                      />
                    </div>
                  </div>

                  <Button
                    loading={users.loading}
                    className="mt-4 !text-white dark:!bg-blue-700 dark:!border-blue-700 dark:hover:!bg-blue-800 dark:hover:!border-blue-800"
                    size="md"
                  >
                    Adicionar
                  </Button>
                </form>
              </div>
            </section>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="mt-10">
            <div className="mt-10">
              <section className="bg-white dark:bg-gray-900">
                <div className="pb-8 px-4 mx-auto max-w-2xl lg:pb-16">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Editar usuário
                  </h2>
                  <form onSubmit={handleEditUser}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="id"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Usuário
                        </label>

                        <SearchSelect
                          value={
                            selectedEditUserId
                              ? selectedEditUserId.toString()
                              : ""
                          }
                          disabled={users.loading}
                          placeholder="Selecione o usuário"
                          onValueChange={(value) =>
                            setSelectedEditUserId(parseInt(value, 10))
                          }
                        >
                          {users.users.map((user) => (
                            <SearchSelectItem
                              key={user.id}
                              value={user.id.toString()}
                            >
                              {user.name}
                            </SearchSelectItem>
                          ))}
                        </SearchSelect>
                      </div>

                      {selectedEditUserId && (
                        <Card className="sm:col-span-2 grid gap-4 sm:grid-cols-2 sm:gap-6">
                          <div className="w-full">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Nome
                            </label>
                            <TextInput
                              disabled={users.loading}
                              placeholder="Natã Santos"
                              className="p-1"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              error={Boolean(editformError.name)}
                              errorMessage={editformError.name}
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="age"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Idade
                            </label>
                            <NumberInput
                              disabled={users.loading}
                              placeholder="24"
                              className="p-1"
                              value={editAge}
                              onChange={(e) => setEditAge(e.target.value)}
                              error={Boolean(editformError.age)}
                              errorMessage={editformError.age}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              E-mail
                            </label>
                            <TextInput
                              disabled={users.loading}
                              placeholder="email@exemplo.com"
                              className="p-1"
                              value={editEmail}
                              onChange={(e) => setEditEmail(e.target.value)}
                              error={Boolean(editformError.email)}
                              errorMessage={editformError.email}
                            />
                          </div>
                        </Card>
                      )}
                    </div>
                    <Button
                      disabled={Boolean(!selectedEditUserId)}
                      loading={users.loading}
                      className="mt-4 !text-white dark:!bg-blue-700 dark:!border-blue-700 dark:hover:!bg-blue-800 dark:hover:!border-blue-800"
                      size="md"
                    >
                      Editar
                    </Button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="mt-10">
            <div className="mt-10">
              <section className="bg-white dark:bg-gray-900">
                <div className="pb-8 px-4 mx-auto max-w-2xl lg:pb-16">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Excluir usuário
                  </h2>
                  <form onSubmit={handleDeleteUser}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="id"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Usuário
                        </label>

                        <SearchSelect
                          value={
                            selectedDeleteUserId
                              ? selectedDeleteUserId.toString()
                              : ""
                          }
                          disabled={users.loading}
                          placeholder="Selecione o usuário"
                          onValueChange={(value) =>
                            setSelectedDeleteUserId(parseInt(value, 10))
                          }
                        >
                          {users.users.map((user) => (
                            <SearchSelectItem
                              key={user.id}
                              value={user.id.toString()}
                            >
                              {user.name}
                            </SearchSelectItem>
                          ))}
                        </SearchSelect>
                      </div>

                      {selectedDeleteUserId && (
                        <Card className="sm:col-span-2">
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableHeaderCell>Nome</TableHeaderCell>
                                <TableHeaderCell>Idade</TableHeaderCell>
                                <TableHeaderCell>E-mail</TableHeaderCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {selectedDeleteUser?.name}
                                </TableCell>
                                <TableCell>{selectedDeleteUser?.age}</TableCell>
                                <TableCell>
                                  {selectedDeleteUser?.email}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Callout
                            className="mt-4 dark:bg-red-950 dark:text-red-300"
                            title="Exclusão de Usuário"
                            icon={ExclamationTriangleIcon}
                            color="rose"
                          >
                            Essa ação é irreversível e removerá permanentemente
                            o acesso do usuário.
                          </Callout>
                        </Card>
                      )}
                    </div>
                    <Button
                      disabled={Boolean(!selectedDeleteUserId)}
                      loading={users.loading}
                      className="mt-4 !text-white dark:!bg-blue-700 dark:!border-blue-700 dark:hover:!bg-blue-800 dark:hover:!border-blue-800"
                      size="md"
                    >
                      Excluir
                    </Button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
