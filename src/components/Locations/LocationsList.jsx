import './Locations.css';
import mapPoint from '../../assets/images/icons/mapPoint.svg';

const LocationsList = ({address, img, addAddress}) => {
    return (
        <>
            <div className="img_block">
                <img
                    type="img" 
                    src={img} 
                    className="w-100 image-box"
                    alt={address} />
                    {addAddress && (
                        <div className="d-flex align-items-center box-locations justify-content-end">
                            <img
                                src={mapPoint} 
                                className="map-point" 
                                style={{width: "24px", height: "24px"}}
                                alt="map"/>
                            <h4 className='map-address mb-0 mx-2'>
                                {address}
                            </h4>
                            <a className="location-slider " href={`https://www.google.com/maps/dir/${address}`} target='_blank'>git direction</a>
                        </div>
                    )}
            </div>
        </>
    );
};

export default LocationsList;
