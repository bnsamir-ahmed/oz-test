import React, { useState } from 'react';
import {Nav} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './ProfileTabs.css'
import { Outlet } from 'react-router-dom';
import Button from '../../UI/Button';

const ProfileTabs = () => {
    const [sideMenu, setSideMenu] = useState(true);

    const handelSideMenu = (e)=>{
        e.preventDefault();
        setSideMenu(!sideMenu);
    };

    return (
        <>
                <div className="container-fluid profile-taps">
                    <div className="row">
                        <div className={`col-md-3 col-2 d-flex flex-column border-right profile_tabs ${sideMenu ? 'profile_nav' : ''}`}>
                            <Nav variant="pills" className="flex-column p-xl-5 p-4">
                                <li className="nav-item">
                                    <NavLink 
                                        to={'/profile'}
                                        className={`nav-link explore_link_profile p-0`}
                                        end 
                                        style={({ isActive }) => ({
                                            backgroundColor: 'transparent',
                                            color: isActive ? '#000' : '#bdbdbd'
                                        })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="6" r="4" stroke="#BDBDBD" stroke-width="1.5"/>
                                            <ellipse cx="12" cy="17" rx="7" ry="4" stroke="#BDBDBD" stroke-width="1.5"/>
                                        </svg>
                                        <span className='ms-3'>Personal data</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to={'/profile/changePassword'}
                                        className={`nav-link explore_link_profile p-0`}
                                        end
                                        style={({ isActive }) => ({
                                            backgroundColor: 'transparent',
                                            color: isActive ? '#000' : '#bdbdbd'
                                        })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z" stroke="#BDBDBD" stroke-width="1.5"/>
                                            <circle opacity="0.5" cx="12" cy="16" r="2" stroke="#BDBDBD" stroke-width="1.5"/>
                                            <path opacity="0.5" d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                        <span className='ms-3'>Change Password</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to={'/profile/mybooking'}
                                        className={`nav-link explore_link_profile p-0`}
                                        end
                                        style={({ isActive }) => ({
                                            backgroundColor: 'transparent',
                                            color: isActive ? '#000' : '#bdbdbd'
                                        })}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M8.03516 3V5.57143" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M14.8926 3V5.57143" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M4.17773 9.07764H18.7492" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M16.6063 21.0002C18.4999 21.0002 20.0349 19.4652 20.0349 17.5716C20.0349 15.6781 18.4999 14.1431 16.6063 14.1431C14.7128 14.1431 13.1777 15.6781 13.1777 17.5716C13.1777 19.4652 14.7128 21.0002 16.6063 21.0002Z" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M17.8863 17.6147H15.332" stroke="#BDBDBD" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M16.6094 16.3623V18.9252" stroke="#BDBDBD" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M19.1786 8.57185V15.309C18.5529 14.5975 17.6357 14.1433 16.6071 14.1433C14.7129 14.1433 13.1786 15.6776 13.1786 17.5718C13.1786 18.2147 13.3586 18.8233 13.6757 19.3376C13.8557 19.6461 14.0871 19.9204 14.3529 20.1433H8.03571C5.03571 20.1433 3.75 18.429 3.75 15.8576V8.57185C3.75 6.00042 5.03571 4.28613 8.03571 4.28613H14.8929C17.8929 4.28613 19.1786 6.00042 19.1786 8.57185Z" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M11.459 13.0277H11.4667" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M8.2891 13.0277H8.2968" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M8.28906 15.5991H8.29676" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg> 
                                        <span className='ms-3'>My Booking</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to={'/profile/myevents'}
                                        className={`nav-link explore_link_profile p-0`}
                                        end
                                        style={({ isActive }) => ({
                                            backgroundColor: 'transparent',
                                            color: isActive ? '#000' : '#bdbdbd'
                                        })}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M8 2V5.00016" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M16 2V5.00016" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path opacity="0.4" d="M3.5 9.08984H20.5009" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M21.0009 8.50026V17.0007C21.0009 20.0009 19.5009 22.001 16.0007 22.001H8.00026C4.50008 22.001 3 20.0009 3 17.0007V8.50026C3 5.5001 4.50008 3.5 8.00026 3.5H16.0007C19.5009 3.5 21.0009 5.5001 21.0009 8.50026Z" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path opacity="0.4" d="M14.9823 14.2676C14.9587 14.1923 14.9153 14.1253 14.857 14.0742C14.7987 14.0232 14.7278 13.9901 14.6524 13.9787L13.0854 13.7421L12.3833 12.2392C12.3498 12.1675 12.2976 12.107 12.2326 12.0647C12.1676 12.0224 12.0924 12 12.0157 12C11.939 12 11.8638 12.0224 11.7988 12.0647C11.7338 12.107 11.6816 12.1675 11.6481 12.2392L10.9462 13.7416L9.35264 13.9785C9.27673 13.9898 9.20542 14.0231 9.14685 14.0745C9.08828 14.1259 9.04482 14.1934 9.02143 14.2693C8.99804 14.3452 8.99567 14.4263 9.01459 14.5035C9.0335 14.5808 9.07295 14.6509 9.12841 14.7059L10.2849 15.8529L9.99336 17.4989C9.97954 17.577 9.98708 17.6575 10.0151 17.7314C10.0431 17.8052 10.0905 17.8695 10.1519 17.9167C10.2133 17.964 10.2863 17.9925 10.3624 17.9989C10.4386 18.0052 10.515 17.9893 10.5829 17.9529L12.0141 17.1842L13.4188 17.9515C13.4862 17.9884 13.5622 18.0049 13.6382 17.9992C13.7141 17.9936 13.7871 17.966 13.8488 17.9195C13.9104 17.8731 13.9584 17.8097 13.9872 17.7364C14.016 17.6632 14.0246 17.583 14.0119 17.505L13.7433 15.8529L14.8789 14.7028C14.9335 14.6475 14.9721 14.5775 14.9904 14.5006C15.0086 14.4237 15.0058 14.343 14.9823 14.2676ZM13.0195 15.4002C12.9722 15.4481 12.9367 15.5072 12.9162 15.5725C12.8957 15.6378 12.8908 15.7072 12.9018 15.7749L13.0686 16.8009L12.2059 16.3297C12.1477 16.2979 12.0829 16.2812 12.0172 16.281C11.9514 16.2807 11.8865 16.297 11.8281 16.3284L10.948 16.801L11.1287 15.7811C11.1409 15.7118 11.1364 15.6404 11.1155 15.5734C11.0946 15.5063 11.058 15.4458 11.0089 15.3971L10.3012 14.6953L11.277 14.5501C11.3432 14.5403 11.406 14.5137 11.46 14.4728C11.514 14.4318 11.5575 14.3777 11.5867 14.3152L12.0157 13.3969L12.4447 14.3152C12.4739 14.3776 12.5172 14.4316 12.5711 14.4725C12.6249 14.5134 12.6876 14.54 12.7536 14.55L13.7156 14.6952L13.0195 15.4002Z" fill="#BDBDBD"/>
                                        </svg>
                                        <span className='ms-3'>My event</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to={'/profile/myplan'}
                                        className={`nav-link explore_link_profile p-0`}
                                        end
                                        style={({ isActive }) => ({
                                            backgroundColor: 'transparent',
                                            color: isActive ? '#000' : '#bdbdbd'
                                        })}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M20.6481 13.4054L20.8544 11.2137C21.0164 9.49233 21.0974 8.63165 20.8029 8.27587C20.6436 8.08341 20.427 7.96548 20.1954 7.94514C19.7673 7.90754 19.2296 8.51961 18.1543 9.74376C17.5982 10.3768 17.3202 10.6934 17.01 10.7424C16.8381 10.7696 16.663 10.7416 16.5043 10.6618C16.2178 10.5176 16.0269 10.1263 15.6449 9.34366L13.6318 5.21837C12.91 3.73946 12.5492 3 12 3C11.4508 3 11.09 3.73946 10.3682 5.21837L8.35506 9.34366C7.97313 10.1263 7.78216 10.5176 7.49573 10.6618C7.33703 10.7416 7.16191 10.7696 6.99004 10.7424C6.67984 10.6934 6.40179 10.3768 5.84568 9.74376C4.77037 8.51961 4.23272 7.90754 3.80459 7.94514C3.57299 7.96548 3.35638 8.08341 3.19709 8.27587C2.90262 8.63165 2.98362 9.49233 3.14563 11.2137L3.3519 13.4054C3.69179 17.0167 3.86173 18.8224 4.92608 19.9112C5.99044 21 7.58565 21 10.7761 21H13.2239C16.4143 21 18.0096 21 19.0739 19.9112C20.1383 18.8224 20.3082 17.0167 20.6481 13.4054Z" stroke="#BDBDBD" stroke-width="2"/>
                                            <path d="M11.2321 12.4691C11.5741 11.8556 11.7451 11.5488 12.0008 11.5488C12.2564 11.5488 12.4274 11.8556 12.7694 12.4691L12.8579 12.6278C12.9551 12.8022 13.0037 12.8893 13.0794 12.9468C13.1552 13.0044 13.2496 13.0257 13.4383 13.0684L13.6101 13.1073C14.2742 13.2575 14.6063 13.3327 14.6853 13.5867C14.7643 13.8408 14.5379 14.1055 14.0852 14.6349L13.968 14.7719C13.8394 14.9223 13.775 14.9975 13.7461 15.0906C13.7172 15.1837 13.7269 15.284 13.7463 15.4848L13.764 15.6675C13.8325 16.3739 13.8667 16.7271 13.6599 16.8841C13.4531 17.0411 13.1422 16.8979 12.5203 16.6116L12.3595 16.5376C12.1828 16.4562 12.0944 16.4155 12.0008 16.4155C11.9071 16.4155 11.8188 16.4562 11.6421 16.5376L11.4812 16.6116C10.8594 16.8979 10.5485 17.0411 10.3417 16.8841C10.1348 16.7271 10.1691 16.3739 10.2375 15.6675L10.2552 15.4848C10.2747 15.284 10.2844 15.1837 10.2555 15.0906C10.2265 14.9975 10.1622 14.9223 10.0335 14.7719L9.91641 14.6349C9.46366 14.1055 9.23728 13.8408 9.31628 13.5867C9.39529 13.3327 9.72734 13.2575 10.3915 13.1073L10.5633 13.0684C10.752 13.0257 10.8464 13.0044 10.9221 12.9468C10.9979 12.8893 11.0465 12.8022 11.1437 12.6278L11.2321 12.4691Z" stroke="#BDBDBD" stroke-width="2"/>
                                        </svg>
                                        <span className='ms-3'>My Plan</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to={'/profile/favoiate'}
                                        className={`nav-link explore_link_profile p-0`}
                                        end
                                        style={({ isActive }) => ({
                                            backgroundColor: 'transparent',
                                            color: isActive ? '#000' : '#bdbdbd'
                                        })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5147 9.61343C18.5147 7.88339 17.3431 6.15336 15 6.15336V5C17.5882 5 19.6863 7.0655 19.6863 9.61343H18.5147Z" fill="#BDBDBD"/>
                                            <path d="M20.2843 12.8445L13.4031 19.6187C12.6247 20.3851 11.3753 20.3851 10.5969 19.6187L3.71573 12.8445C1.42809 10.5925 1.42809 6.94113 3.71573 4.68905C6.00337 2.43698 9.71236 2.43698 12 4.68905C14.2876 2.43698 17.9966 2.43698 20.2843 4.68905C22.5719 6.94113 22.5719 10.5925 20.2843 12.8445Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        <span className='ms-3'>Favoriate</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to={'/profile/issueReport'}
                                        className={`nav-link explore_link_profile p-0`}
                                        end
                                        style={({ isActive }) => ({
                                            backgroundColor: 'transparent',
                                            color: isActive ? '#000' : '#bdbdbd'
                                        })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <circle cx="11" cy="6" r="4" stroke="#BDBDBD" stroke-width="1.5"/>
                                            <path d="M14 13.3271C13.0736 13.1162 12.0609 13 11 13C6.58172 13 3 15.0147 3 17.5C3 19.9853 3 22 11 22C16.6874 22 18.3315 20.9817 18.8068 19.5" stroke="#BDBDBD" stroke-width="1.5"/>
                                            <path d="M14.1715 18.8284C14.8954 19.5523 15.8954 20 17 20C19.2091 20 21 18.2091 21 16C21 14.8954 20.5523 13.8954 19.8284 13.1715M14.1715 18.8284C13.4477 18.1045 13 17.1046 13 16C13 13.7909 14.7909 12 17 12C18.1046 12 19.1045 12.4477 19.8284 13.1715M14.1715 18.8284L19.8284 13.1715" stroke="#BDBDBD" stroke-width="1.5" stroke-linejoin="round"/>
                                        </svg>
                                        <span className='ms-3'>Issue Reporting</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to={'/profile/privacypolicy'}
                                        className={`nav-link explore_link_profile p-0`}
                                        end
                                        style={({ isActive }) => ({
                                            backgroundColor: 'transparent',
                                            color: isActive ? '#000' : '#bdbdbd'
                                        })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path opacity="0.5" d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z" stroke="#BDBDBD" stroke-width="1.5"/>
                                            <path d="M12 8V12" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/>
                                            <circle cx="12" cy="15" r="1" fill="#BDBDBD"/>
                                        </svg>
                                        <span className='ms-3'>Privacy Policy</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to={'/profile/terms&condition'}
                                        className={`nav-link explore_link_profile p-0`}
                                        end
                                        style={({ isActive }) => ({
                                            backgroundColor: 'transparent',
                                            color: isActive ? '#000' : '#bdbdbd'
                                        })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M20.3116 12.6473L20.8293 10.7154C21.4335 8.46034 21.7356 7.3328 21.5081 6.35703C21.3285 5.58657 20.9244 4.88668 20.347 4.34587C19.6157 3.66095 18.4881 3.35883 16.2331 2.75458C13.978 2.15033 12.8504 1.84821 11.8747 2.07573C11.1042 2.25537 10.4043 2.65945 9.86351 3.23687C9.27709 3.86298 8.97128 4.77957 8.51621 6.44561C8.43979 6.7254 8.35915 7.02633 8.27227 7.35057L8.27222 7.35077L7.75458 9.28263C7.15033 11.5377 6.84821 12.6652 7.07573 13.641C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6392 12.3508 17.2435L12.3508 17.2435C14.3834 17.7881 15.4999 18.0873 16.415 17.9744C16.5152 17.9621 16.6129 17.9448 16.7092 17.9223C17.4796 17.7427 18.1795 17.3386 18.7203 16.7612C19.4052 16.0299 19.7074 14.9024 20.3116 12.6473Z" stroke="#BDBDBD" stroke-width="1.5"/>
                                            <path opacity="0.5" d="M16.415 17.9741C16.2065 18.6126 15.8399 19.1902 15.347 19.6519C14.6157 20.3368 13.4881 20.6389 11.2331 21.2432C8.97798 21.8474 7.85044 22.1495 6.87466 21.922C6.10421 21.7424 5.40432 21.3383 4.86351 20.7609C4.17859 20.0296 3.87647 18.9021 3.27222 16.647L2.75458 14.7151C2.15033 12.46 1.84821 11.3325 2.07573 10.3567C2.25537 9.58627 2.65945 8.88638 3.23687 8.34557C3.96815 7.66065 5.09569 7.35853 7.35077 6.75428C7.77741 6.63996 8.16368 6.53646 8.51621 6.44531" stroke="#BDBDBD" stroke-width="1.5"/>
                                            <path d="M11.7773 10L16.607 11.2941" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/>
                                            <path opacity="0.5" d="M11 12.8977L13.8978 13.6742" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                        <span className='ms-3'>Terms & Conditions</span>
                                    </NavLink>
                                </li>
                            </Nav>
                        </div>
                        <div className={`col-md-9 col-10 profile_content ${sideMenu ? 'opened ' : ''}`}>
                            <Button 
                                tagType='link'
                                className='p-0 align-self-end btn_profile'
                                onClick={handelSideMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M5.33398 9.33301L26.6673 9.33301" stroke={'black'} stroke-width="1.5" stroke-linecap="round"/>
                                    <path opacity="0.6" d="M12 16H26.6667" stroke={'black'} stroke-width="1.5" stroke-linecap="round"/>
                                    <path opacity="0.4" d="M20 22.667H26.6667" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </Button>
                            <Outlet />
                        </div>
                    </div>
                </div>
        </>
    );
};

export default ProfileTabs;
