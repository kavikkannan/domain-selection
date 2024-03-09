import React, { useState, useEffect } from 'react';
import { ref, get, query, orderByKey, update } from 'firebase/database';
import { db } from '@/firebaseConfig';

const ShowMemberTable = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersSnapshot = await get(query(ref(db, 'UserNew'), orderByKey()));

                if (usersSnapshot.exists()) {
                    const usersData = [];
                    usersSnapshot.forEach((snapshot) => {
                        const userData = snapshot.val();
                        const username = formatUsername(snapshot.key); 
                        const userDataWithDateTime = {};
                        Object.keys(userData).forEach((domain) => {
                            const subdomain = userData[domain];
                            const domainData = { subdomain };
                            if (subdomain.dateTime) {
                                domainData.dateTime = subdomain.dateTime.timeAndDate;
                            }
                            userDataWithDateTime[domain] = domainData;
                        });
                        usersData.push({ username, domains: userDataWithDateTime });
                    });
                    setUsers(usersData);
                    setFilteredUsers(usersData);
                } else {
                    console.log('No user data found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredResults = users.filter((user) => {
            return user.username.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredUsers(filteredResults);
    }, [searchTerm, users]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const hasDomain = (user, domain) => {
        return Object.keys(user.domains).includes(domain);
    };
    const formatUsername = (username) => {
        return username.replace('9999', ' ').trim();
    };

    const renderDateTime = (dateTime) => {
        return dateTime ? dateTime : "Not allotted";
    };

    return (
        <div >
            <div className='flex justify-center pt-2 pb-2 rounded-3xl text-black'>
                <input 
                    className=''
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <table className='w-full' style={{ borderSpacing: '10px' }}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Technical</th>
                        <th>Management</th>
                        <th>Design</th>
                    </tr>
                </thead>
                <tbody className=' '>
                    {filteredUsers.map((user, index) => (
                        <tr key={index} className=' '>
                            <td>{user.username}</td>
                            <td>{hasDomain(user, 'technical') ? renderDateTime(user.domains.technical.dateTime) : "Not registered"}</td>
                            <td>{hasDomain(user, 'management') ? renderDateTime(user.domains.management.dateTime) : "Not registered"}</td>
                            <td>{hasDomain(user, 'design') ? renderDateTime(user.domains.design.dateTime) : "Not registered"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default ShowMemberTable;
