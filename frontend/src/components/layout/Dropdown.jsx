import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

export default function Example() {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div >
        <MenuButton className="inline-flex  w-full justify-center gap-x-1.5 rounded-md  px-3 text-sm font-semibold text-white     ">
          {auth?.user?.name||auth?.user?.uname}

          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute md:right-2  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="md:py-1 ">
          <MenuItem>
            <a
              href={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Dashboard
            </a>
          </MenuItem>

          <MenuItem>
            <a
              onClick={handleLogout}
              href="/signin"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Logout
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
