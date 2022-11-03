import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate'
import { Button } from "react-bootstrap";
function Home() {
  const [users, setUsers] = useState([]);

  const [offset, setOffset] = useState(0);
  const [perpage] = useState(5);
  const [pageCount, setPageCount] = useState(0)
  let api = 'https://gorest.co.in/public/v2/users'
  function loadUsers() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${'dce52a6f10c52bccab439f0d26dbabe00850e95a37f8a608d464c369400cc70b'}`
    }
    axios.get(api, {
      headers: headers
    }).then((res) => {
      const user = res.data
      const slice = user.slice(offset, offset + perpage)
      setUsers(slice)
      setPageCount(Math.ceil(user.length / perpage))
    });
  }
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perpage)
  };
  useEffect(() => {
    loadUsers();
  });
  function deleteUser(id) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${'dce52a6f10c52bccab439f0d26dbabe00850e95a37f8a608d464c369400cc70b'}`
    }
    axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
      headers: headers
    });
    loadUsers();
  }
  return (
    <>
      <div class="table-responsive"></div>
      <div>
        <h1 className="text-3xl font-bold">Author List</h1>
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th> # </th>
              <th> Name </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, index) => (
              <tr key={index}>
                <td> {index + 1} </td>
                <td> <Link style={{ textDecoration: 'none', color: 'white' }} to={`/users/${data.id}`}> {data.name} </Link> </td>
                <td >
                  <Button variant="danger" onClick={() => deleteUser(data.id)} to={"#"}
                  > Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        subContainerClassName={"page-item"}
        activeClassName={"active"} />
    </>
  );
}

export default Home;
