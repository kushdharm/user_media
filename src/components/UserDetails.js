import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Clock from './Shared/Clock';
import { useSelector } from 'react-redux';
import Post from './Post';
import { ErrorBoundary } from './Shared/ErrorBoundary';

const UserDetails = () => {
    const userList = useSelector((state) => state.user.userList);
    const postList = useSelector((state) => state.post.userList);

    const { userId } = useParams();

    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    const [countries, setCountries] = useState([])
    const [timezone, setTimeZone] = useState([])
    const [isPause, setIsPause] = useState(false)
    const [userInfo, setUserInfo] = useState([])
    const [isShow, setShow] = useState(false)
    const [post, setPost] = useState('')


    const getUserDetails = (id) => {

        const parseId = parseInt(id)
        const postData = postList.filter(post => post.userId === parseId)
        setPosts(postData)

    }

    const getUser = (id) => {
        if (userList && userList.length > 0) {
            const parseId = parseInt(id)
            const user = userList.filter(user => user.id === parseId)
            setUserInfo(user[0])
        }
    }

    const getCountriesValues = async () => {
        try {
            const countriesDetails = await axios.get("http://worldtimeapi.org/api/timezone");
            setCountries(countriesDetails.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCountryChange = (e) => {
        const { value } = e.target
        setTimeZone(value)
        setIsPause(false)
    }

    const showPostContent = (postData) => {
        setPost(postData)
        setShow(true)
    }

    useEffect(() => {
        if (userId && userList && postList && userList.length > 0 && postList.length > 0) {
            getUser(userId)
            getUserDetails(userId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, userList, postList])

    useEffect(() => {
        getCountriesValues()
    }, [])

    // useEffect(() => {
    //     /**when click outside the popup modal close popup modal */
    //     const handleOutsideClick = (event) => {

    //         if (isShow && !event.target.closest('.modal-content')) {
    //             setShow(false);
    //         }
    //     }

    //     document.addEventListener('click', handleOutsideClick);

    //     /***cleanup function: removing eventListener once handleOutsideClick is called*/
    //     return () => {
    //         document.removeEventListener('click', handleOutsideClick);
    //     }

    // }, [isShow]);


    return (
        <>
            <div >
                <div className='sm:grid sm:grid-cols-4 sm:gap-4 w-full'>
                    <button className='text-center ml-2 border-[1px] border-bold rounded-lg px-2 border-black my-2 text-lg bg-blue-200 w-20 hover:bg-blue-400' onClick={() => navigate('/')}>back</button>
                    <div className='my-2'>
                        <label className='inline' htmlFor="countries">Country:</label>
                        <select className=' inline-block' name="countries" id="countries" onChange={handleCountryChange}>
                            {countries && countries.length > 0 && countries.map((country, index) => {
                                return <option key={`keycountry_${index}`} value={country}>{country}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <ErrorBoundary fallback="Something went wrong with clock">
                            <Clock
                                timezone={timezone}
                                isPause={isPause}
                            />
                        </ErrorBoundary>
                    </div>
                    <button className=' ml-2 border-[1px] border-bold rounded-lg px-8 text-center border-black my-2 text-lg bg-blue-200 w-22 mr-2  hover:bg-blue-400' onClick={() => setIsPause(!isPause)}>pause/start</button>
                </div>
                <h4 className='text-center text-lg mt-4 mb-2 font-bold'>Profile Page</h4>
                <div className='sm:grid sm:grid-cols-2 border-[1px] border-bold rounded-lg border-black mx-2'>
                    <div>
                        <span className='pl-2 font-medium'>{userInfo.name}</span>
                        <div className='pl-2 font-medium'>{userInfo.username}</div>
                    </div>
                    <div className='text-right'>
                        <span className='text-center px-6 font-medium'>{`${userInfo.address?.street}, ${userInfo.address?.city}`}</span>
                        <div className='pr-6 font-medium'>{userInfo.email} | {userInfo.phone}</div>
                    </div>

                </div>
                <div className='sm:grid sm:grid-cols-3 sm:gap-4 w-full'>
                    {posts.map((post, index) => (

                        <div key={index} className='border-[1px] border-bold rounded-lg px-2 border-black mx-2 my-2 shadow-[1px_1px_10px_2px_rgba(0,0,0,0.5)] hover:shadow-slate-600 hover:cursor-pointer' onClick={() => showPostContent(post.body)}>
                            <h3 className='py-4 font-bold'>{post.title}</h3>
                            <p className='py-2'>{post.body}</p>
                        </div>

                    ))}
                </div>
            </div>
            {isShow && <div className='modal-content'>
                <ErrorBoundary fallback="Something went wrong with post">
                    <Post
                        isShow={isShow}
                        toggleModal={setShow}
                        data={post}

                    />
                </ErrorBoundary>
            </div>
            }
        </>
    )
}

export default UserDetails