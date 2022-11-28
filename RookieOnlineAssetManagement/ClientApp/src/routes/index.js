import { useRoutes } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import ManageUser from "pages/ManageUser/index";
import CreateUser from "pages/ManageUser/CreateUser";
import ManageAsset from "pages/ManageAsset";
import CreateAsset from "pages/ManageAsset/CreateAsset";
import ManageAssignment from "pages/ManageAssignment";
import RequestForReturning from "pages/RequestForReturning";
import Report from "pages/Report";
import EditUser from "pages/ManageUser/EditUser";
import { useContext } from "react";
import { UserRoleContext } from "context/UserRoleContext";
import NotFound from "pages/NotFound";
import Home from "pages/Home";

const Router = () => {
    const userRole = useContext(UserRoleContext);

    return useRoutes([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "manage-user",
                    element: userRole === "admin" ? <ManageUser /> : <NotFound />,
                },
                {
                    path: "manage-user/edit-user",
                    element: userRole === "admin" ? <EditUser /> : <NotFound />,
                },
                {
                    path: "manage-user/create-new-user",
                    element: userRole === "admin" ? <CreateUser /> : <NotFound />,
                },
                {
                    path: "manage-asset",
                    element: userRole === "admin" ? <ManageAsset /> : <NotFound />,
                },
                {
                    path: "manage-asset/create-new-asset",
                    element: userRole === "admin" ? <CreateAsset /> : <NotFound />,
                },
                {
                    path: "manage-assignment",
                    element: userRole === "admin" ? <ManageAssignment /> : <NotFound />,
                },
                {
                    path: "request-for-returning",
                    element:
                        userRole === "admin" ? <RequestForReturning /> : <NotFound />,
                },
                {
                    path: "report",
                    element: userRole === "admin" ? <Report /> : <NotFound />,
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
        },
    ]);
};

export default Router;
