import React from 'react';

const getPagesCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
};

export default getPagesCount;