"use client";
import {
  PlusIcon,
  ArrowPathIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  ProgressBar,
  Flex,
  Text,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from "@tremor/react";

export default function UsersTab() {
  return (
    <>
      <TabGroup>
        <TabList>
          <Tab icon={PlusIcon}>Criar</Tab>
          <Tab icon={ArrowPathIcon}>Atualizar</Tab>
          <Tab icon={TrashIcon}>Excluir</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-10">
              <section className="bg-white dark:bg-gray-900">
                <div className="pb-8 px-4 mx-auto max-w-2xl lg:pb-16">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Adcionar usuário
                  </h2>
                  <form action="#">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div className="w-full">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Nome
                        </label>
                        <input
                          type="text"
                          autoComplete="name"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Natã Santos"
                          required
                        />
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="age"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Idade
                        </label>
                        <input
                          type="number"
                          name="age"
                          id="age"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="24"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          E-mail
                        </label>
                        <input
                          type="email"
                          autoComplete="email"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="email@exemplo.com"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 dark:bg-blue-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                      Adcionar
                    </button>
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
                    <form action="#">
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="id"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            ID
                          </label>
                          <input
                            type="number"
                            name="id"
                            id="id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="1"
                            required
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Nome
                          </label>
                          <input
                            type="text"
                            autoComplete="name"
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Natã Santos"
                            required
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="age"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Idade
                          </label>
                          <input
                            type="number"
                            name="age"
                            id="age"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="24"
                            required
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            E-mail
                          </label>
                          <input
                            type="email"
                            autoComplete="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="email@exemplo.com"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 dark:bg-blue-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                      >
                        Adcionar
                      </button>
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
                    <form action="#">
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="id"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            ID
                          </label>
                          <input
                            type="number"
                            name="id"
                            id="id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="1"
                            required
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Nome
                          </label>
                          <input
                            type="text"
                            autoComplete="name"
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Natã Santos"
                            required
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="age"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Idade
                          </label>
                          <input
                            type="number"
                            name="age"
                            id="age"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="24"
                            required
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            E-mail
                          </label>
                          <input
                            type="email"
                            autoComplete="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="email@exemplo.com"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 dark:bg-blue-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                      >
                        Adcionar
                      </button>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}
