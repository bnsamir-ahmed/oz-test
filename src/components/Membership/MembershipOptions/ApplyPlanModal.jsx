import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../../UI/Paragraph';
import Button from '../../UI/Button';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import {upgradePlan} from '../../../apis/User';
import {Modal as modal} from 'antd';

const ApplyPlanModal = (props) => {

    const [checkedValues, setCheckedValues] = useState([]);
    const [error, setError] = useState(false);
    const { token } = useContext(AuthContext);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setCheckedValues((prevValues) => [...prevValues, value]);
        } else {
          setCheckedValues((prevValues) => prevValues.filter((val) => val !== value));
        }
    };
    
    const upgradeYourPlan = async () => {
        try{
            if(checkedValues.length !== 0){
                setError(false);
                const result = await upgradePlan(token, props.type, checkedValues);
                modal.success({
                    title: result.message,
                    content: result.message,
                    footer: false,
                    centered: true,
                    closable: true,
                    maskClosable: true,
                });
            }else{
                setError(true);
            }
        }catch(error){
            modal.error({
                title: error.response.data.status || "Error",
                content: error.response.data.message || "An Unknown Error Occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
        }
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                keyboard={false}
                backdropClassName="custom-backdrop"
                centered>
                    <Modal.Body className={`justify-content-center align-items-center p-4`}>
                        <div className="selectDate_plan">
                        <Paragraph className="grey-span mb-0">Select Days</Paragraph>
                        {error && <p className='text-danger empty'>Please select days to attend !</p>}
                        <div className='row row-cols-3 align-items-center'>
                            <div className='col d-flex align-items-center justify-content-center p-4'>
                                <input 
                                    className="form-check-input mt-0 me-2" 
                                    type="checkbox" 
                                    value="1" 
                                    id="flexCheckDefault1"
                                    onChange={handleCheckboxChange}
                                    checked={checkedValues.includes('1')} 
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault1">Sat</label>
                            </div>
                            <div className='col d-flex align-items-center justify-content-center p-4'>
                                <input 
                                    className="form-check-input mt-0 me-2" 
                                    type="checkbox" 
                                    value="2" 
                                    id="flexCheckDefault2" 
                                    onChange={handleCheckboxChange}
                                    checked={checkedValues.includes('2')} 
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault2">Sun</label>
                            </div>
                            <div className='col d-flex align-items-center justify-content-center p-4'>
                                <input 
                                    className="form-check-input mt-0 me-2" 
                                    type="checkbox" 
                                    value="3" 
                                    id="flexCheckDefault3"
                                    onChange={handleCheckboxChange}
                                    checked={checkedValues.includes('3')} 
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault3">Mon</label>
                            </div>
                            <div className='col d-flex align-items-center justify-content-center p-4'>
                                <input 
                                    className="form-check-input mt-0 me-2" 
                                    type="checkbox" 
                                    value="4" 
                                    id="flexCheckDefault4"
                                    onChange={handleCheckboxChange}
                                    checked={checkedValues.includes('4')} 
                                 />
                                <label className="form-check-label" htmlFor="flexCheckDefault4">Tue</label>
                            </div>
                            <div className='col d-flex align-items-center justify-content-center p-4'>
                                <input 
                                    className="form-check-input mt-0 me-2" 
                                    type="checkbox" 
                                    value="5" 
                                    id="flexCheckDefault5"
                                    onChange={handleCheckboxChange}
                                    checked={checkedValues.includes('5')} 
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault5">Wed</label>
                            </div>
                            <div className='col d-flex align-items-center justify-content-center p-4'>
                                <input 
                                    className="form-check-input mt-0 me-2" 
                                    type="checkbox" 
                                    value="6" 
                                    id="flexCheckDefault6" 
                                    onChange={handleCheckboxChange}
                                    checked={checkedValues.includes('6')} />
                                <label className="form-check-label" for="flexCheckDefault6">Thu</label>
                            </div>
                            <div className='col d-flex align-items-center justify-content-center p-4'>
                                <input 
                                    className="form-check-input mt-0 me-2" 
                                    type="checkbox" 
                                    value="7" 
                                    id="flexCheckDefault7" 
                                    onChange={handleCheckboxChange}
                                    checked={checkedValues.includes('7')} />
                                <label className="form-check-label" htmlFor="flexCheckDefault7">Fri</label>
                            </div>
                        </div>
                        <div className='text-center'>
                            <Button
                                tagType='link'
                                onClick={upgradeYourPlan}
                                className='btn btn_outline_black w-75 py-2'>Confirm</Button>
                        </div>
                        </div>
                    </Modal.Body>
            </Modal>
        </>
    )

}
export default ApplyPlanModal;