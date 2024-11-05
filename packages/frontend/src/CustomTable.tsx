import React from 'react';
import { IAthlete } from './domain/types/IAthlete';

interface About {
  title: string;
  description: string;
}

export interface Customer {
  company: string;
  website: string;
  status: 'Customer' | 'Churned';
  about: About;
}

interface CustomerTableProps {
  customers: IAthlete[];
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-100">Users</h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            100 users
          </span>
        </div>

        <div className="flex items-center gap-x-3">
          <button className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            Create User
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="-my-2 overflow-x-auto">
          <div className="inline-block py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className=" divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-xs w-1/4">
                      Name
                    </th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Age
                    </th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-xs w-1/4">
                      Team
                    </th>
                    <th className="relative py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium max-w-xs w-1/4">
                        <div className="font-medium text-gray-800 dark:text-white">
                          {customer.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium">
                        <div className="font-medium text-gray-800 dark:text-white">
                          {customer.age}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium max-w-xs w-1/4">
                        <div className="font-medium text-gray-800 dark:text-white">
                          {customer.team}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
                        <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                          </svg>
                        </button>
                        <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
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
    </div>
  );
};
