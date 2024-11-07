import { Badge } from "antd";
import * as DOMPurify from "dompurify";
import Button from "../UI/Button";
import Paragraph from "../UI/Paragraph";
import AddToFavButton from "../UI/AddToFavButton";

const ZeeCard = ({ item }) => {
  return (
    <div className="card my-2 h-100 text-start card_zee">
      {/* {console.log(item?.allow_free)}
      {item?.allow_free === 1 ? (<Badge.Ribbon text="Free" color="gold">
        <AddToFavButton is_favorite={item.is_favorite} id={item.id} add_fav={true} type={'zee_studio'} />

        <img
          src={item.image}
          className="w-100"
          alt={item.title}
          style={{
            height: '352px',
            objectFit: 'cover'
          }}
        />
      </Badge.Ribbon>) : (
        <>
          <AddToFavButton is_favorite={item.is_favorite} id={item.id} add_fav={true} type={'zee_studio'} />

          <img
            src={item.image}
            className="w-100"
            alt={item.title}
            style={{
              height: '352px',
              objectFit: 'cover'
            }}
          />
        </>
      )} */}
       
          <AddToFavButton is_favorite={item.is_favorite} id={item.id} add_fav={true} type={'zee_studio'} />

          <img
            src={item.image}
            className="w-100"
            alt={item.title}
            style={{
              height: '352px',
              objectFit: 'cover'
            }}
          />
       
      <div className="card-body">

        <Paragraph className="card-title mb-2 dynamic_wraper_1">
          {item.title}
        </Paragraph>
        <div
          className="description_black dynamic_wraper"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              item.descriptions
            ),
          }}
        ></div>

        <div className="d-flex justify-content-between align-items-center ">

          <Button
            tagType="link"
            to={`/gymdetails/${item.id}`}
            className="button-outLine btn-bg-white m-auto-unset"
          >
            Explore More
          </Button>
         {item?.allow_free === 1 ?   
          <Paragraph className="card-title">
          free
      </Paragraph>:
          <Paragraph className="card-title">
            {Math.floor(item.price)} Egp
          </Paragraph>
         

         }

        </div>
      </div>
    </div>
  )
}
export default ZeeCard;