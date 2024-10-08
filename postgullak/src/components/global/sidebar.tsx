"use client";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt
} from "@tabler/icons-react";
import { useState } from "react";
import { FaChartBar, FaPenSquare } from 'react-icons/fa';
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";

export default function SidebarDemo({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const links = [

    {
      label: "Demographic Map",
      href: "/demomap",
      icon: (
        
        <IconUserBolt className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        
        <FaChartBar className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    
    {
      label: "Post Office savings schemes",
      href: "/scheme",
      icon: (
        
        <IconBrandTabler className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        
      ),
    },
    {
      label: "Cibil Score", 
      href: "#",
      icon: (
        <FaPenSquare className=" dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Logout",
    //   href: "#",
    //   icon: (
    //     <IconArrowLeft className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1   border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen text-white" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              // link={{
              //   label: "hellooo",
              //   href: "#",
              //   icon: (
              //     <Image
              //       src="https://assets.aceternity.com/manu.png"
              //       className="h-7 w-7 flex-shrink-0 rounded-full"
              //       width={50}
              //       height={50}
              //       alt="Avatar"
              //     />
              //   ),
              // }}
              link={{ 
                label: "Logout",
                href: "#",
                icon: (
                  <IconArrowLeft className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* <Dashboard /> */}
      <div className="w-full ">
      {children}
      </div>
    </div>
  );
}
// export const Logo = () => {
//   return (
//     <Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium text-black dark:text-white whitespace-pre"
//       >
//         PostGullak
//       </motion.span>
//     </Link>
//   );
// };
// export const LogoIcon = () => {
//   return (
//     <Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//     </Link>
//   );
// };

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
