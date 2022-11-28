import React, { useContext, useEffect, useRef, useState } from "react";
import ClassItem from "./ClassItem";
import api, { endpoint } from "api/api";
import Pagination from "./Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Dropdown, Table, ButtonGroup } from "react-bootstrap";
import { ModalContext } from "context/ModalContext";
import axios from "axios";
import './TableData.css'

export default function TableData() {
    const [userList, setUserList] = useState([]);
    const location = useLocation();
    let userClick = useRef();
    const [searchString, setSearchString] = useState('');
    const [sortBy, setSortBy] = useState("Descending");
    const modalContext = useContext(ModalContext);
    const [all, setAll] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [staff, setStaff] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    const dataModalCanNotDeleteUser = {
        isShowModal: true,
        title: "Can not disable user?",
        content:
            "There are valid assignments belonging to this user. Please close all assignment before disable user",
        isShowButtonCloseIcon: true,
        isShowButtonClose: false,
        isShowButtonFunction: false,
        contentButtonFunction: "Delete",
        contentButtonClose: "Cancel",
    };
    const dataModalCanDeleteUser = {
        isShowModal: true,
        title: "Are you sure?",
        content: "Do you want to disable this user?",
        isShowButtonCloseIcon: false,
        isShowButtonClose: true,
        isShowButtonFunction: true,
        contentButtonFunction: "Disable",
        contentButtonClose: "Cancel",
        handleFunction: HandleRemoveUser,
    };
    const dataModalCanDeleteCurrentUser = {
        isShowModal: true,
        title: "Warning disable!",
        content: "You cannot delete yourself.",
        isShowButtonCloseIcon: true,
        isShowButtonClose: false,
        isShowButtonFunction: false,
    };
    const handleDisableUser = (userId) => {
        if (currentUser === userId) {
            modalContext.HandleSetModalData(dataModalCanDeleteCurrentUser);
        } else {
            axios
                .get(`/api/Users/checkuser/${userId}`)
                .then(() => {
                    userClick = userId;
                    modalContext.HandleSetModalData(dataModalCanDeleteUser);
                })
                .catch(function (error) {
                    modalContext.HandleSetModalData(dataModalCanNotDeleteUser);
                });
        }
    };
    function HandleRemoveUser() {
        var userId = userClick;
        if (userId !== "") {
            axios
                .put(`/api/Users/delete/${userId}`)
                .then(setUserList(userList.filter((item) => item.id !== userId)));
            //Close modal
            const newData = {
                isShowModal: false,
            };
            modalContext.HandleSetModalData(newData);
        }
    }

    const navigate = useNavigate();

    const createNewUser = () => {
        navigate("create-new-user");
    };

    useEffect(() => {
        axios.get("api/Users/GetAll").then((response) => {
            response.data.sort((a, b) => (a.staffCode > b.staffCode) ? 1 : -1)
            let userList = response.data.map((user) => ({
                id: user.id,
                staffCode: user.staffCode,
                fullName: user.firstName + " " + user.lastName,
                userName: user.userName,
                joinedDate: user.joinedDate,
                dateofBirth: user.dateofBirth,
                location: user.location,
                gender: user.gender,
                type: user.type,
            }))
            if (location.state !== null) {
                console.log(location.state)
                userList = userList.filter(x => x.staffCode !== location.state.user.staffCode)
                setUserList([location.state.user, ...userList]);
                window.history.replaceState({}, document.title);
            } else {
                setUserList(userList)
            }
        }).catch((err) => console.log(err)
        )

        axios.get("/api/users").then((response) => {
            setCurrentUser(response.data.id);
        });
    }, [location.state])



    const initialPagination = {
        rowsPerPage: 5,
        currentPage: 1,
    };
    const [pagination, setPagination] = useState(initialPagination);

    const paginate = (pageNumber, rowsPerPage) => {
        setPagination({
            rowsPerPage:
                rowsPerPage === "All" ? userList.length : parseInt(rowsPerPage),
            currentPage: pageNumber,
        });
    };

    const indexOfLastCourse = pagination.currentPage * pagination.rowsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - pagination.rowsPerPage;

    const handleSearchUser = () => {
        const loadUser = async () => {
            if ((searchString.replace(/\s/g, '') === "" || searchString.replace(/\s/g, '') === "#" || searchString.replace(/\s/g, '') === "." || searchString.replace(/\s/g, '') === "/" || searchString.replace(/\s/g, '') === "?" || searchString === null) && (admin === true || all === true || staff === true)) {
                let res = await api.get(endpoint["Users"](0, "All", "Not Found The User", "null", "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (all === true) {
                let res = await api.get(endpoint["Users"](0, "All", searchString, "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if ((staff === true && admin === true) || (staff === true && all === true) || (admin === true && all === true) || (admin === true && staff === true && all === true)) {
                let res = await api.get(endpoint["Users"](0, "All", searchString, "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (staff === true) {
                let res = await api.get(endpoint["Users"](0, "Staff", searchString, "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (admin === true) {
                let res = await api.get(endpoint["Users"](0, "Admin", searchString, "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString.replace(/\s/g, '') === "" || searchString.replace(/\s/g, '') === "#" || searchString.replace(/\s/g, '') === "." || searchString.replace(/\s/g, '') === "/" || searchString.replace(/\s/g, '') ==="?" || searchString === null) {
                let res = await api.get(endpoint["Users"](0, "All", "Not Found The User", "null", "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString != null) {
                let res = await api.get(endpoint["Users"](0, "All", searchString, "null", "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadUser();
    };
    const handleSortByStaffCode = () => {
        const loadUser = async () => {
            if (admin === true && staff === false && all === false) {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "Staff Code", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (staff === true && admin === false && all === false) {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "Staff Code", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString === null && (all === true || (admin === true && staff === true) || (admin === true && all === true) || (all === true && staff === true))) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Staff Code", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString === "" && all === false && admin === false && staff === false) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Staff Code", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString != null && all === false && admin === false && staff === false) {
                let res = await api.get(endpoint["Users"](0, "null", searchString, "Staff Code", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Staff Code", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadUser();
    };
    const handleSortByName = () => {
        const loadUser = async () => {
            if (admin === true && staff === false && all === false) {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "Full Name", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (staff === true && admin === false && all === false) {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "Full Name", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString === null && (all === true || (admin === true && staff === true) || (admin === true && all === true) || (all === true && staff === true))) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Full Name", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString === "" && all === false && admin === false && staff === false) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Full Name", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString != null && all === false && admin === false && staff === false) {
                let res = await api.get(endpoint["Users"](0, "null", searchString, "Full Name", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Full Name", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadUser();
    };
    const handleSortByJoinedDate = () => {
        const loadUser = async () => {
            if (admin === true && staff === false && all === false) {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "Joined Date", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (staff === true && admin === false && all === false) {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "Joined Date", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString === null && (all === true || (admin === true && staff === true) || (admin === true && all === true) || (all === true && staff === true))) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Joined Date", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString === "" && all === false && admin === false && staff === false) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Joined Date", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString != null && all === false && admin === false && staff === false) {
                let res = await api.get(endpoint["Users"](0, "null", searchString, "Joined Date", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Joined Date", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadUser();
    };
    const handleSortByType = () => {
        const loadUser = async () => {
            if (admin === true && staff === false && all === false) {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "Type", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (staff === true && admin === false && all === false) {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "Type", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString === null && (all === true || (admin === true && staff === true) || (admin === true && all === true) || (all === true && staff === true))) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Type", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString === "" && all === false && admin === false && staff === false) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Type", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString != null && all === false && admin === false && staff === false) {
                let res = await api.get(endpoint["Users"](0, "null", searchString, "Type", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            else {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Type", sortBy));
                try {
                    setUserList(res.data);
                    if (sortBy === "Descending") {
                        setSortBy("Ascending")
                    }
                    else {
                        setSortBy("Descending")
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadUser();
    };
    const handleCheckbox = (event) => {
        if (event.target.value === "All") {
            setAll(event.target.checked);
        }
        if (event.target.value === "Admin") {
            setAdmin(event.target.checked);
        }
        if (event.target.value === "Staff") {
            setStaff(event.target.checked);
        }
    };
    const handleFilter = () => {
        if (
            all === true ||
            (admin === true && staff === true) ||
            (admin === true && all === true) ||
            (all === true && staff === true)
        ) {
            const loadUser = async () => {
                let res = await api.get(endpoint["Users"](0, "All", "null", "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            loadUser();
        } else if (admin === true) {
            const loadUser = async () => {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            loadUser();
        } else if (staff === true) {
            const loadUser = async () => {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            loadUser();
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <div className="row">
                <h4 className="page-title">User list</h4>
                <div className="col-sm-4 text-start">
                    <Dropdown as={ButtonGroup} align="end" size="sm">
                        <Dropdown.Toggle
                            variant="outline-dark"
                            style={{
                                width: "100px",
                                textAlign: "left",
                                paddingLeft: "10px",
                            }}
                        >
                            Type
                        </Dropdown.Toggle>

                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={handleFilter}
                        >
                            <i className="bi bi-funnel-fill"></i>
                        </button>
                        <Dropdown.Menu
                            style={{
                                minWidth: "100px",
                                padding: "10px",
                            }}
                        >
                            <Form.Check
                                type="checkbox"
                                id="All"
                                label="All"
                                value="All"
                                checked={all}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Admin"
                                label="Admin"
                                value="Admin"
                                checked={admin}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Staff"
                                label="Staff"
                                value="Staff"
                                checked={staff}
                                onChange={handleCheckbox}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-sm-5 d-flex">
                    <div
                        className="input-group mb-3 input-group-sm"
                        style={{ height: "30px" }}
                    >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            name="search"
                            value={searchString}
                            onChange={(event) => setSearchString(event.target.value)}
                        ></input>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={handleSearchUser}
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className="col-sm-3 text-end">
                    <button className="btn btn-danger btn-sm" onClick={createNewUser}>
                        Create new user
                    </button>
                </div>
            </div>
            {userList.length === 0 ? <h5>No results were found to match your search</h5> :
                <Table>
                    <thead>
                        <tr>
                            <th className="cursor-pointer" value="Staff Code" onClick={handleSortByStaffCode}>
                                Staff Code<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                            <th className="cursor-pointer" value="Full Name" onClick={handleSortByName}>
                                Full Name<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                            <th>Username</th>
                            <th className="cursor-pointer" value="Joined Date" onClick={handleSortByJoinedDate}>
                                Joined Date<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                            <th className="cursor-pointer" value="Type" onClick={handleSortByType}>
                                Type<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {userList
                            .slice(indexOfFirstCourse, indexOfLastCourse)
                            .map((user, index) => {
                                return (
                                    <ClassItem
                                        key={index}
                                        presentation={user}
                                        HandleClick={handleDisableUser}
                                    />
                                );
                            })}
                    </tbody>
                </Table>
            }
            <Pagination
                rowsPerPage={pagination.rowsPerPage}
                totalUsers={userList.length}
                paginate={paginate}
            />
        </div>
    );
}
