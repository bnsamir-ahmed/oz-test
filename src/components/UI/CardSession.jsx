import { useEffect, useState } from "react";
import Alarm from "./Icons/Alarm";
import Calunder from "./Icons/Calunder";
import moment from 'moment';

const CardSession = ({ index, session }) => {
    const [keyIndex, setKeyIndex] = useState(index)

    useEffect(() => {
        const formattedNumber = () => {
            if (index >= 1 && index <= 9) {
                setKeyIndex(`0${index}`)
            } else {
                setKeyIndex(index)
            }
        }
        formattedNumber()

    }, [index])

    return (
        <div className="card d-flex  flex-column  justify-content-between card-sessions">

            <div className="d-flex  align-items-center mb-3">
                <div className="count_session">
                    <h5 className="number_session mb-0">{keyIndex}</h5>
                </div>
                <p className="fit_session mb-0 mx-4">{session?.title}</p>
            </div>
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center times_session me_32 mb-0">
                    <Alarm />
                    <span className="ms-2">
                        {Math.ceil(session?.duration / 60)}  MINUTES
                    </span>
                </div>
                <div className="d-flex align-items-center times_session mb-0">
                    <Calunder />
                    <span className="ms-2">
                        {moment(session?.start_from_formatted).format("dddd")}
                    </span>
                </div>
            </div>
        </div>
    )
}
export default CardSession;