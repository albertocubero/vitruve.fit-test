import React from 'react';

interface User {
    avatar: string;
}

interface About {
    title: string;
    description: string;
}

export interface Customer {
    company: string;
    website: string;
    status: 'Customer' | 'Churned';
    about: About;
    users: User[];
    extraUsers?: number;
    licenseUse: number;
}

interface CustomerTableProps {
    customers: Customer[];
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
    return (
        <section className="container px-4 mx-auto">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Customers</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                These companies have purchased in the last 12 months.
            </p>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Company
                                        </th>
                                        <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            About
                                        </th>
                                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Users
                                        </th>
                                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            License use
                                        </th>
                                        <th className="relative py-3.5 px-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {customers.map((customer, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                                        {customer.company}
                                                    </h2>
                                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                                        {customer.website}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className={`inline px-3 py-1 text-sm font-normal rounded-full ${
                                                    customer.status === 'Customer' ? 'text-emerald-500 bg-emerald-100/60' : 'text-gray-500 bg-gray-100'
                                                } dark:bg-gray-800`}>
                                                    {customer.status}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <h4 className="text-gray-700 dark:text-gray-200">{customer.about.title}</h4>
                                                    <p className="text-gray-500 dark:text-gray-400">{customer.about.description}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {customer.users.map((user, idx) => (
                                                        <img
                                                            key={idx}
                                                            className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                                                            src={user.avatar}
                                                            alt=""
                                                        />
                                                    ))}
                                                    {customer.extraUsers && (
                                                        <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                                            +{customer.extraUsers}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                                                    <div
                                                        className="bg-blue-500 h-1.5"
                                                        style={{ width: `${customer.licenseUse}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                                        />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Ejemplo de uso
const customersData: Customer[] = [
    {
        company: 'Catalog',
        website: 'catalogapp.io',
        status: 'Customer',
        about: { title: 'Content curating app', description: 'Brings all your news into one place' },
        users: [
            { avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80' },
            { avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' },
        ],
        extraUsers: 4,
        licenseUse: 66,
    },
    // Agrega más clientes aquí
];

const App: React.FC = () => {
    return <CustomerTable customers={customersData} />;
};
