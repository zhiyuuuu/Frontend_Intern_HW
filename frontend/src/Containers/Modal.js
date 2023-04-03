import { IoClose } from 'react-icons/io5';
import { Input, Form, Popconfirm, message } from 'antd'; 
import { useState } from 'react';

const Modal = ({ issue, setOpen }) => {
    // console.log('issue for modal', issue);

    const [openEditor, setOpenEditor] = useState(false);

    const handleOnFinish = (value) => {
        console.log('onfinish', value);
    }

    const handleEmptyBody = (body) => {
        if (body === null) {
            return "Empty content :("
        } else {
            return body;
        }
    }

    const handleDelete = () => {

    }

    const confirmMsg = () => {
        message.success("Issue closed");
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
                        { handleEmptyBody(issue.body) } 
                    </div>
                </div>
                <div className="footer">
                    <button onClick={() => setOpenEditor(!openEditor)}> Edit </button>
                    <Popconfirm
                        title="Close the issue"
                        description="Are you sure to close this issue ?"
                        onConfirm={ confirmMsg }
                        // onCancel={}
                        okText="Yes"
                        cancelText="No"
                        >
                        <button onClick={ handleDelete }>Delete</button>
                    </Popconfirm>
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