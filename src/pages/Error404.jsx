import Button from "../components/UI/Button";

const Error404 = () => {
    return (
        <>
            <div className="full-bg">
                <div className="container h-100">
                    <div className="d-flex align-items-center justify-content-center flex-column h-100">
                        <h1>404</h1>
                        <p>Page Not Found</p>
                        <p className="w-75 mx-auto">we're sorry. the page you requested could no be found Please go back to the home page</p>
                        <Button 
                            tagType='link'
                            to={'/'}
                            className='btn_outline_black auth_btn_padding'>Go Home</Button>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Error404;