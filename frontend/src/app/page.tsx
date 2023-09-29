"use client";

import { useEffect, useState } from "react";
import { getAllUsers, User } from "./api/userService";
import { Card, Title, Text } from "@tremor/react";
import UsersTable from "./table";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os usuários:", error);
      });
  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Usuários</Title>
      <Text>
        Lista dos usuários recuperados do banco de dados MySQL (NestJS Api)
      </Text>
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
