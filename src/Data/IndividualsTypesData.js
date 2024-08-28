import wifi from '../assets/images/wifi.svg';
import parking from '../assets/images/parking.svg';
import IT from '../assets/images/IT.svg';
import Security from '../assets/images/Security.svg';
import Catering from '../assets/images/Catering.svg';
import premium from '../assets/images/premium  location.svg';
import Access from '../assets/images/Access QR.svg';
import Recreational from '../assets/images/Recreational Zones.svg';
import Business from '../assets/images/Business Center.svg';
import Community from '../assets/images/Community.svg';
import Audio from '../assets/images/audio video display (1).svg';
import Aesthetic from '../assets/images/aesthetic design (1).svg';

// 
import wifi_white from '../assets/images/white/wifi (1).svg';
import parking_white from '../assets/images/white/parking (1).svg';
import IT_white from '../assets/images/white/IT (1).svg';
import Security_white from '../assets/images/white/Security (1).svg';
import Catering_white from '../assets/images/white/Catering (1).svg';
import premium_white from '../assets/images/white/premium  location (1).svg';
import Access_white from '../assets/images/white/Access QR (1).svg';
import Recreational_white from '../assets/images/white/Recreational Zones (1).svg';
import Business_white from '../assets/images/white/Business Center (1).svg';
import Community_white from '../assets/images/white/Community (1).svg';
import Audio_white from '../assets/images/white/audio video display.svg';
import Aesthetic_white from '../assets/images/white/aesthetic design.svg';
import Dedicated_white from '../assets/images/white/Dedicated Community Team.svg';
import Ergonomic_white from '../assets/images/white/Armchair 2.svg';
import Administrative_white from '../assets/images/white/Administrative Support.svg';
import Private_white from '../assets/images/white/Private studios.svg';
import Cleaning_white from '../assets/images/white/Cleaning.svg';
import ZStudio_white from '../assets/images/white/z studio & The Bodyhack.svg';
import Meeting_white from '../assets/images/white/Meeting rooms.svg';
import Innovation_white from '../assets/images/white/Innovation Capsule.svg';
import Classrooms_white from '../assets/images/white/Classrooms.svg';
import OZYi_white from '../assets/images/white/OZY’s Deli.svg';
import Auditorium_white from '../assets/images/white/Auditorium.svg';
import Communal_white from '../assets/images/white/communal areas.svg';
import MultiArea_white from '../assets/images/white/Multi-Purpose Area.svg';
import Outdoor_white from '../assets/images/white/Outdoor Space.svg';
import Rooftop_white from '../assets/images/white/Frame (5).svg';
import member_1 from '../assets/images/membership/image 5.png';
import member_2 from '../assets/images/membership/image 5 (1).png';
import member_3 from '../assets/images/membership/image 5 (2).png';
import member_4 from '../assets/images/membership/image 5 (3).png';
import theSocial_image from '../assets/images/membership/Rectangle.png';
import image_bg from '../assets/images/Rectangle (1).png';


