import { message, Button, Modal, Rate, Input, Form } from 'antd';
import { useState } from 'react';
import API from '../service/API';

const { TextArea } = Input;

const PostComment = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    const { rate, comment } = form.getFieldValue();
    if (!rate && !comment) {
        message.error("Select a rate or type some comment!");
        return;
    }
    setLoading(true);
    API.post("rate",{
        toiletId: props.toiletId,
        rate: rate,
        comment: comment,
    })
    .then((response) => {
        setLoading(false);
        props.updateRates();
        props.setShow(false);
        message.success("Your comment has been posted!");
    })
    .catch((error) => {
        message.error("Fail to post your comment!")
    })
  };

  const handleCancel = () => {
    props.setShow(false);
  };

  return (
      <Modal title="Post your comment" open={true} onOk={handleOk} onCancel={handleCancel} width={350}
        footer={[
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
            </Button>
        ]}>
        <Form onFinish={handleOk} form={form}>
            <Form.Item name="rate" label="Rate">
                <Rate />
            </Form.Item>
            <Form.Item name="comment">
            <TextArea rows={4} placeholder="Say something..."/>
            </Form.Item>
        </Form>
      </Modal>
  );
};
export default PostComment;