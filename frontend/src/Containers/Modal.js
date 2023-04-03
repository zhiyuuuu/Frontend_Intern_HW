import { IoClose } from 'react-icons/io5';

const Modal = ({ issue, setOpen }) => {
    console.log('issue for modal', issue);
    return(
        <div className="modal-container">
            <div className="modal">
                <div className="modal-title">
                    <div className="topic">{ issue.title }</div>
                    <IoClose onClick={() => setOpen(false)}/>
                </div>
                <div className="modal-body"> { issue.body } </div>
            </div>
        </div>
    )
}

export default Modal;