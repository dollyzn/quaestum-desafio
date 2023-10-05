"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { toast } from "react-toastify";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Painel de Controle", href: "/dashboard" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const router = useRouter();

  const isUser = auth.user ? auth.user.profile === "user" : false;

  const [user, setUser] = useState<UserData | null>(null);

  const visibleNavigation = navigation.filter((nav) => {
    return !(nav.name === "Dashboard" && isUser);
  });

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());

    if (logout.fulfilled.match(resultAction)) {
      router.push("/login");
      toast.success("Usuário deslogado com sucesso!", { theme: "dark" });
    } else if (logout.rejected.match(resultAction)) {
      console.error("Erro no cadastro:", resultAction.error);

      //TODO
      switch (resultAction.error.message) {
        case "1":
          break;
      }
    }
  };

  useEffect(() => {
    setUser(auth.user);
  }, []);

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-900 shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <a href="https://quaestum.com.br">
                    <img
                      src="/logo.png"
                      className="rounded-full border border-gray-600"
                      width="32"
                      height="32"
                      alt="Logo"
                    />
                  </a>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {visibleNavigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={(e) => {
                        router.push(item.href);
                      }}
                      className={classNames(
                        pathname === item.href
                          ? "border-slate-500 text-gray-900 dark:text-gray-400"
                          : "border-transparent text-gray-500 dark:text-gray-50   hover:border-gray-300",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full border border-blue-400"
                        src={`https://api.dicebear.com/6.x/thumbs/svg?scale=70&seed=${
                          user ? user.name.split(" ")[0] : ""
                        }`}
                        height={32}
                        width={32}
                        alt={"Avatar"}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg dark:shadow-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "bg-gray-100 dark:bg-gray-700" : "",
                              "flex w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                            )}
                            onClick={() => {
                              handleLogout();
                            }}
                          >
                            Sair
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-900 p-2 text-gray-400 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {visibleNavigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-slate-50 dark:bg-gray-700 border-slate-500 dark:border-slate-500 text-slate-700 dark:text-gray-300"
                      : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200",
                    "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="flex w-full px-4 py-2 text-base font-medium  text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Sair
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
