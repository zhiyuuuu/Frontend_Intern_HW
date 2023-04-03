import { IoClose } from 'react-icons/io5';
import { Input } from 'antd'; 
import { useState } from 'react';

const Modal = ({ issue, setOpen }) => {
    // console.log('issue for modal', issue);

    const [openEditor, setOpenEditor] = useState(false);

    return(
        <div className="modal-container">
            <div className="modal">
                <div className="modal-title">
                    <div className="topic">{ issue.title }</div>
                    <IoClose onClick={() => setOpen(false)}/>
                </div>
                <div className="modal-body"> 
                    <div className="task-state">
                        { issue.state }
                    </div>
                    <div className="content">
                        { issue.body } 
                    </div>
                </div>
                <div className="footer">
                    <button onClick={() => setOpenEditor(!openEditor)}> Edit </button>
                    <button>Delete</button>
                </div>
                <div className="inputBlock" style={ 
                    openEditor?
                        { display: "flex" }:{ display: "none" }
                }>
                    <Input.TextArea id='block-title' rows={1}/>
                    <Input.TextArea id='block-body' rows={5}/>
                    <div className="submit-button">
                        <button>Update Issue</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Modal;