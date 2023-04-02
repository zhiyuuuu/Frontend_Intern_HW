const Modal = ({ issue }) => {
    return(
        <div className="modal-container">
            <div className="modal">
                <div className="modal-title"> { issue.title } </div>
                <div className="modal-body"> { issue.body } </div>
            </div>
        </div>
    )
}

export default Modal;