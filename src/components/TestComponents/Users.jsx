import React, {useEffect, useState} from 'react';


const Users = () => {
    const [users, setUsers] = useState([]);


    let formdata = new FormData();
    formdata.append("server_key", "c04919f13f43b612fff3b76c5d08b2d6");

    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const fetchNameData = () => {

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(
                response => response.json()
            )
            .then(data => {
                setUsers(data);
                    console.log(data);
            }

            )
            .catch(error => console.log('error', error));

    }

    useEffect(() => {
        fetchNameData()
    }, []);


    return (
        <div>
            {users.length > 0 && (
                <ul>
                    {users.map((user,i) => (
                        <>
                        <li key={i}>
                            <h1>{user.name}</h1>
                        </li>
                            <li>
                                <p> address obj: {user.address.city}</p>
                                <p> {user.address.suite}</p>
                                <p> {user.address.zipcode}</p>
                            </li>
                            <li>
                                <h6>Company obj: {user.company.name}</h6>
                                <h6>Company obj: {user.company.catchPhrase}</h6>
                                <h6>Company obj: {user.company.bs}</h6>
                            </li>
                        </>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Users;
