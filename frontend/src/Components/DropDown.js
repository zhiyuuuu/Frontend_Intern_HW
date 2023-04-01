import { Dropdown, Menu } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";

const DropDownMenu = () => {

    const menu = (
        <Menu>
          <Menu.Item key="1"><FiEdit /> Edit</Menu.Item>
          <Menu.Item key="2"><AiOutlineDelete /> Delete</Menu.Item>
        </Menu>
    );


    return(
        <>
            <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                    <HiDotsVertical />
                </a>
            </Dropdown>
        </>
    )
}

export default DropDownMenu;