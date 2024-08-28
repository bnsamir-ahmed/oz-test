import MainHeaderWrapper from '../UI/MainHeaderWrapper';
import Paragraph from '../UI/Paragraph';
import bg from '../../assets/images/offices/office2.png';

const AmenitiesHeader = () => {
    return (
        <>
            <div className='position-relative'>
                <MainHeaderWrapper image={bg} special_flex={`justify-content-center`}>
                    <div className="container text-center">
                        <Paragraph className="text-two w-75 mx-auto">Where luxury <br/>meets comfort and convenience.</Paragraph>
                    </div>
                </MainHeaderWrapper>
            </div>
        </>
    )
};
export default AmenitiesHeader;