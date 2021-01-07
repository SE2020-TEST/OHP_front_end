import { Modal, Button, Form, Tooltip, Input, Select, message } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { postRequest } from '@/utils/request';

const { Option } = Select;


const RegisterCourseModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (value) => {
    //这里注册课程
    postRequest('/course/register',value,(data)=>{message.success(`注册课号为${data.courseId}的课程成功！`);})
  };

  return (
    <>
      <Button
        type="dashed"
        style={{
          width: '50%',
          marginBottom: 8,
        }}
        onClick={showModal}
      >
        <PlusOutlined />
              注册新课程
            </Button>
      <Modal
        title="注册新课程"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div style={{padding:"10px 50px"}}>
        <Form
            layout="vertical"
            onFinish={handleSubmit}
            hideRequiredMark
          >
            <Form.Item
              name="cid"
              label={"课号"}
              rules={[
                {
                  required: true,
                  message: '请输入课号!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="title"
              label={"课程名称"}
              rules={[
                {
                  required: true,
                  message: '请输入课程名称!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label={"课程简介"}
              rules={[
                {
                  required: true,
                  message: '请输入课程简介!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="textbook"
              label={"课程教材"}
              rules={[
                {
                  required: true,
                  message: '请输入课程教材!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                注册新课程
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterCourseModal;