"use client";
import { Card, Text, Title } from "@tremor/react";
import UsersTab from "./tab";

export default function Dashboard() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Usuários</Title>
      <Text>Criar, atualizar, ou excluir usuário </Text>
      <Card className="mt-6">
        <UsersTab></UsersTab>
      </Card>
    </main>
  );
}
