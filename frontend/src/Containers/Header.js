import { Select, Input } from "antd";
import { useState } from "react";
import { BsFilterCircle } from 'react-icons/bs';

const Header = () => {

    const [rerender, setRerender] = useState(false);

    return(
        <div className="header-container">
            <div className="filter-container">
                <BsFilterCircle id="filter-icon"/>
                <div className="filter-time">
                    <Select
                        defaultValue="Newest"
                        style={{
                            width: 120,
                        }}
                        // onChange={handleChange}
                        options={[
                            {
                            value: 'Newest',
                            label: 'Newest',
                            },
                            {
                            value: 'Oldest',
                            label: 'Oldest',
                            },
                        ]}
                    />
                </div>
                <div className="filter-state">
                    <Select
                        defaultValue="All"
                        style={{
                            width: 120,
                        }}
                        // onChange={handleChange}
                        options={[
                            {
                                value: 'All',
                                label: 'All',
                            },
                            {
                                value: 'Open',
                                label: 'Open',
                            },
                            {
                                value: 'In Progress',
                                label: 'In Progress'
                            },
                            {
                                value: 'Closed',
                                label: 'Closed'
                            }
                        ]}
                    />
                </div>
            </div>
            <div className="searchbar">
                <Input.Search placeholder="Search for your issues!"/>
            </div>
            <div className="logout">
                <button onClick={() => {
                    localStorage.setItem("accessToken", "undefined");
                    setRerender(!rerender);
                }}>
                    Log out
                </button>
            </div>
        </div>
    )
}

export default Header;