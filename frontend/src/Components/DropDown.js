import { Dropdown, Menu } from "antd"


const DropDownMenu = () => {

    const actionItems = [
        {
            key: '1',
            label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
            )
        },
        {
            key: '1',
            label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
            )
        }
    ]

    const menu = (
        <Menu>
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </Menu>
    );


    return(
        <>
        <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
                Hover me
            </a>
        </Dropdown>
        </>
    )
}

export default DropDownMenu;