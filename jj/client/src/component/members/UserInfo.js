import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import axios from 'axios';

import ImgSetting from '../../images/setting.png';
import ImgUser from '../../images/user.png';

function UserInfo({nickname}) {
    const [currUser,setCurrUser] = useState({});
    const [feedCount, setFeedCount] = useState(0);
    const [follow, setFollow] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const loginUser = useSelector(state=>state.user);
    const navigate = useNavigate();

    const getUserInfo = () => {
        axios.post('/api/members/getUserInfo', null, { params: { nickname } })
        .then(result =>{
            setCurrUser(result.data.user);
            setFeedCount(result.data.count);
            setFollowers(result.data.followers || []);
            setFollowings(result.data.followings || []);
            console.log(result.data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        getUserInfo();
    }, [loginUser]);

    return (
        <div className="wrap_member">
            <div className="nickname">{currUser.nickname}</div>
            <div className="info">
                <div className="profileimg" onClick={() => {
                    navigate('/updateprofile');
                }}>
                    <img src={
                        currUser.profileimg
                        ?`http://localhost:8070/images/${currUser.profileimg}`
                        : ImgUser
                        } className="img" />
                    <img src={ImgSetting} className="icon" />
                </div>
                <div className="status">
                    <div>{feedCount} 게시물</div>
                    <div>{followings.length} 팔로잉</div>
                    <div>{followers.length} 팔로워</div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
