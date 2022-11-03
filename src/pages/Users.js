import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Users() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${'dce52a6f10c52bccab439f0d26dbabe00850e95a37f8a608d464c369400cc70b'}`
  }

  useEffect(() => {
    axios.get(`https://gorest.co.in/public/v2/users/${id}`, { headers: headers }).then((res) => {
      setUser(res.data);
    });
  });
  console.log(user);

  return (
    <>
      <div className="mt-5">

        <Button variant="danger"> <Link style={{textDecoration:"none", color:"white"}} to={`/`}> Back To Home</Link></Button>

        <div>
          <table class="table table-dark table-striped mt-5">
            <thead>
              <tr>
                <th> Name </th>
                <th> Email </th>
                <th> Gender </th>
                <th> Status </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {user.name}</td>
                <td> {user.email}</td>
                <td> {user.gender}</td>
                <td> {user.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;