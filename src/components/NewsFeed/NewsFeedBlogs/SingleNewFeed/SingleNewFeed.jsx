import React, { useEffect, useState } from 'react';
import './SingleNewFeed.css';
import '../NewsFeedBlog.css';
import vector from "../../../../assets/images/VectorRight.png";
import { NavLink, useParams } from "react-router-dom";
import { getNewFeedsPost, getCommunityNewsFeed } from '../../../../apis/Events';
import Card from "react-bootstrap/Card";
import ShareButton from '../../../UI/ShareButton';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';

const SingleNewFeed = () => {

    const { id } = useParams();
    const [url, setUrl] = useState('');

    const { data: post, isPending, error } = useQuery({
        queryKey: ['newsFeed-details', id],
        queryFn: ({ signal }) => getNewFeedsPost(id, signal)
    });

    const { data: relatiedArticles, isPending: articlePending, error: articleError } = useQuery({
        queryKey: ['newsFeed-related-articles', id],
        queryFn: () => getCommunityNewsFeed('no')
    });

    useEffect(() => {
        const fullUrl = window.location.href;
        setUrl(fullUrl);
    }, [id]);

    return (
        <>
            <div className="position-relative  d-md-block d-none">
                <img
                    src={vector}
                    alt="shape" className="position-absolute  vector-news"
                    style={{ top: "115px", right: "0", width: "100px" }}
                />
            </div>
            <section className="title-feed-header">
                <div className="container-fluid">
                    {error && (<div className='alert alert-danger' role='alert'>{error.message}</div>)}
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div className="section-wrap d-flex justify-content-between ">
                                <div className="head-news-section">
                                    {isPending ?
                                        (
                                            <Skeleton paragraph={{ rows: 2 }} title={true} active />
                                        )
                                        : (
                                            <span className="news-feed-head">
                                                News Feed :
                                                <h2 className="name-feed">{post.title}</h2>
                                                <span className="category-head">Category : <span className="category-name">{post.category_name}</span></span>
                                            </span>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className="news-details">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="image-header">
                                {isPending ? (
                                    <Skeleton.Image active className="details-image" style={{
                                        height: '670px',
                                        objectFit: 'cover'
                                    }}
                                    />
                                ) : (
                                    <img
                                        src={post.banner}
                                        alt={post.title}
                                        className="details-image"
                                        style={{
                                            height: '670px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="col-lg-7 border-right ">
                            <div className="box-details border-bottom">
                                {isPending ?
                                    (<Skeleton paragraph={{ rows: 2 }} title={true} active />)
                                    : (
                                        <>
                                            <h3>
                                                {post.title}
                                            </h3>
                                            <p>{post.content}</p>
                                        </>
                                    )}
                            </div>
                            <div className="box-details border-bottom">
                                <div className='row m-auto'>
                                    <div className='col-xl-6 col-sm-12'>
                                        {isPending ?
                                            (<Skeleton.Image active className='w-100 pb-2' />)
                                            : (
                                                <img className='w-100 pb-2' src={post.image_1} style={{
                                                    height: '400px',
                                                    objectFit: 'cover'
                                                }} />
                                            )
                                        }
                                    </div>
                                    <div className='col-xl-6 col-sm-12 pb-2'>
                                        {isPending ?
                                            (<Skeleton.Image active className='w-100 pb-2' />)
                                            : (
                                                <img className='w-100' src={post.image_2} style={{
                                                    height: '400px',
                                                    objectFit: 'cover'
                                                }} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="box-details border-bottom">
                                {isPending ?
                                    (<Skeleton paragraph={{ rows: 2 }} active />)
                                    : (
                                        <p>{post.description}</p>
                                    )}
                            </div>
                            <div className="box-details border-bottom d-flex">
                                <ShareButton button={true} shareUrl={url} />
                            </div>

                        </div>
                        <div className="col-lg-5">
                            {articleError && (<div className='alert alert-danger' role='alert'>{articleError.message}</div>)}
                            <div className="box-details ">
                                <h3>
                                    Articles Related
                                </h3>
                                <div className="newsfeeds border-0 m-0 p-0 ">
                                    {articlePending ?
                                        (
                                            <div className="card Card-news">
                                                <Skeleton.Image active />
                                                <Skeleton
                                                    paragraph={{ rows: 3 }}
                                                    active
                                                    title={true}
                                                />
                                            </div>
                                        )
                                        : (
                                            relatiedArticles && relatiedArticles['posts'].filter(item => item.category_name === post.category_name).map(article => {
                                                const { id, content, title, banner, category_name } = article;
                                                return (
                                                    <NavLink to={`/community/newsfeed/singleFeed/${id}`}>
                                                        <Card className="Card-news">
                                                            <Card.Img variant="top" src={banner} className="rounded-0 "
                                                                title={title}
                                                                loading="lazy" />
                                                            <Card.Body className='mb-4'>
                                                                <span className="feed-category">{category_name}</span>
                                                                <Card.Title>{title}</Card.Title>
                                                                <Card.Text className='dynamic_wraper'>{content}</Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </NavLink>
                                                )
                                            })
                                        )}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SingleNewFeed;
