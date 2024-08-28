import { Skeleton } from 'antd';

const SkeletonCard = () => {
    return (
        <div className='card h-100'>
            <div className='card-header header_course'>
                <Skeleton.Image className="w-100 card-img-top" active />
            </div>
            <div className='card-body'>
            <div className='d-flex align-items-center'>
                <Skeleton paragraph active/>
            </div>
            <div className='d-flex justify-content-between align-items-center pt-4'>
                <p className='courseCardTitle mb-0'>
                    <Skeleton.Input style={{ width: 80 }} active />
                </p>
                <Skeleton.Button style={{ width: 80 }} active />
            </div>
            </div>
        </div>
    )
}
export default SkeletonCard;