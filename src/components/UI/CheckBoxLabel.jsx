import { Checkbox } from 'antd';

const CheckBoxLabel = ({label, key, value}) => {

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    return (
        <>
            <Checkbox onChange={onChange} key={key} value={value}>{label}</Checkbox>
        </>
    )
};
export default CheckBoxLabel;