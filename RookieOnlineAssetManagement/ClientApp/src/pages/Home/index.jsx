import { IoCloseSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { fetchUsers } from "pages/Home/HomeSlice";
import { useEffect } from "react";

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])


    const headers = [
        "Asset Code",
        "Asset Name",
        "Category",
        "Assigned Date",
        "State",
    ];

    const assignments = [
        {
            assetCode: "LA100002",
            assetName: "Laptop HP Probook 450 G1",
            category: "Laptop",
            assignedDate: "10/04/2019",
            state: "Accepted",
        },
        {
            assetCode: "LA100003",
            assetName: "Laptop HP Probook 450 G1",
            category: "Laptop",
            assignedDate: "10/04/2019",
            state: "Accepted",
        },
        {
            assetCode: "MO100004",
            assetName: "Monitor Dell UltraSharp",
            category: "Monitor",
            assignedDate: "20/03/2021",
            state: "Waiting for acceptance",
        },
    ];

    return (
        <div>
            <div className="page-title">My Assignment</div>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="p-0">
                                <div
                                    style={{
                                        margin: "7px 0px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {header}
                                    <span className="ms-2">
                                        <i className="bi bi-caret-down-fill"></i>
                                    </span>
                                </div>
                                <hr
                                    className="m-0 me-3 d-block"
                                    style={{ borderTop: "2px solid #000" }}
                                />
                            </th>
                        ))}
                        <th style={{ border: "0px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((row, index) => (
                        <tr key={index}>
                            <td className="p-0 ps-1">
                                <div style={{ margin: "7px 0px 7px 1px" }}>
                                    {row.assetCode}
                                </div>
                                <hr className="m-0 me-3" />
                            </td>
                            <td className="p-0 ps-1">
                                <div style={{ margin: "7px 0px 7px 1px" }}>
                                    {row.assetName}
                                </div>
                                <hr className="m-0 me-3" />
                            </td>
                            <td className="p-0 ps-1">
                                <div style={{ margin: "7px 0px 7px 1px" }}>
                                    {row.category}
                                </div>
                                <hr className="m-0 me-3" />
                            </td>
                            <td className="p-0 ps-1">
                                <div style={{ margin: "7px 0px 7px 1px" }}>
                                    {row.assignedDate}
                                </div>
                                <hr className="m-0 me-3" />
                            </td>
                            <td className="p-0 ps-1">
                                <div style={{ margin: "7px 0px 7px 1px" }}>
                                    {row.state}
                                </div>
                                <hr className="m-0 me-3" />
                            </td>
                            <td className="p-0 px-3 mx-5">
                                <button className="btn p-0 border-0">
                                    <MdDone
                                        style={{
                                            color: "red",
                                            fontSize: "22px",
                                            opacity: "0.2",
                                        }}
                                    />
                                </button>
                                <button className="btn p-0 border-0">
                                    <IoCloseSharp
                                        className="mx-2"
                                        style={{
                                            color: "black",
                                            fontSize: "22px",
                                            opacity: "0.2",
                                        }}
                                    />
                                </button>
                                <button className="btn p-0 border-0 align-items-end">
                                    <BsArrowCounterclockwise
                                        style={{
                                            color: "blue",
                                            fontSize: "22px",
                                        }}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
