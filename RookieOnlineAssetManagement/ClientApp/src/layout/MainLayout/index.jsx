import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/index";
import ModalCustom from "../../components/ModalCustom";
import './MainLayout.css'
import { ModalContext } from "../../context/ModalContext";

function MainLayout(props) {
    const modalContext = useContext(ModalContext)

    return (
        <Fragment>
            <Header></Header>
            <div className="mx-4" style={{ marginTop: "80px" }}>
                <div className="overlay"></div>
                <Row>
                    <Col xs={3}>
                        <Sidebar></Sidebar>
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={8} className="position-relative">
                        <ModalCustom
                            modalData={modalContext.modalData}
                        />
                        <div style={{ marginTop: "70px" }}>
                            {props.children ? props.children : <Outlet />}
                        </div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
}

export default MainLayout;
