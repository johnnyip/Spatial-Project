import { EditOutlined } from '@ant-design/icons';
import { Button, List, Rate } from 'antd';

const Comments = (props) => {
    const data = props.data;

    const handlePostComment = () => {
        props.setShowPostComment(true);
    }

    return (
        <>  {
                data.length ?
                <List
                    size='small'
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                    <List.Item>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '15rem', }}>
                                <Rate disabled={true} allowHalf={true} value={item.rate} style={{ fontSize: 11 }} />
                                <div style={{ fontSize: 11 }}>{item.date}</div>
                        </div>
                        {item.comment}
                    </List.Item>
                    )}
                />
                :
                data.length === 0 &&
                <div style={{ width: '273px', height:'185px', paddingLeft:'15px' }}>
                    No comment yet.
                    <br></br>
                    Post your comment now!
                </div>
            }
            <Button icon={<EditOutlined />} size="small" type="primary" onClick={handlePostComment} style={{ marginLeft: '15px' }}>
                Comment
            </Button>
        </>

    )
}

export default Comments;