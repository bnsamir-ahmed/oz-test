import Paragraph from "./Paragraph";
import Button from "./Button";

const MonoBlockBlack = (props) => {
    return (
        <>
            <section className={`monoBlock bgBlack p-5`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="content-block text-center">
                                <Paragraph className='white_monoBlock_title'>THE RIGHT PLACE FOR THE RIGHT BEGGININGS</Paragraph>
                                <Paragraph className='monoBlock_description'>Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod </Paragraph>
                            </div>
                            <div className="buttons d-lg-flex d-md-flex d-sm-block my-3 justify-content-center align-items-center text-center">
                                <Button 
                                    tagType = 'link' 
                                    to={'/membership'}
                                    className={`button-outLine`}>
                                    Become a Member
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
export default MonoBlockBlack;