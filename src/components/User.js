import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getUser, getUserPostDetails } from 'services/userService'
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from 'store/slices/userSlice';
import { setPostList } from 'store/slices/postSlice';


const UserList = () => {

    const userDetailList = useSelector((state) => state.user.userList);

    const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const getUserList = async () => {
        try {
            const usersData = await getUser()
            const posts = await getUserPostDetails()
            if (usersData && posts) {

                const postCountByUser = calculateTotalPostOfEveryUser(posts)

                if (postCountByUser) {
                    const usersWithPostCount = usersData.map(user => {
                        return {
                            ...user,
                            postCount: postCountByUser[user.id],
                        }
                    });

                    setUsers(usersWithPostCount);
                    dispatch(setUserList(usersWithPostCount));
                    dispatch(setPostList(posts));
                }

            }
        } catch (error) {
            console.error("Error", error);
        }
    }

    const calculateTotalPostOfEveryUser = (posts) => {
        const postCountByUser = {};
        for (const post of posts) {
            const userId = post.userId;
            // Check if the userId is in the postCountByUser object
            if (userId in postCountByUser) {
                // If the user exists in the object, increment their post count
                postCountByUser[userId]++;
            } else {
                // If the user doesn't exist in the object, initialize their post count to 0
                postCountByUser[userId] = 1;
            }
        }

        return postCountByUser
    }

    const getUserAllDetails = (id) => {
        navigate(`/user/${id}`);
    }


    useEffect(()=>{
        if(userDetailList && userDetailList.length>0){
            setUsers(userDetailList)
        }else{
            getUserList()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userDetailList])

    return (
        <>
            <h1 className=' text-center my-8'>Directory</h1>
            {users.map((user, index) => (
                <div key={`user-${index}`} className=' border-[1.5px] border-solid border-black rounded-lg h-16 mb-2 bg-blue-200 shadow-md mx-8 hover:bg-blue-400 hover:cursor-pointer grid grid-cols-2 ' onClick={() => getUserAllDetails(user.id)}>
                    <h6 className='ml-2 mt-4 '>Name:{user.name}</h6>
                    <h6 className='text-right mr-2 mt-4 '>Post:{user.postCount}</h6>
                </div>
            ))}

        </>
    )
}

export default UserList