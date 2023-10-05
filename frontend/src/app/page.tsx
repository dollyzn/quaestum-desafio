"use client";

import { useEffect } from "react";
import { Card, Title, Text } from "@tremor/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/redux/usersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import UsersTable from "./components/table";
import Error from "./components/error";
import Navbar from "./components/navbar";
import PrivateRoute from "./components/privateRoute";

export default function Home() {
  const users = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!users.users.length || users.error) {
      dispatch(getAllUsers());
    }
  }, []);

  return (
    <PrivateRoute>
      <Navbar />
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Usuários</Title>
        <Text>Listagem dos usuários</Text>
        <Card className="mt-6 max-h-homeCard">
          {!users.loading && users.error ? (
            <Error error={users.error.message}></Error>
          ) : (
            <UsersTable users={users.users} loading={users.loading} />
          )}
        </Card>
      </main>
    </PrivateRoute>
  );
}
