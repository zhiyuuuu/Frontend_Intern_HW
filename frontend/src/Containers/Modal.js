import { IoClose } from 'react-icons/io5';
import { Input, Form, Popconfirm, message } from 'antd'; 
import { useState } from 'react';
import { closeIssue, updateIssue } from '../api';

const Modal = ({ issue, setOpen, setState, setContent }) => {
    // console.log('issue for modal', issue);

    const [openEditor, setOpenEditor] = useState(false);

    const handleOnFinish = async(value) => {
        console.log('onfinish', value);
        const inputData = {
            "title": value.Title,
            "body": value.Body,
        }
        // console.log(inputData);
        const data = await updateIssue(localStorage.getItem("accessToken"), issue.repository.owner.login, issue.repository.name, issue.number, inputData);
        console.log('updated title and body', data.title, data.body);
        setContent(data);
        setOpenEditor(false);
        message.success("Issue updated");
    }

    const handleEmptyBody = (body) => {
        if (body === null) {
            return "Empty content :("
        } else {
            return body;
        }
    }

    const handleDelete = async(issue) => {
        const data = await closeIssue(localStorage.getItem("accessToken"), issue.repository.owner.login, issue.repository.name, issue.number);
        // console.log('frontend handle delete data', data);
        setState(data.state);
        console.log('current state after update: ', data.state);
        setOpen(false);
        message.success("Issue closed");
    }

    const validateWordLimit = (_, value) => {
        if (value && value.split(' ').length < 30) {
          return Promise.reject('Required at least 30 words.');
        }
        return Promise.resolve();
    };

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
                        onConfirm={ () => handleDelete(issue) }
                        // onCancel={ handleDelete(issue) }
                        okText="Yes"
                        cancelText="No"
                        >
                        <button>Delete</button>
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
                                },
                                { validator: validateWordLimit }
                            ]}>
                                <Input.TextArea id='block-body' rows={5}/>
                        </Form.Item>
                        <Form.Item>
                            <div className="submit-button">
                                <button type='submit'>Update Issue</button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                
            </div>
        </div>
    )
}

export default Modal;