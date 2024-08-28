import ProfileHeader from "../components/Profile/ProfileHeader/ProfileHeader";
import ProfileTabs from "../components/Profile/ProfileTabs/ProfileTabs";
import {DisableProvider} from '../apis/context/DisableStateContext';

const Profile = () => {
    
    return (
        <>
            <DisableProvider >
                <ProfileHeader />
                <ProfileTabs />
            </DisableProvider>
        </>
    );
};

export default Profile;
