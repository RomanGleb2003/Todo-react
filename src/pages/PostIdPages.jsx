import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const PostIdPages = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id)=> {
        const response = await PostService.getId(id);
        setPost(response.data)
    })
    const [fetchPostComments, commentsLoading, commentsError] = useFetching(async (id)=> {
        const response = await PostService.getCommentsPostId(id);
        setComments(response.data)
        console.log(response)
    })

    useEffect(()=>{
        fetchPostById(params.id)
        fetchPostComments(params.id)
    }, [])

    return (
        <>
            <h1>Comments</h1>
            {isLoading
            ? <Loader/>
            : <h3>{post.id}. {post.title}</h3>
            }
            <div>{comments?.map(comm=>
                        <div key={comm.id} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                        )}
            </div>
        </>
    );
};

export default PostIdPages;