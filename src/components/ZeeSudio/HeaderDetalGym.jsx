import AddToFavButton from "../UI/AddToFavButton";
import MainHeaderWrapper from "../UI/MainHeaderWrapper";
import Paragraph from "../UI/Paragraph";
import { Skeleton } from "antd";

const HeaderDetalGym = ({ details, pending }) => {

  return (
    <>
      <div className='position-relative'>
        <AddToFavButton
          is_favorite={details?.is_favorite}
          id={details?.id}
          add_fav={true}
          type='zee_studio'
        />
        <MainHeaderWrapper image={details?.image} height="534px">
          <div className={`container-fluid px-70 py-5`}>
            <div className="col-md-6 col-12 ">
              {pending ? (
                <Skeleton active title={true} paragraph={{ rows: 3 }} />
              ) : (
                <>
                  <Paragraph className="head_paragraph mb-3">
                    {details?.title}
                  </Paragraph>
                  <Paragraph className="description mb-0">
                    {details?.descriptions}
                  </Paragraph>
                </>
              )}
            </div>
          </div>
        </MainHeaderWrapper>
      </div>
    </>
  );
};

export default HeaderDetalGym;