export const MembershipIndividualsTypes = [
    {
        id: 1,
        name: 'THE SOCIAL',
        link: 'Find out more',
        image: member_1,
        description:"Welcome to our vibrant community, where social, outgoing, and communicative individuals thrive!"
    },
    {
        id: 1,
        name: 'THE NATIVE',
        link: 'Find out more',
        image: member_2,
        description:"Elevate your work experience with our tailored membership, offering dedicated desks in a vibrant shared workspace"
    },
    {
        id: 1,
        name: 'THE STUDIO',
        link: 'Find out more',
        image: member_3,
        description:"designed for dynamic professionals who value privacy and thrive on networking opportunities."
    },
    {
        id: 4,
        name: 'VIRTUAL',
        link: 'Find out more',
        image: member_4,
        description:"The Studio membership: Where privacy meets professionalism, and community fuels productivity"
    } 			
]
export const IndividualTypesList = [
    {
        id: 1,
        type: 'Individual',
        title: 'The Social',
        head_description: 'Welcome to our vibrant community, where social, outgoing, and communicative individuals thrive!',
        description: "Craving flexibility? Social membership is designed to offer individuals with the flexibility they crave in how they live, work, connect, and gather. It's the ideal solution for freelancers and those seeking to break free from the confines of traditional workspaces. By joining our community, they gain access to a huge network of like-minded individuals, fostering growth and collaboration. At OZ, we invite you all members to enjoy access to all communal and social spaces, may book conference rooms, and are invited to join our cultural programming events.0",
        options: [
            {
                id: 1,
                name: 'Limited 8',
                limit: '2',
                Benefits: [
                    {
                        id: 1,
                        name: "Access to all OZ's Co-fitness classes and packages",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 2,
                        name: "Access to all OZ Community Events",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 3,
                        name: "Access to reserve private, beautifully designed spaces for team meetings",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 4,
                        name: "Become a part of an inspiring community of like-minded creators, innovators and thinkers",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 5,
                        name: "Accessibility to book all of OZ's spaces",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 6,
                        name: "Access to Private Desk",
                        access: false,
                        value: 'NO'
                    },
                    {
                        id: 7,
                        name: "Access to Communal Areas",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 8,
                        name: "Access to Private Office",
                        access: false,
                        value: 'NO'
                    },
                    {
                        id: 9,
                        name: "Access to First or Seconds floors",
                        access: false,
                        value: 'NO'
                    },
                    {
                        id: 10,
                        name: "Access OZ's co-fitness zone",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 11,
                        name: "Enjoy access to OZY's F&B services ",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 12,
                        name: "Enjoy access to OZ's ready-to-use amenities communal kitchen, phone booths, library, etc.",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 13,
                        name: "Enjoy working from a private member only community",
                        access: true,
                        value: 'YES'
                    }

                ],
                Amenties: [
                    {
                        id: 1,
                        name: 'High Speed WIFI',
                        icon: wifi,
                        key: 'WIFI'
                    },
                    {
                        id: 2,
                        name: 'Security',
                        icon: Security,
                        key: 'Security'
                    },
                    {
                        id: 3,
                        name: 'Parking',
                        icon: parking,
                        key: 'Parking'
                    },
                    {
                        id: 4,
                        name: 'Community App',
                        icon: Community,
                        key: 'Community App'
                    },
                    {
                        id: 5,
                        name: 'Business Center',
                        icon: Business,
                        key: 'Business Center'
                    },
                    {
                        id: 6,
                        name: 'Reliable IT Infrastructure',
                        icon: IT,
                        key: 'IT Infrastructure'
                    },
                    {
                        id: 7,
                        name: 'Catering Services',
                        icon: Catering,
                        key: 'Services'
                    },
                    {
                        id: 8,
                        name: 'Access by QR Codes',
                        icon: Access,
                        key: 'QR Codes'
                    },
                    {
                        id: 9,
                        name: 'Premium Location in the heart of Sheikh Zayed',
                        icon: premium,
                        key: 'Premium Location'
                    },
                    {
                        id: 10,
                        name: 'Audio Video display options',
                        icon: '',
                        key: 'Audio Video display options'
                    },
                    {
                        id: 11,
                        name: 'Aesthetic Design',
                        icon: '',
                        key: 'Aesthetic Design'
                    },
                    {
                        id: 12,
                        name: 'Dedicated Community Team',
                        icon: '',
                        key: 'Dedicated Community Team'
                    },
                    {
                        id: 13,
                        name: 'Ergonomic Furniture',
                        icon: '',
                        key: 'Ergonomic Furniture'
                    },
                    {
                        id: 14,
                        name: 'Administrative Support',
                        icon: '',
                        key: 'Administrative Support'
                    },
                    {
                        id: 15,
                        name: 'Private studios, desks, and communal areas',
                        icon: '',
                        key: 'Private studios'
                    },
                    {
                        id: 16,
                        name: 'Cleaning & Maintenance',
                        icon: '',
                        key: 'Cleaning & Maintenance'
                    },
                    {
                        id: 17,
                        name: 'Z Studio by OZ & The Bodyhack',
                        icon: '',
                        key: 'Z Studio by OZ & The Bodyhack'
                    },
                    {
                        id: 18,
                        name: 'Recreational Zones',
                        icon: Recreational,
                        key: 'Recreational Zones'
                    },
                    {
                        id: 19,
                        name: 'Meeting rooms',
                        icon: '',
                        key: 'Meeting rooms'
                    },
                    {
                        id: 20,
                        name: 'Innovation Capsule',
                        icon: '',
                        key: 'Innovation Capsule'
                    },
                    {
                        id: 21,
                        name: 'Classrooms',
                        icon: '',
                        key: 'Classrooms'
                    },
                    {
                        id: 22,
                        name: 'OZY\'s Deli: A Glocal Gastronomic Goodness',
                        icon: '',
                        key: 'OZY\'s Deli'
                    },
                    {
                        id: 23,
                        name: 'Auditorium',
                        icon: '',
                        key: 'Auditorium'
                    },
                    {
                        id: 24,
                        name: 'Communal Kitchen',
                        icon: '',
                        key: 'Communal Kitchen'
                    },
                    {
                        id: 25,
                        name: 'Multi-Purpose Area',
                        icon: '',
                        key: 'Multi-Purpose Area'
                    },
                    {
                        id: 26,
                        name: 'Outdoor Space',
                        icon: '',
                        key: 'Outdoor Space'
                    },
                    {
                        id: 27,
                        name: 'Rooftop',
                        icon: '',
                        key: 'Rooftop'
                    }
                ],
                link: 'Explore More',
                discount: '5% Discount',
                image: theSocial_image
            },
            {
                id: 2,
                name: 'Limited 12',
                limit: '3',
                Benefits: [
                    {
                        id: 1,
                        name: "Access to all OZ's Co-fitness classes and packages",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 2,
                        name: "Access to all OZ Community Events",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 3,
                        name: "Access to reserve private, beautifully designed spaces for team meetings",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 4,
                        name: "Become a part of an inspiring community of like-minded creators, innovators and thinkers",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 5,
                        name: "Accessibility to book all of OZ's spaces",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 6,
                        name: "Access to Private Desk",
                        access: false,
                        value: 'NO'
                    },
                    {
                        id: 7,
                        name: "Access to Communal Areas",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 8,
                        name: "Access to Private Office",
                        access: false,
                        value: 'NO'
                    },
                    {
                        id: 9,
                        name: "Access to First or Seconds floors",
                        access: false,
                        value: 'NO'
                    },
                    {
                        id: 10,
                        name: "Access OZ's co-fitness zone",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 11,
                        name: "Enjoy access to OZY's F&B services ",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 12,
                        name: "Enjoy access to OZ's ready-to-use amenities communal kitchen, phone booths, library, etc.",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 13,
                        name: "Enjoy working from a private member only community",
                        access: true,
                        value: 'YES'
                    }

                ],
                Amenties: [
                    {
                        id: 1,
                        name: 'High Speed WIFI',
                        icon: wifi,
                        key: 'WIFI'
                    },
                    {
                        id: 2,
                        name: 'Security',
                        icon: Security,
                        key: 'Security'
                    },
                    {
                        id: 3,
                        name: 'Parking',
                        icon: parking,
                        key: 'Parking'
                    },
                    {
                        id: 4,
                        name: 'Community App',
                        icon: Community,
                        key: 'Community App'
                    },
                    {
                        id: 5,
                        name: 'Business Center',
                        icon: Business,
                        key: 'Business Center'
                    },
                    {
                        id: 6,
                        name: 'Reliable IT Infrastructure',
                        icon: IT,
                        key: 'IT Infrastructure'
                    },
                    {
                        id: 7,
                        name: 'Catering Services',
                        icon: Catering,
                        key: 'Services'
                    },
                    {
                        id: 8,
                        name: 'Access by QR Codes',
                        icon: Access,
                        key: 'QR Codes'
                    },
                    {
                        id: 9,
                        name: 'Premium Location in the heart of Sheikh Zayed',
                        icon: premium,
                        key: 'Premium Location'
                    },
                    {
                        id: 10,
                        name: 'Audio Video display options',
                        icon: '',
                        key: 'Audio Video display options'
                    },
                    {
                        id: 11,
                        name: 'Aesthetic Design',
                        icon: '',
                        key: 'Aesthetic Design'
                    },
                    {
                        id: 12,
                        name: 'Dedicated Community Team',
                        icon: '',
                        key: 'Dedicated Community Team'
                    },
                    {
                        id: 13,
                        name: 'Ergonomic Furniture',
                        icon: '',
                        key: 'Ergonomic Furniture'
                    },
                    {
                        id: 14,
                        name: 'Administrative Support',
                        icon: '',
                        key: 'Administrative Support'
                    },
                    {
                        id: 15,
                        name: 'Private studios, desks, and communal areas',
                        icon: '',
                        key: 'Private studios'
                    },
                    {
                        id: 16,
                        name: 'Cleaning & Maintenance',
                        icon: '',
                        key: 'Cleaning & Maintenance'
                    },
                    {
                        id: 17,
                        name: 'Z Studio by OZ & The Bodyhack',
                        icon: '',
                        key: 'Z Studio by OZ & The Bodyhack'
                    },
                    {
                        id: 18,
                        name: 'Recreational Zones',
                        icon: Recreational,
                        key: 'Recreational Zones'
                    },
                    {
                        id: 19,
                        name: 'Meeting rooms',
                        icon: '',
                        key: 'Meeting rooms'
                    },
                    {
                        id: 20,
                        name: 'Innovation Capsule',
                        icon: '',
                        key: 'Innovation Capsule'
                    },
                    {
                        id: 21,
                        name: 'Classrooms',
                        icon: '',
                        key: 'Classrooms'
                    },
                    {
                        id: 22,
                        name: 'OZY\'s Deli: A Glocal Gastronomic Goodness',
                        icon: '',
                        key: 'OZY\'s Deli'
                    },
                    {
                        id: 23,
                        name: 'Auditorium',
                        icon: '',
                        key: 'Auditorium'
                    },
                    {
                        id: 24,
                        name: 'Communal Kitchen',
                        icon: '',
                        key: 'Communal Kitchen'
                    },
                    {
                        id: 25,
                        name: 'Multi-Purpose Area',
                        icon: '',
                        key: 'Multi-Purpose Area'
                    },
                    {
                        id: 26,
                        name: 'Outdoor Space',
                        icon: '',
                        key: 'Outdoor Space'
                    },
                    {
                        id: 27,
                        name: 'Rooftop',
                        icon: '',
                        key: 'Rooftop'
                    }
                ],
                link: 'Explore More',
                discount: '10% Discount',
                image: theSocial_image

            },
            {
                id: 3,
                name: 'UnLimited',
                limit: '7',
                Benefits: [
                    {
                        id: 1,
                        name: "Access to all OZ's Co-fitness classes and packages",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 2,
                        name: "Access to all OZ Community Events",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 3,
                        name: "Access to reserve private, beautifully designed spaces for team meetings",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 4,
                        name: "Become a part of an inspiring community of like-minded creators, innovators and thinkers",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 5,
                        name: "Accessibility to book all of OZ's spaces",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 6,
                        name: "Access to Private Desk",
                        access: false,
                        value: 'NO'
                    },
                    {
                        id: 7,
                        name: "Access to Communal Areas",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 8,
                        name: "Access to Private Office",
                        access: false,
                        value: 'NO'
                    },
                    {
                        id: 9,
                        name: "Access to First or Seconds floors",
                        access: false,
                        value: 'NO'
                    },
                    {
                        id: 10,
                        name: "Access OZ's co-fitness zone",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 11,
                        name: "Enjoy access to OZY's F&B services ",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 12,
                        name: "Enjoy access to OZ's ready-to-use amenities communal kitchen, phone booths, library, etc.",
                        access: true,
                        value: 'YES'
                    },
                    {
                        id: 13,
                        name: "Enjoy working from a private member only community",
                        access: true,
                        value: 'YES'
                    }

                ],
                Amenties: [
                    {
                        id: 1,
                        name: 'High Speed WIFI',
                        icon: wifi,
                        key: 'WIFI'
                    },
                    {
                        id: 2,
                        name: 'Security',
                        icon: Security,
                        key: 'Security'
                    },
                    {
                        id: 3,
                        name: 'Parking',
                        icon: parking,
                        key: 'Parking'
                    },
                    {
                        id: 4,
                        name: 'Community App',
                        icon: Community,
                        key: 'Community App'
                    },
                    {
                        id: 5,
                        name: 'Business Center',
                        icon: Business,
                        key: 'Business Center'
                    },
                    {
                        id: 6,
                        name: 'Reliable IT Infrastructure',
                        icon: IT,
                        key: 'IT Infrastructure'
                    },
                    {
                        id: 7,
                        name: 'Catering Services',
                        icon: Catering,
                        key: 'Services'
                    },
                    {
                        id: 8,
                        name: 'Access by QR Codes',
                        icon: Access,
                        key: 'QR Codes'
                    },
                    {
                        id: 9,
                        name: 'Premium Location in the heart of Sheikh Zayed',
                        icon: premium,
                        key: 'Premium Location'
                    },
                    {
                        id: 10,
                        name: 'Audio Video display options',
                        icon: '',
                        key: 'Audio Video display options'
                    },
                    {
                        id: 11,
                        name: 'Aesthetic Design',
                        icon: '',
                        key: 'Aesthetic Design'
                    },
                    {
                        id: 12,
                        name: 'Dedicated Community Team',
                        icon: '',
                        key: 'Dedicated Community Team'
                    },
                    {
                        id: 13,
                        name: 'Ergonomic Furniture',
                        icon: '',
                        key: 'Ergonomic Furniture'
                    },
                    {
                        id: 14,
                        name: 'Administrative Support',
                        icon: '',
                        key: 'Administrative Support'
                    },
                    {
                        id: 15,
                        name: 'Private studios, desks, and communal areas',
                        icon: '',
                        key: 'Private studios'
                    },
                    {
                        id: 16,
                        name: 'Cleaning & Maintenance',
                        icon: '',
                        key: 'Cleaning & Maintenance'
                    },
                    {
                        id: 17,
                        name: 'Z Studio by OZ & The Bodyhack',
                        icon: '',
                        key: 'Z Studio by OZ & The Bodyhack'
                    },
                    {
                        id: 18,
                        name: 'Recreational Zones',
                        icon: Recreational,
                        key: 'Recreational Zones'
                    },
                    {
                        id: 19,
                        name: 'Meeting rooms',
                        icon: '',
                        key: 'Meeting rooms'
                    },
                    {
                        id: 20,
                        name: 'Innovation Capsule',
                        icon: '',
                        key: 'Innovation Capsule'
                    },
                    {
                        id: 21,
                        name: 'Classrooms',
                        icon: '',
                        key: 'Classrooms'
                    },
                    {
                        id: 22,
                        name: 'OZY\'s Deli: A Glocal Gastronomic Goodness',
                        icon: '',
                        key: 'OZY\'s Deli'
                    },
                    {
                        id: 23,
                        name: 'Auditorium',
                        icon: '',
                        key: 'Auditorium'
                    },
                    {
                        id: 24,
                        name: 'Communal Kitchen',
                        icon: '',
                        key: 'Communal Kitchen'
                    },
                    {
                        id: 25,
                        name: 'Multi-Purpose Area',
                        icon: '',
                        key: 'Multi-Purpose Area'
                    },
                    {
                        id: 26,
                        name: 'Outdoor Space',
                        icon: '',
                        key: 'Outdoor Space'
                    },
                    {
                        id: 27,
                        name: 'Rooftop',
                        icon: '',
                        key: 'Rooftop'
                    }
                ],
                link: 'Explore More',
                discount: '15% Discount',
                image: theSocial_image

            }
        ],
        image: theSocial_image
    }
];
export const IndividualSocialTypes = [
    {
        id: '1',
        name: 'Limited 8',
        limit: '2',
        image: image_bg ,
        Benefits: [
            {
                id: 1,
                name: "Access to all OZ's Co-fitness classes and packages",
                access: true,
                value: 'YES'
            },
            {
                id: 2,
                name: "Access to all OZ Community Events",
                access: true,
                value: 'YES'
            },
            {
                id: 3,
                name: "Access to reserve private, beautifully designed spaces for team meetings",
                access: true,
                value: 'YES'
            },
            {
                id: 4,
                name: "Become a part of an inspiring community of like-minded creators, innovators and thinkers",
                access: true,
                value: 'YES'
            },
            {
                id: 5,
                name: "Accessibility to book all of OZ's spaces",
                access: true,
                value: 'YES'
            },
            {
                id: 6,
                name: "Access to Private Desk",
                access: false,
                value: 'NO'
            },
            {
                id: 7,
                name: "Access to Communal Areas",
                access: true,
                value: 'YES'
            },
            {
                id: 8,
                name: "Access to Private Office",
                access: false,
                value: 'NO'
            },
            {
                id: 9,
                name: "Access to First or Seconds floors",
                access: false,
                value: 'NO'
            },
            {
                id: 10,
                name: "Access OZ's co-fitness zone",
                access: true,
                value: 'YES'
            },
            {
                id: 11,
                name: "Enjoy access to OZY's F&B services ",
                access: true,
                value: 'YES'
            },
            {
                id: 12,
                name: "Enjoy access to OZ's ready-to-use amenities communal kitchen, phone booths, library, etc.",
                access: true,
                value: 'YES'
            },
            {
                id: 13,
                name: "Enjoy working from a private member only community",
                access: true,
                value: 'YES'
            }

        ],
        Amenties: [
            {
                id: 1,
                name: 'High Speed WIFI',
                icon: wifi,
                icon_white: wifi_white,
                key: 'WIFI'
            },
            {
                id: 2,
                name: 'Security',
                icon: Security,
                icon_white: Security_white,
                key: 'Security'
            },
            {
                id: 3,
                name: 'Parking',
                icon: parking,
                icon_white: parking_white,
                key: 'Parking'
            },
            {
                id: 4,
                name: 'Community App',
                icon: Community,
                icon_white: Community_white,
                key: 'Community App'
            },
            {
                id: 5,
                name: 'Business Center',
                icon: Business,
                icon_white: Business_white,
                key: 'Business Center'
            },
            {
                id: 6,
                name: 'Reliable IT Infrastructure',
                icon: IT,
                icon_white: IT_white,
                key: 'IT Infrastructure'
            },
            {
                id: 7,
                name: 'Catering Services',
                icon: Catering,
                icon_white: Catering_white,
                key: 'Services'
            },
            {
                id: 8,
                name: 'Access by QR Codes',
                icon: Access,
                icon_white: Access_white,
                key: 'QR Codes'
            },
            {
                id: 9,
                name: 'Premium Location in the heart of Sheikh Zayed',
                icon: premium,
                icon_white: premium_white,
                key: 'Premium Location'
            },
            {
                id: 10,
                name: 'Audio Video display options',
                icon: Audio,
                icon_white: Audio_white,
                key: 'Audio Video display options'
            },
            {
                id: 11,
                name: 'Aesthetic Design',
                icon: Aesthetic,
                icon_white: Aesthetic_white,
                key: 'Aesthetic Design'
            },
            {
                id: 12,
                name: 'Dedicated Community Team',
                icon: '',
                icon_white: Dedicated_white,
                key: 'Dedicated Community Team'
            },
            {
                id: 13,
                name: 'Ergonomic Furniture',
                icon: '',
                icon_white: Ergonomic_white,
                key: 'Ergonomic Furniture'
            },
            {
                id: 14,
                name: 'Administrative Support',
                icon: '',
                icon_white: Administrative_white,
                key: 'Administrative Support'
            },
            {
                id: 15,
                name: 'Private studios, desks, and communal areas',
                icon: '',
                icon_white: Private_white,
                key: 'Private studios'
            },
            {
                id: 16,
                name: 'Cleaning & Maintenance',
                icon: '',
                icon_white: Cleaning_white,
                key: 'Cleaning & Maintenance'
            },
            {
                id: 17,
                name: 'Z Studio by OZ & The Bodyhack',
                icon: '',
                icon_white: ZStudio_white,
                key: 'Z Studio by OZ & The Bodyhack'
            },
            {
                id: 18,
                name: 'Recreational Zones',
                icon: Recreational,
                icon_white: Recreational_white,
                key: 'Recreational Zones'
            },
            {
                id: 19,
                name: 'Meeting rooms',
                icon: '',
                icon_white: Meeting_white,
                key: 'Meeting rooms'
            },
            {
                id: 20,
                name: 'Innovation Capsule',
                icon: '',
                icon_white: Innovation_white,
                key: 'Innovation Capsule'
            },
            {
                id: 21,
                name: 'Classrooms',
                icon: '',
                icon_white: Classrooms_white,
                key: 'Classrooms'
            },
            // {
            //     id: 22,
            //     name: 'OZY\'s Deli: A Glocal Gastronomic Goodness',
            //     icon: OZYi_white,
            //     icon_white: OZYi_white,
            //     key: 'OZY\'s Deli'
            // },
            {
                id: 23,
                name: 'Auditorium',
                icon: '',
                icon_white: Auditorium_white,
                key: 'Auditorium'
            },
            {
                id: 24,
                name: 'Communal Kitchen',
                icon: '',
                icon_white: Communal_white,
                key: 'Communal Kitchen'
            },
            {
                id: 25,
                name: 'Multi-Purpose Area',
                icon: '',
                icon_white: MultiArea_white,
                key: 'Multi-Purpose Area'
            },
            {
                id: 26,
                name: 'Outdoor Space',
                icon: '',
                icon_white: Outdoor_white,
                key: 'Outdoor Space'
            },
            {
                id: 27,
                name: 'Rooftop',
                icon: '',
                icon_white: Rooftop_white,
                key: 'Rooftop'
            }
        ],
        link: 'Explore More',
        discount: '5% Discount',
        description: 'Craving flexibility? Social membership is designed to offer individuals with the flexibility they crave in how they live, work, connect, and gather. It\'s the ideal solution for freelancers and those seeking to break free from the confines of traditional workspaces. By joining our community, they gain access to a huge network of like-minded individuals, fostering growth and collaboration. At OZ, we invite you all members to enjoy access to all communal and social spaces, may book conference rooms, and are invited to join our cultural programming events.'
    },
    {
        id: '2',
        name: 'Limited 12',
        limit: '3',
        image: image_bg,
        Benefits: [
            {
                id: 1,
                name: "Access to all OZ's Co-fitness classes and packages",
                access: true,
                value: 'YES'
            },
            {
                id: 2,
                name: "Access to all OZ Community Events",
                access: true,
                value: 'YES'
            },
            {
                id: 3,
                name: "Access to reserve private, beautifully designed spaces for team meetings",
                access: true,
                value: 'YES'
            },
            {
                id: 4,
                name: "Become a part of an inspiring community of like-minded creators, innovators and thinkers",
                access: true,
                value: 'YES'
            },
            {
                id: 5,
                name: "Accessibility to book all of OZ's spaces",
                access: true,
                value: 'YES'
            },
            {
                id: 6,
                name: "Access to Private Desk",
                access: false,
                value: 'NO'
            },
            {
                id: 7,
                name: "Access to Communal Areas",
                access: true,
                value: 'YES'
            },
            {
                id: 8,
                name: "Access to Private Office",
                access: false,
                value: 'NO'
            },
            {
                id: 9,
                name: "Access to First or Seconds floors",
                access: false,
                value: 'NO'
            },
            {
                id: 10,
                name: "Access OZ's co-fitness zone",
                access: true,
                value: 'YES'
            },
            {
                id: 11,
                name: "Enjoy access to OZY's F&B services ",
                access: true,
                value: 'YES'
            },
            {
                id: 12,
                name: "Enjoy access to OZ's ready-to-use amenities communal kitchen, phone booths, library, etc.",
                access: true,
                value: 'YES'
            },
            {
                id: 13,
                name: "Enjoy working from a private member only community",
                access: true,
                value: 'YES'
            }

        ],
        Amenties: [
            {
                id: 1,
                name: 'High Speed WIFI',
                icon: wifi,
                icon_white: wifi_white,
                key: 'WIFI'
            },
            {
                id: 2,
                name: 'Security',
                icon: Security,
                icon_white: Security_white,
                key: 'Security'
            },
            {
                id: 3,
                name: 'Parking',
                icon: parking,
                icon_white: parking_white,
                key: 'Parking'
            },
            {
                id: 4,
                name: 'Community App',
                icon: Community,
                icon_white: Community_white,
                key: 'Community App'
            },
            {
                id: 5,
                name: 'Business Center',
                icon: Business,
                icon_white: Business_white,
                key: 'Business Center'
            },
            {
                id: 6,
                name: 'Reliable IT Infrastructure',
                icon: IT,
                icon_white: IT_white,
                key: 'IT Infrastructure'
            },
            {
                id: 7,
                name: 'Catering Services',
                icon: Catering,
                icon_white: Catering_white,
                key: 'Services'
            },
            {
                id: 8,
                name: 'Access by QR Codes',
                icon: Access,
                icon_white: Access_white,
                key: 'QR Codes'
            },
            {
                id: 9,
                name: 'Premium Location in the heart of Sheikh Zayed',
                icon: premium,
                icon_white: premium_white,
                key: 'Premium Location'
            },
            {
                id: 10,
                name: 'Audio Video display options',
                icon: Audio,
                icon_white: Audio_white,
                key: 'Audio Video display options'
            },
            {
                id: 11,
                name: 'Aesthetic Design',
                icon: Aesthetic,
                icon_white: Aesthetic_white,
                key: 'Aesthetic Design'
            },
            {
                id: 12,
                name: 'Dedicated Community Team',
                icon: '',
                icon_white: Dedicated_white,
                key: 'Dedicated Community Team'
            },
            {
                id: 13,
                name: 'Ergonomic Furniture',
                icon: '',
                icon_white: Ergonomic_white,
                key: 'Ergonomic Furniture'
            },
            {
                id: 14,
                name: 'Administrative Support',
                icon: '',
                icon_white: Administrative_white,
                key: 'Administrative Support'
            },
            {
                id: 15,
                name: 'Private studios, desks, and communal areas',
                icon: '',
                icon_white: Private_white,
                key: 'Private studios'
            },
            {
                id: 16,
                name: 'Cleaning & Maintenance',
                icon: '',
                icon_white: Cleaning_white,
                key: 'Cleaning & Maintenance'
            },
            {
                id: 17,
                name: 'Z Studio by OZ & The Bodyhack',
                icon: '',
                icon_white: ZStudio_white,
                key: 'Z Studio by OZ & The Bodyhack'
            },
            {
                id: 18,
                name: 'Recreational Zones',
                icon: Recreational,
                icon_white: Recreational_white,
                key: 'Recreational Zones'
            },
            {
                id: 19,
                name: 'Meeting rooms',
                icon: '',
                icon_white: Meeting_white,
                key: 'Meeting rooms'
            },
            {
                id: 20,
                name: 'Innovation Capsule',
                icon: '',
                icon_white: Innovation_white,
                key: 'Innovation Capsule'
            },
            {
                id: 21,
                name: 'Classrooms',
                icon: '',
                icon_white: Classrooms_white,
                key: 'Classrooms'
            },
            // {
            //     id: 22,
            //     name: 'OZY\'s Deli: A Glocal Gastronomic Goodness',
            //     icon: OZYi_white,
            //     icon_white: OZYi_white,
            //     key: 'OZY\'s Deli'
            // },
            {
                id: 23,
                name: 'Auditorium',
                icon: '',
                icon_white: Auditorium_white,
                key: 'Auditorium'
            },
            {
                id: 24,
                name: 'Communal Kitchen',
                icon: '',
                icon_white: Communal_white,
                key: 'Communal Kitchen'
            },
            {
                id: 25,
                name: 'Multi-Purpose Area',
                icon: '',
                icon_white: MultiArea_white,
                key: 'Multi-Purpose Area'
            },
            {
                id: 26,
                name: 'Outdoor Space',
                icon: '',
                icon_white: Outdoor_white,
                key: 'Outdoor Space'
            },
            {
                id: 27,
                name: 'Rooftop',
                icon: '',
                icon_white: Rooftop_white,
                key: 'Rooftop'
            }
        ],
        link: 'Explore More',
        discount: '10% Discount',
        description: 'Craving flexibility? Social membership is designed to offer individuals with the flexibility they crave in how they live, work, connect, and gather. It\'s the ideal solution for freelancers and those seeking to break free from the confines of traditional workspaces. By joining our community, they gain access to a huge network of like-minded individuals, fostering growth and collaboration. At OZ, we invite you all members to enjoy access to all communal and social spaces, may book conference rooms, and are invited to join our cultural programming events.'

    },
    {
        id: '3',
        name: 'UnLimited',
        limit: '7',
        image: image_bg,
        Benefits: [
            {
                id: 1,
                name: "Access to all OZ's Co-fitness classes and packages",
                access: true,
                value: 'YES'
            },
            {
                id: 2,
                name: "Access to all OZ Community Events",
                access: true,
                value: 'YES'
            },
            {
                id: 3,
                name: "Access to reserve private, beautifully designed spaces for team meetings",
                access: true,
                value: 'YES'
            },
            {
                id: 4,
                name: "Become a part of an inspiring community of like-minded creators, innovators and thinkers",
                access: true,
                value: 'YES'
            },
            {
                id: 5,
                name: "Accessibility to book all of OZ's spaces",
                access: true,
                value: 'YES'
            },
            {
                id: 6,
                name: "Access to Private Desk",
                access: false,
                value: 'NO'
            },
            {
                id: 7,
                name: "Access to Communal Areas",
                access: true,
                value: 'YES'
            },
            {
                id: 8,
                name: "Access to Private Office",
                access: false,
                value: 'NO'
            },
            {
                id: 9,
                name: "Access to First or Seconds floors",
                access: false,
                value: 'NO'
            },
            {
                id: 10,
                name: "Access OZ's co-fitness zone",
                access: true,
                value: 'YES'
            },
            {
                id: 11,
                name: "Enjoy access to OZY's F&B services ",
                access: true,
                value: 'YES'
            },
            {
                id: 12,
                name: "Enjoy access to OZ's ready-to-use amenities communal kitchen, phone booths, library, etc.",
                access: true,
                value: 'YES'
            },
            {
                id: 13,
                name: "Enjoy working from a private member only community",
                access: true,
                value: 'YES'
            }

        ],
        Amenties: [
            {
                id: 1,
                name: 'High Speed WIFI',
                icon: wifi,
                icon_white: wifi_white,
                key: 'WIFI'
            },
            {
                id: 2,
                name: 'Security',
                icon: Security,
                icon_white: Security_white,
                key: 'Security'
            },
            {
                id: 3,
                name: 'Parking',
                icon: parking,
                icon_white: parking_white,
                key: 'Parking'
            },
            {
                id: 4,
                name: 'Community App',
                icon: Community,
                icon_white: Community_white,
                key: 'Community App'
            },
            {
                id: 5,
                name: 'Business Center',
                icon: Business,
                icon_white: Business_white,
                key: 'Business Center'
            },
            {
                id: 6,
                name: 'Reliable IT Infrastructure',
                icon: IT,
                icon_white: IT_white,
                key: 'IT Infrastructure'
            },
            {
                id: 7,
                name: 'Catering Services',
                icon: Catering,
                icon_white: Catering_white,
                key: 'Services'
            },
            {
                id: 8,
                name: 'Access by QR Codes',
                icon: Access,
                icon_white: Access_white,
                key: 'QR Codes'
            },
            {
                id: 9,
                name: 'Premium Location in the heart of Sheikh Zayed',
                icon: premium,
                icon_white: premium_white,
                key: 'Premium Location'
            },
            {
                id: 10,
                name: 'Audio Video display options',
                icon: Audio,
                icon_white: Audio_white,
                key: 'Audio Video display options'
            },
            {
                id: 11,
                name: 'Aesthetic Design',
                icon: Aesthetic,
                icon_white: Aesthetic_white,
                key: 'Aesthetic Design'
            },
            {
                id: 12,
                name: 'Dedicated Community Team',
                icon: '',
                icon_white: Dedicated_white,
                key: 'Dedicated Community Team'
            },
            {
                id: 13,
                name: 'Ergonomic Furniture',
                icon: '',
                icon_white: Ergonomic_white,
                key: 'Ergonomic Furniture'
            },
            {
                id: 14,
                name: 'Administrative Support',
                icon: '',
                icon_white: Administrative_white,
                key: 'Administrative Support'
            },
            {
                id: 15,
                name: 'Private studios, desks, and communal areas',
                icon: '',
                icon_white: Private_white,
                key: 'Private studios'
            },
            {
                id: 16,
                name: 'Cleaning & Maintenance',
                icon: '',
                icon_white: Cleaning_white,
                key: 'Cleaning & Maintenance'
            },
            {
                id: 17,
                name: 'Z Studio by OZ & The Bodyhack',
                icon: '',
                icon_white: ZStudio_white,
                key: 'Z Studio by OZ & The Bodyhack'
            },
            {
                id: 18,
                name: 'Recreational Zones',
                icon: Recreational,
                icon_white: Recreational_white,
                key: 'Recreational Zones'
            },
            {
                id: 19,
                name: 'Meeting rooms',
                icon: '',
                icon_white: Meeting_white,
                key: 'Meeting rooms'
            },
            {
                id: 20,
                name: 'Innovation Capsule',
                icon: '',
                icon_white: Innovation_white,
                key: 'Innovation Capsule'
            },
            {
                id: 21,
                name: 'Classrooms',
                icon: '',
                icon_white: Classrooms_white,
                key: 'Classrooms'
            },
            // {
            //     id: 22,
            //     name: 'OZY\'s Deli: A Glocal Gastronomic Goodness',
            //     icon: OZYi_white,
            //     icon_white: OZYi_white,
            //     key: 'OZY\'s Deli'
            // },
            {
                id: 23,
                name: 'Auditorium',
                icon: '',
                icon_white: Auditorium_white,
                key: 'Auditorium'
            },
            {
                id: 24,
                name: 'Communal Kitchen',
                icon: '',
                icon_white: Communal_white,
                key: 'Communal Kitchen'
            },
            {
                id: 25,
                name: 'Multi-Purpose Area',
                icon: '',
                icon_white: MultiArea_white,
                key: 'Multi-Purpose Area'
            },
            {
                id: 26,
                name: 'Outdoor Space',
                icon: '',
                icon_white: Outdoor_white,
                key: 'Outdoor Space'
            },
            {
                id: 27,
                name: 'Rooftop',
                icon: '',
                icon_white: Rooftop_white,
                key: 'Rooftop'
            }
        ],
        link: 'Explore More',
        discount: '15% Discount',
        description: 'Craving flexibility? Social membership is designed to offer individuals with the flexibility they crave in how they live, work, connect, and gather. It\'s the ideal solution for freelancers and those seeking to break free from the confines of traditional workspaces. By joining our community, they gain access to a huge network of like-minded individuals, fostering growth and collaboration. At OZ, we invite you all members to enjoy access to all communal and social spaces, may book conference rooms, and are invited to join our cultural programming events.'
    }
]