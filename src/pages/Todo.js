import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import Table from 'react-bootstrap/Table';
function Todo() {
    const [users, setUsers] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perpage] = useState(5);
    const [pageCount, setPageCount] = useState(0)
    useEffect(() => {
        loadUsers();
    }, [offset]);
    const loadUsers = async () => {
        const res = await axios
            .get("https://gorest.co.in/public/v2/todos",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${'dce52a6f10c52bccab439f0d26dbabe00850e95a37f8a608d464c369400cc70b'}`
                    }
                });
        const user = res.data;
        const slice = user.slice(offset, offset + perpage)
        setUsers(slice)
        setPageCount(Math.ceil(user.length / perpage))
    };
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perpage)
    };
    const handleFilter = async (value) => {
        const res1 = await axios
            .get(`https://gorest.co.in/public/v2/todos?status=${value}`,
                {
                    headers:
                    {

                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${'dce52a6f10c52bccab439f0d26dbabe00850e95a37f8a608d464c369400cc70b'}`,
                    }
                })
        const user = res1.data;
        const slice = user.slice(offset, offset + perpage);
        setUsers(slice);
    }
    const handleData = async () => {
        const res2 = await axios
            .get(`https://gorest.co.in/public/v2/todos`,
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${'dce52a6f10c52bccab439f0d26dbabe00850e95a37f8a608d464c369400cc70b'}`,
                    }
                })
        const user = res2.data;
        const slice = user.slice(offset, offset + perpage);
        setUsers(slice);
    }
    return (
        <>
            <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10">
                <h1 className="text-2xl font-bold">Todo Api List</h1>
                <div>
                    <button className='btn btn-info m-2' onClick={() => handleData()}>All</button>
                    <button className='btn btn-success m-2' onClick={() => handleFilter("completed")}>Completed</button>
                    <button className='btn btn-danger m-2' onClick={() => handleFilter("pending")}>Pending</button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> User_Id </th>
                            <th> Title </th>
                            <th> Due_On </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((data, index) => (
                            <tr key={index}>
                                <td> {index + 1} </td>
                                <td> {data.user_id} </td>
                                <td> {data.title} </td>
                                <td> {moment(data.due_on).format('DD/MM/YYYY')} </td>
                                <td> {data.status} </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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
export default Todo;
