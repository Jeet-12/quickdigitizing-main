import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4040/api/auth/users');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        navigate(`/admin/edit-user/${userId}`); // Navigate to edit user page
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:4040/api/auth/users/${userId}`); // Adjust the API endpoint as needed
            setUsers(users.filter(user => user._id !== userId)); // Remove user from state
            toast.current.show({ severity: 'success', summary: 'User Deleted', detail: 'User has been deleted successfully.', life: 3000 });
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete user.', life: 3000 });
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Serial No',
                accessor: 'serialNo',
            },
            {
                Header: 'Full Name',
                accessor: 'fullName',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Active',
                accessor: 'isActive', // Assuming the API returns an isActive field
                Cell: ({ value }) => (value ? 'Yes' : 'No'), // Display Yes/No based on boolean value
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button onClick={() => handleEdit(row.original._id)} className="text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(row.original._id)} className="text-red-500 hover:underline">Delete</button>
                    </div>
                ),
            },
        ],
        []
    );

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase()) || 
                   user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   user.address.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [searchTerm, users]);

    const data = useMemo(
        () =>
            filteredUsers.map((user, index) => ({
                serialNo: index + 1,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                address: user.address,
                isActive: user.isActive, // Assuming the API returns an isActive field
            })),
        [filteredUsers]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) {
        return <div className="text-center mt-10">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Toast ref={toast} />
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">All Users</h2>
                <div className="flex items-center justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full max-w-md px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table
                        {...getTableProps()}
                        className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md overflow-hidden"
                    >
                        <thead className="bg-gray-800 text-white">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className="px-6 py-3 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider"
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody
                            {...getTableBodyProps()}
                            className="text-gray-700 bg-white divide-y divide-gray-200"
                        >
                            {rows.length > 0 ? (
                                rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            className="hover:bg-blue-100 transition-colors duration-200"
                                        >
                                            {row.cells.map((cell) => (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-6 py-4 text-sm font-medium text-gray-700 border-t border-gray-200"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
