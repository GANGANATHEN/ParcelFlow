"use client";
import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Image from "next/image";

export default function Home() {
  const [hlo, sethlo] = useState(false);
  return (
    <div className="p-5 flex flex-col gap-y-5">
      <section className="hidden">
        {/* grid layout */}
        <div className="grid items-center w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-5 border border-black">
          <div className="border-1 bg-red-300 w-full p-5">1</div>
          <div className="border-1 bg-red-300 w-full p-5">2</div>
          <div className="border-1 bg-red-300 w-full p-5">3</div>
          <div className="border-1 bg-red-300 w-full p-5">4</div>
          <div className="border-1 bg-red-300 w-full p-5">5</div>
          <div className="border-1 bg-red-300 w-full p-5">6</div>
          <div className="border-1 bg-red-300 w-full p-5">7</div>
          <div className="border-1 bg-red-300 w-full p-5">8</div>
          <div className="border-1 bg-red-300 w-full p-5">9</div>
          <div className="border-1 bg-red-300 w-full p-5">10</div>
        </div>
        {/* clamp method */}
        <div className="border border-black p-5 sm:text-sm md:text-base lg:text-lg xl:text-xl">
          <h1 className="font-bold">Typography font-size tailwind</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis animi praesentium temporibus reiciendis eos atque. Nulla
            deleniti obcaecati quas, natus vel hic officiis quidem, non est
            expedita illo quasi omnis!
          </p>
        </div>

        {/*css clamp method */}
        <div className="border border-black p-5 de-clamp">
          <h1 className="font-bold">clamp css</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis animi praesentium temporibus reiciendis eos atque. Nulla
            deleniti obcaecati quas, natus vel hic officiis quidem, non est
            expedita illo quasi omnis!
          </p>
        </div>
      </section>

      {/* dropdown menu */}
      {/* <div class="relative inline-block">
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
            data-dropdown-toggle="dropdownId"
          >
            
            hello
          </button>

          <div
            id="dropdownId"
            class="absolute top-0 left-[110%] w-48 bg-white rounded shadow-md visible"
          >
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">
              Link 1
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">
              Link 2
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">
              Link 3
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">
              Link 4
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">
              Link 5
            </a>
          </div>
        </div> */}
      {/* <div className="bg-red-50 p-5 rounded-lg">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
              Options
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
              Option
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute left-[110%] top-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  Account settings
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  Support
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  License
                </a>
              </MenuItem>
              <form action="#" method="POST">
                <MenuItem>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
          <MenuItems
            transition
            className="absolute left-[110%] top-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  Account settings
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  Support
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  License
                </a>
              </MenuItem>
              <form action="#" method="POST">
                <MenuItem>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </Menu>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
              Options
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
              Option
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute left-[110%] top-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  Account settings
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  Support
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  License
                </a>
              </MenuItem>
              <form action="#" method="POST">
                <MenuItem>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </Menu>
      </div> */}
      <label className='relative shadow-[1px_-1px_3px_3px_rgb(255_46_46/12%)_inset] h-10 w-20 bg-cyan-500 bg rounded-full p-1 flex items-center has-[:checked]:bg-gray-600 *:cursor-pointer'>
                <label className="peer flex items-center justify-center h-8 w-8 rounded-full bg-white relative content-end left-0 transition-all duration-300 has-[:checked]:left-full has-[:checked]:-translate-x-full">
                    <input className='peer' type="checkbox" name="switch" hidden />
                    <svg width="24" height="24" fill="none" aria-hidden="true" className=" text-cyan-500 transition-all scale-100 opacity-100 duration-500 peer-checked:scale-0 peer-checked:opacity-0">
                        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <svg width="24" height="24" fill="none" aria-hidden="true" className="-ml-6 transition-all duration-500 text-slate-700 scale-0 opacity-0 peer-checked:scale-100 peer-checked:opacity-100">
                        <path d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
                            fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </label>
                <svg width="24" height="24" fill="none" aria-hidden="true" className="absolute ml-1 transition-all duration-300 text-zinc-400 scale-0 peer-has-[:checked]:scale-100"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <svg width="24" height="24" fill="none" aria-hidden="true" className="absolute right-2 transition-all scale-100 duration-300 text-cyan-200 peer-has-[:checked]:scale-0">
                    <path d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
                        fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </label>
    </div>
  );
}
