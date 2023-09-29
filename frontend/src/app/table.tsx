import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from "@tremor/react";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nome</TableHeaderCell>
          <TableHeaderCell>Idade</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.length === 0 ? ( // Verifica se a lista de usuários está vazia
          <>
            <TableRow>
              <TableCell>
                <div className="h-3 w-4/6 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>{" "}
              </TableCell>
              <TableCell>
                <div className="h-3 w-2/4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>{" "}
              </TableCell>
              <TableCell>
                <div className="h-3 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="h-3 w-4/5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>{" "}
              </TableCell>
              <TableCell>
                <div className="h-3 w-1/4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>{" "}
              </TableCell>
              <TableCell>
                <div className="h-3 w-2/4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="h-3 w-4/6 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>{" "}
              </TableCell>
              <TableCell>
                <div className="h-3 w-2/4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>{" "}
              </TableCell>
              <TableCell>
                <div className="h-3 w-4/5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>{" "}
              </TableCell>
            </TableRow>
          </>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Text>{user.age}</Text>
              </TableCell>
              <TableCell>
                <Text>{user.email}</Text>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
