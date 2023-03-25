import React from 'react';
import Button from "./UI/button/Button";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
    const router = useNavigate()
    return (
            <div className="post">
                <div className="post_content">
                    <strong>{props.number}. {props.post.title}</strong>
                </div>
                <div>
                    {props.post.body}
                </div>
                <div className="post_btn">
                    <Button onClick={()=> router(`/posts/${props.post.id}`)}>Open</Button>
                    <Button onClick={()=> props.remove(props.post)}>delete</Button>
            </div>
            </div>
    );
};

export default PostItem;