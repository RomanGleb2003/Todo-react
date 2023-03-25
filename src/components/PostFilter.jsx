import React from 'react';
import Input from "./UI/input/Input";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <>
            <Input
                value={filter.query}
                onChange={(e)=> setFilter({...filter, query: e.target.value})}
                placeHolder={'Romeo'}
            />
            <MySelect
                value={filter.query}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Sorting"
                options={[
                    {value: 'title', name: 'Name'},
                    {value: 'body', name: 'Body'}
                ]}
            />
        </>
    );
};

export default PostFilter;