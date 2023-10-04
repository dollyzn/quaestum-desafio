import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from "@tremor/react";
import Skeleton from "./skeleton";

export default function UsersTable({
  users,
  loading,
}: {
  users: User[];
  loading: boolean;
}) {
  return loading ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nome</TableHeaderCell>
          <TableHeaderCell>Idade</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton className="w-4/6" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-2/4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-3/4" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="w-4/5" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-1/4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-2/4" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="w-4/6" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-2/4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-4/5" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : users.length ? (
    <Table className="max-h-homeTable pe-6">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="bg-white dark:bg-gray-900">
            Nome
          </TableHeaderCell>
          <TableHeaderCell className="bg-white dark:bg-gray-900">
            Idade
          </TableHeaderCell>
          <TableHeaderCell className="bg-white dark:bg-gray-900">
            Email
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Text>{user.age}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.email}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div
      className="p-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">Nenhum Usuário Encontrado</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">
        Parece que não conseguimos encontrar nenhum usuário desta vez. Não se
        preocupe, continuaremos procurando. 🔍
      </div>
      <div className="flex">
        <a href="/dashboard">
          <button
            type="button"
            className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Criar usuário
          </button>
        </a>
        <button
          type="button"
          className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
          onClick={() => {
            window.location.reload();
          }}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
