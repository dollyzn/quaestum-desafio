"use client";
import { Card, Text, Title } from "@tremor/react";
import UsersTab from "./tab";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/redux/usersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";

export default function Dashboard() {
  const users = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!users.users.length || users.error) {
      dispatch(getAllUsers());
    }
  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Usuários</Title>
      <Text>Listar, criar, atualizar, ou excluir usuários </Text>
      <Card className="mt-6">
        <UsersTab></UsersTab>
      </Card>
    </main>
  );
}
