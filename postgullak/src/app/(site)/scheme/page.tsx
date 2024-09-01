import React from 'react';

const PostOfficeSchemes: React.FC = () => {
const schemes = [
'Post Office Savings Account (SB)',
'National Savings Recurring Deposit Account (RD)',
'National Savings Time Deposit Account (TD)',
'National Savings Monthly Income Account (MIS)',
'Senior Citizens Savings Scheme Account (SCSS)',
'Public Provident Fund Account (PPF)',
'Sukanya Samriddhi Account (SSA)',
'National Savings Certificates (NSC)',
'Kisan Vikas Patra (KVP)',
'Mahila Samman Savings Certificate',
];

return (
<div className="w-full h-full flex-1 p-8  bg-white rounded-lg shadow-md">
    <h1 className="text-4xl text-black  font-bold mb-6 mt-10">Post Office Saving Schemes</h1>
    <div className="bg-gray-50 p-6  rounded-lg">
    <table className="min-w-full">
        <thead>
        <tr>
            <th className="text-left text-2xl font-bold text-black">Scheme Name</th>
        </tr>
        </thead>
        <tbody>
        {schemes.map((scheme, index) => (
            <tr key={index}>
            <td className="py-4 border-b gap-2 border-gray-200 text-md text-gray-900">
                • {scheme}
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
</div>
);
};

export default PostOfficeSchemes;