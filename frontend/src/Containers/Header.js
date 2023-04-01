import { Select, Input } from "antd";
import { useState } from "react";
import { BsFilterCircle } from 'react-icons/bs';

const Header = ({ setOrder, render, setRender, setState }) => {

    const handleFilterTime = (value) => {
        if(value === 'Oldest') {
            setOrder(true);
        }
        else {
            setOrder(false);
        }
    }

    const handleSort = (value) => {
        console.log(value);
        setState(value);
        setRender(!render);
    }

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
                        onChange={(e) => {
                            handleFilterTime(e);
                        }}
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
                        onChange={(e) => handleSort(e)}
                        options={[
                            {
                                value: 'all',
                                label: 'All',
                            },
                            {
                                value: 'open',
                                label: 'Open',
                            },
                            {
                                value: 'In Progress',
                                label: 'In Progress'
                            },
                            {
                                value: 'closed',
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
                    setRender(!render);
                }}>
                    Log out
                </button>
            </div>
        </div>
    )
}

export default Header;