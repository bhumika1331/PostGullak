import React from 'react';


const Header: React.FC = () => {
return (
<header className="flex justify-between items-center bg-white p-4 shadow-md">
    <div className="flex items-center">
    {/* India Post Logo */}
    <img
        src="/home/postlogo.png"
        alt="India Post"
        className="h-12 mr-4"
    />
    </div>
    <div className="flex items-center space-x-6">
    {/* Sign In and Register */}
    <a href="#" className="text-black hover:text-blue-500">
        Sign In
    </a>
    <a href="#" className="text-black hover:text-blue-500">
        Register
    </a>
    </div>
    <div className="flex items-center space-x-4">
    {/* G20 Logo */}
    <img src="/home/g20.png" alt="G20" className="h-12" />
    {/* Azadi Ka Amrit Mahotsav */}
    <img src="/home/azadi.png" alt="Azadi Ka Amrit Mahotsav" className="h-12" />
    {/* Government Emblem */}
    <img src="/home/satya.png" alt="Government Emblem" className="h-12" />
    </div>
</header>
);
};

export default Header;
