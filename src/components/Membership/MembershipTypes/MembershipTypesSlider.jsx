import { useContext } from "react";
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import { getListMembershipTypes } from "../../../apis/MembershipApi";
import MembershipTypesList from "./MembershipTypesList";
import { AuthContext } from "../../../apis/context/AuthTokenContext";
import Paragraph from '../../UI/Paragraph';
import SkeletonCard from "../../UI/SkeletonCard";

const MembershipTypesSlider = ({ currentMemberId }) => {

  const { token } = useContext(AuthContext);

  const { error, data: types, isPending } = useQuery({
    queryKey: ['listMembershipTypes-individual', token],
    queryFn: ({ signal }) => getListMembershipTypes(token, "no", signal)
  });

  const settings = {
    dots: false,
    arrows: true,
    slidesToShow:
      types && types.individual
        ? types.individual.length > 3
          ? 3
          : currentMemberId
            ? types.individual.length - 1
            : types.individual.length
        : 0,
    infinite: true,
    centerMode: true,
    centerPadding: "50px",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow:
            types && types.individual
              ? types.individual.length > 3
                ? 3
                : currentMemberId
                  ? types.individual.length - 1
                  : types.individual.length
              : 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 2,
        settings: "unslick",
      },
    ],
  }

  return (
    <>
      {isPending ? (
        <div className='row'>
          {[1, 2, 3].map((n, index) => {
            return (
              <div className="col-4 px-2" key={index}>
                <SkeletonCard />
              </div>
            )
          })}
        </div>
      ) :
        (
          <Slider {...settings} className="individual_slider mb-4">
            {types &&
              types['individual']?.map((listMembershipType) => {
                const { id, name, logo, link, description } = listMembershipType;
                if (currentMemberId !== id) {
                  return (
                    <div className="col-4 px-2" key={id}>
                      <MembershipTypesList
                        className={"t-center-sm"}
                        id={id}
                        name={name}
                        logo={logo}
                        link={link}
                        description={description}
                        image={logo}
                      />
                    </div>
                  )
                }
              })}
          </Slider>
        )}
      {error && <Paragraph className='empty my-5'>there is no membership type to display</Paragraph>}
    </>
  );
};
export default MembershipTypesSlider;
