import { IoClose } from 'react-icons/io5';
import { Input, Form } from 'antd'; 
import { useState } from 'react';

const Modal = ({ issue, setOpen }) => {
    // console.log('issue for modal', issue);

    const [openEditor, setOpenEditor] = useState(false);

    const handleOnFinish = (value) => {
        console.log('onfinish', value);
    }

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
                    <Form onFinish={ handleOnFinish }>
                        <Form.Item 
                            label="Title"
                            name="Title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter something.'
                                }
                            ]}>
                                <Input.TextArea id='block-title' rows={1}/>
                        </Form.Item>
                        <Form.Item
                            label="Body"
                            name="Body"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter at least 30 words.'
                                }
                            ]}>
                                <Input.TextArea id='block-body' rows={5}/>
                        </Form.Item>
                        <Form.Item>
                            <div className="submit-button">
                                <button>Update Issue</button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                
            </div>
        </div>
    )
}

export default Modal;