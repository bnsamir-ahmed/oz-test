import React from 'react';
import './NewsFeedBlog.css';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getCommunityNewsFeed } from '../../../apis/Events';
import NewsFeedBlogList from "./NewsFeedBlogList";
import NewsFeedHeader from "../NewsFeedHeader/NewsFeedHeader";
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';

const NewsFeedBlogs = () => {

    const { data: newsFeedData, isPending } = useQuery({
        queryKey: ['newsFeed-posts'],
        queryFn: () => getCommunityNewsFeed('no')
    });

    return (
        <>
            <NewsFeedHeader />
            <section className="feed">
                <div className="container-fluid">
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
                    >
                        <Masonry columnsCount={4} gutter="30px" className="newsfeeds ">
                            {isPending ?
                                (
                                    <div>
                                        <div className="card Card-news">
                                        <Skeleton.Image active />
                                            <Skeleton 
                                                paragraph={{rows: 3}}
                                                active 
                                                title={true}
                                            />
                                        </div>
                                    </div>
                                ) :
                                (
                                    newsFeedData && newsFeedData['posts'].map((feed) => {
                                        const { id, content, title, banner, category_name } = feed;
                                        return (
                                          <div key={id}>
                                            {console.log(newsFeedData)}
                                            <NewsFeedBlogList
                                              id={id}
                                              title={title}
                                              img={banner}
                                              text={content}
                                              category={category_name}
                                            />
                                          </div>
                                        );
                                    })
                                )
                            }

                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </section>
        </>

    )
};

export default NewsFeedBlogs;
