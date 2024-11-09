import Modal from 'react-bootstrap/Modal';
import classes from './MainHeaderWrapper.module.css';
// import { Button } from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';

const ModalVideo = (props) => {
    return (
      <Modal
        show={props.show}
        fullscreen={props.fullscreen}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        backdropClassName="custom-backdrop modal show"
      >
        <Modal.Dialog>
          <Modal.Header closeButton className={classes.custom_header}>
            {/* <Modal.Title>Modal title</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className={`${classes.custom_body}`}>
            {/* {props.configData ? props.configData.map((configItem, index) => (
                        <div key={index}>
                        {configItem.key === 'home_page_header_video' && (
                            <video className={`${classes.video_bg}`} alt="Group" src={configItem.value} autoPlay muted loop/>
                            )}
                            </div>
                            )): ''} */}
            {props.video && (
              <video
                className={`${classes.video_bg}`}
                alt="Group"
                src={props.video}
                autoPlay
                muted
                loop
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" onClick={props.handleClose}>
             X
            </Button>
            {/* <Button variant="primary">Save changes</Button> */}
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
}
export default ModalVideo;