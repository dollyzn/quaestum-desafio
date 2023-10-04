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
  Select,
  SelectItem,
} from "@tremor/react";
import Skeleton from "./skeleton";

import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, editUser } from "@/redux/usersSlice";
import { AppDispatch, RootState } from "@/redux/store";

import * as Yup from "yup";
import { toast } from "react-toastify";

export default function UsersTab() {
  const users = useSelector((state: RootState) => state.users);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const tabs = [
    { icon: ListBulletIcon, label: "Listar" },
    { icon: PlusIcon, label: "Criar" },
    { icon: ArrowPathIcon, label: "Atualizar" },
    { icon: TrashIcon, label: "Excluir" },
  ];

  const isAdmin = auth.user ? auth.user.profile === "admin" : false;

  const visibleTabs = tabs.filter((tabInfo) => {
    return !(tabInfo.label === "Excluir" && !isAdmin);
  });

  const listActions = [
    { action: "edit", tab: 2, icon: PencilIcon, tooltip: "Editar usuário" },
    { action: "delete", tab: 3, icon: TrashIcon, tooltip: "Excluir usuário" },
  ];

  const [tab, setTab] = useState<number>(0);

  const [isHovered, setIsHovered] = useState(false);

  const [addName, setAddName] = useState<string>("");
  const [addAge, setAddAge] = useState<string>("");
  const [addEmail, setAddEmail] = useState<string>("");
  const [addPassword, setAddPassword] = useState<string>("");
  const [addProfile, setAddProfile] = useState<string>("");
  const [addformError, setAddFormError] = useState<Partial<FormError>>({});

  const [editName, setEditName] = useState<string>("");
  const [editAge, setEditAge] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editPassword, setEditPassword] = useState<string>("");
  const [editProfile, setEditProfile] = useState<string>("");
  const [editformError, setEditFormError] = useState<Partial<FormError>>({});
  const [selectedEditUserId, setSelectedEditUserId] = useState<string>("");

  const [selectedDeleteUserId, setSelectedDeleteUserId] = useState<string>("");

  const addUserSchema = Yup.object().shape({
    profile: Yup.string().oneOf(
      ["admin", "moderator", "user"],
      'O perfil do usuário deve ser "Administrador", "Moderador" ou "Usuário"'
    ),
    name: Yup.string().required("Opa! Não esqueceu de digitar o nome, né?"),
    email: Yup.string()
      .email("Hmm, esse email parece estar estranho, tenta outro")
      .required("O email é obrigatório, não dá para pular essa."),
    age: Yup.number()
      .positive("Ei, a idade precisa ser maior ou igual a 1.")
      .required("A idade é importante, não deixe em branco!")
      .integer("Ops, a idade deve ser um número inteiro, sem casas decimais!"),
    password: Yup.string()
      .min(6, "A precisa ter pelo menos 6 caracteres, seja criativo!")
      .max(
        30,
        "Essa senha é muito longa, tente uma com menos de 30 caracteres!"
      )
      .required("Oops! Não esqueceu de definir uma senha, certo?"),
  });

  const editUserSchema = Yup.object().shape({
    profile: Yup.string().oneOf(
      ["admin", "moderator", "user"],
      'O perfil do usuário deve ser "Administrador", "Moderador" ou "Usuário"'
    ),
    name: Yup.string().required("Opa! Não esqueceu de digitar o nome, né?"),
    email: Yup.string()
      .email("Hmm, esse email parece estar estranho, tenta outro")
      .required("O email é obrigatório, não dá para pular essa."),
    age: Yup.number()
      .positive("Ei, a idade precisa ser maior ou igual a 1.")
      .required("A idade é importante, não deixe em branco!")
      .integer("Ops, a idade deve ser um número inteiro, sem casas decimais!"),
    password: Yup.string()
      .min(6, "A precisa ter pelo menos 6 caracteres, seja criativo!")
      .max(
        30,
        "Essa senha é muito longa, tente uma com menos de 30 caracteres!"
      ),
  });

  const handleListAction = (action: string, selectedId: string) => {
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
      profile: addProfile,
      name: addName.trim(),
      age: parseInt(addAge, 10),
      email: addEmail.trim(),
      password: addPassword,
    };

    try {
      await addUserSchema.validate(
        {
          profile: addProfile,
          name: addName.trim(),
          age: parseInt(addAge || "0", 10),
          email: addEmail.trim(),
          password: addPassword,
        },
        { abortEarly: false }
      );
      setAddFormError({});

      const resultAction = await dispatch(addUser(userData));

      if (addUser.fulfilled.match(resultAction)) {
        toast.success("Usuário criado com sucesso!", { theme: "dark" });

        setAddName("");
        setAddAge("");
        setAddEmail("");
        setAddPassword("");
      } else if (addUser.rejected.match(resultAction)) {
        //TODO
        switch (resultAction.error.message) {
          case "":
            break;
        }
      }
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
      profile: editProfile,
      name: editName.trim(),
      age: parseInt(editAge, 10),
      email: editEmail.trim(),
      ...(editPassword ? { password: editPassword } : {}),
    };

    try {
      await editUserSchema.validate(
        {
          profile: editProfile,
          name: editName.trim(),
          age: parseInt(editAge || "0", 10),
          email: editEmail.trim(),
          ...(editPassword ? { password: editPassword } : {}),
        },
        { abortEarly: false }
      );
      setEditFormError({});

      const resultAction = await dispatch(
        editUser({ id: selectedEditUserId as string, userData })
      );

      if (editUser.fulfilled.match(resultAction)) {
        toast.success("Usuário editado com sucesso!", { theme: "dark" });
      } else if (editUser.rejected.match(resultAction)) {
        //TODO
        switch (resultAction.error.message) {
          case "1":
            break;
        }
      }
    } catch (error: any) {
      console.log(error);

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

    const resultAction = await dispatch(
      deleteUser(selectedDeleteUserId as string)
    );

    if (deleteUser.fulfilled.match(resultAction)) {
      toast.success("Usuário deletado com sucesso!", { theme: "dark" });

      setSelectedDeleteUserId("");
    } else if (deleteUser.rejected.match(resultAction)) {
      //TODO
      switch (resultAction.error.message) {
        case "1":
          break;
      }
    }
  };

  const selectedEditUser: User | undefined = users.users.find(
    (user) => user.id === selectedEditUserId
  );

  const selectedDeleteUser: User | undefined = users.users.find(
    (user) => user.id === selectedDeleteUserId
  );

  useEffect(() => {
    if (selectedEditUserId && selectedEditUser) {
      setEditProfile(selectedEditUser.profile);
      setEditName(selectedEditUser.name);
      setEditAge(selectedEditUser.age.toString());
      setEditEmail(selectedEditUser.email);
    } else {
      setSelectedEditUserId("");
      setEditProfile("");
      setEditName("");
      setEditAge("");
      setEditEmail("");
    }
  }, [selectedEditUserId, selectedEditUser]);

  return (
    <TabGroup index={tab}>
      <TabList>
        {visibleTabs.map((tabInfo, index) => (
          <Tab key={index} icon={tabInfo.icon} onClick={() => setTab(index)}>
            <span className="max-[450px]:hidden">{tabInfo.label}</span>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          <section className="bg-white mt-10 dark:bg-gray-900 max-h-dashboardSection">
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
                <List className="max-h-dashboardList overflow-auto pe-6">
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
        </TabPanel>
        <TabPanel>
          <section className="mt-10 bg-white dark:bg-gray-900">
            <div className="pb-8 px-4 mx-auto max-w-2xl lg:pb-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Adicionar usuário
              </h2>
              <form onSubmit={handleAddUser}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  {auth.user && auth.user.profile === "admin" && (
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Perfil
                      </label>
                      <Select
                        value={addProfile}
                        onValueChange={setAddProfile}
                        placeholder="Selecione..."
                      >
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="moderator">Moderador</SelectItem>
                        <SelectItem value="user">Usuário</SelectItem>
                      </Select>
                    </div>
                  )}
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

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Senha
                    </label>
                    <TextInput
                      placeholder="••••••••"
                      className="p-1"
                      value={addPassword}
                      onChange={(e) => setAddPassword(e.target.value)}
                      error={Boolean(addformError.password)}
                      errorMessage={addformError.password}
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
        </TabPanel>
        <TabPanel>
          <section className="mt-10 bg-white dark:bg-gray-900">
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
                      value={selectedEditUserId}
                      disabled={users.loading}
                      placeholder="Selecione o usuário"
                      onValueChange={(value) => setSelectedEditUserId(value)}
                    >
                      {users.users.map((user) => (
                        <SearchSelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SearchSelectItem>
                      ))}
                    </SearchSelect>
                  </div>

                  {selectedEditUserId && (
                    <Card className="sm:col-span-2 grid gap-4 sm:grid-cols-2 sm:gap-6">
                      {auth.user && auth.user.profile === "admin" && (
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Perfil
                          </label>
                          <Select
                            value={editProfile}
                            onValueChange={setEditProfile}
                            placeholder="Selecione..."
                          >
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="moderator">Moderador</SelectItem>
                            <SelectItem value="user">Usuário</SelectItem>
                          </Select>
                        </div>
                      )}

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

                      {auth.user && auth.user.profile === "admin" && (
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Senha
                          </label>
                          <TextInput
                            placeholder="••••••••"
                            className="p-1"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            error={Boolean(editformError.password)}
                            errorMessage={editformError.password}
                          />
                        </div>
                      )}
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
        </TabPanel>
        <TabPanel>
          <section className="mt-10 bg-white dark:bg-gray-900">
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
                      value={selectedDeleteUserId}
                      disabled={users.loading}
                      placeholder="Selecione o usuário"
                      onValueChange={(value) => setSelectedDeleteUserId(value)}
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
                            <TableCell>{selectedDeleteUser?.name}</TableCell>
                            <TableCell>{selectedDeleteUser?.age}</TableCell>
                            <TableCell>{selectedDeleteUser?.email}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Callout
                        className="mt-4 dark:bg-red-950 dark:text-red-300"
                        title="Exclusão de Usuário"
                        icon={ExclamationTriangleIcon}
                        color="rose"
                      >
                        Essa ação é irreversível e removerá permanentemente o
                        acesso do usuário.
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
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
