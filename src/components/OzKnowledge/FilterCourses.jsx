import Paragraph from "../UI/Paragraph";
import { Select } from 'antd';

const FilterCourses = ({courses_length}) => {
    return (
        <>
            <section className="container-fluid px-70">
                <div className="row align-items-center justify-content-between">
                    <div className="col-xxl-3 col-md-4 text-sm-start text-center">
                        <Paragraph className='filter_result mb-0'>
                            <span className="count">{courses_length}</span> Results Founds</Paragraph>
                    </div>
                    <div className="col-xxl-5 col-lg-7 col-md-8">
                        <div className="row justify-content-end">
                            <div className="col-6">
                                <div className="form__group field">
                                    <Select
                                            id='user_type'
                                            defaultValue='latest'
                                            className="form__field placeholderSelect"
                                            onChange={(value) => {console.log(value)}}
                                            bordered={false}
                                        >
                                            <Select.Option value={'latest'}>{'Latest'}</Select.Option>
                                            <Select.Option value={'newest'}>{'Newest'}</Select.Option>
                                    </Select>
                                </div>
                            </div>
                            {/* <div className="col-6">     
                                <div className="form__group field">
                                    <Select
                                            id='user_type'
                                            defaultValue='21'
                                            className="form__field placeholderSelect"
                                            onChange={(value) => {console.log(value)}}
                                            bordered={false}
                                        >
                                            <Select.Option value={'21'}>{'21 per page'}</Select.Option>
                                            <Select.Option value={'31'}>{'31 per page'}</Select.Option>
                                    </Select>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

};
export default FilterCourses;