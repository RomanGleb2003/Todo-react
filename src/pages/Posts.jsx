import React, {useEffect, useRef, useState} from "react";
import PostList from "../components/PostList";
import Button from "../components/UI/button/Button";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Modal from "../components/UI/Modal/Modal";
import {usePost} from "../hooks/usePost";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import getPagesCount from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPost = usePost(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page)=> {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })

    useObserver(lastElement, page<totalPages, isPostsLoading, ()=> {
        setPage(page+1)
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }

    return (
        <div className="App">
            <Button style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create post
            </Button>
            <Modal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </Modal>
            <hr style={{margin: "15px 0"}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Elements"
                options={[
                    {value: 5, name: 5},
                    {value: 10, name: 10},
                    {value: 25, name: 25},
                    {value: -1, name: 'All...'},
                ]}
            />
            {postError &&
                <h1>{postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchedPost} title="Список JS"/>
            <div ref={lastElement} style={{height: 20}}></div>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
            }
        </div>
    );
}

export default Posts;
