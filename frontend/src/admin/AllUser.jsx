import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from '../components/common/Head';
import Table from '../components/common/TableUser';

const AllUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8081/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId)); // Update state
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
                <Head h1="All" h2="Users" />
            </div>
            <div className="pl-10 w-full max-w-6xl mx-auto mb-32">
                <Table users={users} onDeleteUser={deleteUser} /> {/* Pass deleteUser function */}
            </div>
        </div>
    );
};

export default AllUser;
