import { useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const InputTags = ({getTags}) => {
    const [tags, setTags] = useState([]);

    const handleChange = (tags) => {
        setTags(tags);
        getTags(tags);
    }

    return (
        <TagsInput value={tags} onChange={handleChange} className="form__field" />
    )
}
export default InputTags;