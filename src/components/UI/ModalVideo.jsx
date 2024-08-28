import Modal from 'react-bootstrap/Modal';
import classes from './MainHeaderWrapper.module.css';
const ModalVideo = (props) => {
    return (
        <Modal
            show={props.show}
            fullscreen={props.fullscreen}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
            backdropClassName="custom-backdrop">
                <Modal.Header closeButton className={classes.custom_header}></Modal.Header>
                <Modal.Body className={`${classes.custom_body}`}>
                    {/* {props.configData ? props.configData.map((configItem, index) => (
                        <React.Fragment key={index}>
                            {configItem.key === 'home_page_header_video' && (
                                <video className={`${classes.video_bg}`} alt="Group" src={configItem.value} autoPlay muted loop/>
                            )}
                        </React.Fragment>
                    )): ''} */}
                {props.video && <video className={`${classes.video_bg}`} alt="Group" src={props.video} autoPlay muted loop />}
                </Modal.Body>
        </Modal>
    );
}
export default ModalVideo;