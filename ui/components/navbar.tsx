import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import * as Auth from "../services/auth"

const navigation = [
  { name: "Produtores", href: "/producers", current: false },
  { name: "Mapa", href: "/maps", current: false },
  { name: "Sobre", href: "/about", current: false },
];

function profileNavigation() {
  if (typeof window !== 'undefined') {
    if (Auth.isAuthenticated()) {
      return profileNavigationProducer
    }
    return profileNavigationGuest
  }
  return profileNavigationGuest
}

const profileNavigationGuest = [
  { name: "Faça seu Cadastro", href: "/register" },
  { name: "Faça Login", href: "/login" },
  { name: "Sair", href: "/logout" },
];

const profileNavigationUser = [
  { name: "Perfil", href: "/profile" },
  { name: "Sair", href: "/logout" },
];

const profileNavigationProducer = [
  { name: "Perfil", href: "/profile" },
  { name: "Meus produtos", href: "/my/products" },
  { name: "Sair", href: "/logout" },
];


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  let token: any
  if (typeof window !== 'undefined') {
    token = Auth.getToken()
  }


  const requestOptions = {
    method: 'GET',
    headers: { 'x-auth-token': `${token}` }
  };

  useEffect(() => {

    fetch(`${serverUrl}/me`, requestOptions)
      .then(async (response) => {
        const data = await response.json()
        if (response.status == 401) {
          if (typeof window !== 'undefined')
            Auth.logout()
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });

  }, []);

  return (
    <Disclosure as="nav" className="bg-emerald-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {/* TODO: adicionar logo */}
                  <Link href={"/"}>
                    <a className="text-2xl font-bold text-white">NutriVerde</a>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "bg-emerald-900 text-white"
                              : "text-gray-300 hover:bg-emerald-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative z-10">
                  <div>
                    <Menu.Button className="bg-emerald-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      {profileNavigation().map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link href={item.href}>
                              <a
                                className={classNames(
                                  active ? "bg-emerald-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-emerald-900 text-white"
                      : "text-gray-300 hover:bg-emerald-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
