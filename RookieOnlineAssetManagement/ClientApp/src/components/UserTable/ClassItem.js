import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import "./ClassItem.css";
import { useNavigate } from "react-router-dom";

export default function ClassItem(props) {
    const { presentation } = props;
    const navigate = useNavigate();
    const modalContext = useContext(ModalContext);

    var joindate = new Date(presentation.joinedDate);
    var birthdate = new Date(presentation.dateofBirth);

    function CompactString(keyword) {
        var result = "";
        if (keyword.split('').length <= 20)
            return keyword;

        else {
            for (var i = 0; i < 20; i++) {
                result = result.concat(keyword.split('')[i])
            }
            return result + "...";
        }
    }

    let birthdateString = ('0' + birthdate.getDate()).slice(-2) + '/'
        + ('0' + (birthdate.getMonth() + 1)).slice(-2) + '/'
        + birthdate.getFullYear();

    let joindateString = ('0' + joindate.getDate()).slice(-2) + '/'
        + ('0' + (joindate.getMonth() + 1)).slice(-2) + '/'
        + joindate.getFullYear();

    const items = [
        presentation.staffCode,
        CompactString(presentation.fullName),
        CompactString(presentation.userName),
        joindateString,
        presentation.type === 1 ? "Admin" : "Staff",
    ];

    const editUser = () => {
        navigate(`edit-user`, {
            state: {
                staffCode: presentation.staffCode,
            },
        });
    };

    const showUserInfo = () => {
        const userData = `
            <div class="container" id="thien" >
                <div class="row mb-3">
                    <div class="col-5">Staff Code</div>
                    <div class="col-7">${presentation.staffCode}</div>
                </div>
                <div class="row mb-3" >
                    <div class="col-5">Full Name</div>
                    <div class="col-7">${CompactString(presentation.fullName)}</div>
                </div>
                <div class="row mb-3" >
                    <div class="col-5">Username</div>
                    <div class="col-7">${CompactString(presentation.userName)}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Date of Birth</div>
                    <div class="col-7">
                        ${birthdateString
            }
            </div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Gender</div>
                    <div class="col-7">${presentation.gender === 1 ? "Female" : "Male"
            }</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Joined Date</div>
                    <div class="col-7">${joindateString
            }
            </div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Type</div>
                    <div class="col-7">${presentation.type === 1 ? "Admin" : "Staff"
            }</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Location</div>
                    <div class="col-7">${presentation.location}</div>
                </div>
            </div>
            `;

        const newDataModal = {
            isShowModal: true,
            title: "Detailed User Information",
            content: userData,
            isShowButtonCloseIcon: true,
            isShowButtonClose: false,
            isShowButtonFunction: false,
            contentButtonFunction: "",
            contentButtonClose: "Close",
            handleFunction: null,
        };
        modalContext.HandleSetModalData(newDataModal);
    };

    return (
        <tr>
            {[...items].map((item, index) => (
                <td className="align-middle" key={index} onClick={showUserInfo}>
                    {item}
                </td>
            ))}
            <td className="border-0 text-end">
                <i
                    className="bi bi-pencil-fill pe-3"
                    style={{ color: "grey" }}
                    onClick={editUser}
                ></i>
                <i
                    className="bi bi-x-circle"
                    style={{ color: "red" }}
                    onClick={() => props.HandleClick(presentation.id)}
                ></i>
            </td>
        </tr>
    );
}
