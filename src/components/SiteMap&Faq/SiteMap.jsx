import React, { useContext, useEffect, useState} from 'react';
import './sitemap.css'
import site from '../../assets/images/site_map.jpg'
import MainHeaderWrapper from '../UI/MainHeaderWrapper';
import CardSite from '../UI/CardSite';
import Paragraph from '../UI/Paragraph';
import { AuthContext } from '../../apis/context/AuthTokenContext';
import { getAmenitiesGroup } from '../../apis/Booking';
import { getListMembershipTypes } from '../../apis/MembershipApi';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
 
const  SiteMap  = () => {
  
  const [types, setTypes] = useState([]);
  const [bookingPlaces, setBookingPlaces] = useState([]);
  const { token, userId, branchId } = useContext(AuthContext);

    useEffect(()=>{

      getAmenitiesGroup(token, userId, branchId).then(res=>{
          setBookingPlaces(res);
      }).catch(err=>{});

    },[]);

    useEffect(()=>{
      const getMemebershipTypes = async () => {
          try {
              const result = await getListMembershipTypes(token, 'no');
              setTypes(result['individual']);
          }catch (err){console.log(err)}
      }
      getMemebershipTypes();
    },[token]);

    const links = [
        { name: 'Booking', to: '/booking' },
        { name: 'Membership', to: '/membership' },
        { name: 'Private Events', to: '/private' },
        { name: 'Community', to: '/community' },   
        { name: 'Events', to: '/community/events' },

    ];
    const links3 = [
      { name: "Community Newsfeed", to: "/community/newsfeed" },
      { name: "Community Events", to: "/community/events" },
      { name: "Gallery", to: "/community/galleryshow" },
    ];
    const links4 = [
        { name: 'Previous Events', to: '/' },
        { name: 'Upcoming Events', to: '/' },  

    ];
    const links5 = [
      { name: "My Booking", to: "/profile/mybooking" },
      { name: "My Events", to: "/profile/myevents" },
      { name: "My plan", to: "/profile/myplan" },
      { name: "Favorite", to: "/profile/favoiate" },
      { name: "Issue Reporting", to: "/profile/issueReport" },
    ];
    const links6 = [
      { name: "About OZ", to: "/about" },
      { name: "Talent Market", to: "/talentmarket" },
      { name: "Contact Admin", to: "/contactadmin" },
    ];
    const links7 = [
      { name: "Achievements for OZ", to: "/" },
      { name: "News feed", to: "/community/newsfeed" },
      { name: "OZ Amenities", to: "/" },
      { name: "Zee Studio", to: "/" },
      { name: "OZ Knowledge", to: "/" },
      { name: "OZY's", to: "/" },
    ];
 
 return (
   <>
        <div className='position-relative'>
            <MainHeaderWrapper image={site} special_flex={`justify-content-md-center`}>
                    <div className="container text-center">
                        <Paragraph className="text-two">{'site map'}</Paragraph>
                    </div>
            </MainHeaderWrapper>
        </div>
     <div className="container py-4">
       <div className="row">
         <div className="col-xl-3">
           <CardSite title={"Home Page"} links={links} />
           <CardSite title={"Events"} links={links4} />
         </div>
         <div className="col-xl-3">
            <div className='site_card mb-4'>
                <Paragraph className='title_link'>{'Membership'}</Paragraph>
                <ul className='p-0 d-flex flex-column'> 
                  {bookingPlaces && bookingPlaces.map((item, index)=>{
                    return (
                      <HashLink key={index} className='pb-3 links' smooth to={`/booking?amenity=${item.name}&id=${item.id}#${item.name}`}>
                        {item.name}
                      </HashLink>
                    )
                  })}
                </ul>
            </div>
           <CardSite title={"Profile"} links={links5} />
         </div>
         <div className="col-xl-3">
            <div className='site_card mb-4'>
                <Paragraph className='title_link'>{'Membership'}</Paragraph>
                <ul className='p-0 d-flex flex-column'> 
                  {types && types.map((item, index)=>{
                    return (
                      <Link key={index} className='pb-3 links' to={`/membership/${item.id}`}>{item.name}</Link>
                    )
                  })}
                </ul>
            </div>
           <CardSite title={"Explore"} links={links6} />
         </div>
         <div className="col-xl-3">
           <CardSite title={"Community"} links={links3} />
           <CardSite title={"Important links"} links={links7} />
         </div>
       </div>
     </div>
   </>
 );
}

export default SiteMap
