import React, {useState} from 'react';
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";

const PostForm = ({create}) => {
    const [post, setPost]=useState({title: '', body: ''})

    const addNewPost = (e)=>{
        e.preventDefault()
       const newPost ={...post, id: Date.now()}
        create(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <Input
                value={post.title}
                onChange={e=> setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Name"
            />
            <Input
                value={post.body}
                onChange={e=> setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Description"
            />
            <Button onClick={addNewPost}>Create post</Button>
        </form>
    );
};

export default PostForm;