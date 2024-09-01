"use client";
import Image from "next/image";
import React from "react";

const Header: React.FC = () => {
return (
<div className="flex flex-row w-full justify-between h-auto items-center text-black bg-white p-4 shadow-md">
    <div className="flex items-center text-black">
    <Image
        src="/home/postlogo (2).png"
        alt="India Post"
        className="md:w-48 h-auto w-24 "
        height={300}
        width={300}
        
    />
    </div>

    <div className="flex items-center space-x-4">
    <Image
        src="/home/g20.png"
        alt="G20"
        className="h-12"
        height={48}
        width={48}
    />

    <Image
        src="/home/azadi.png"
        alt="Azadi Ka Amrit Mahotsav"
        className="h-12"
        height={48}
        width={48}
    />

    <Image
        src="/home/satya.png"
        alt="Government Emblem"
        className="h-12"
        height={48}
        width={48}
    />
    </div>
</div>
);
};

export default Header;
