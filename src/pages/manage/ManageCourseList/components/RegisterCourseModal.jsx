import { Modal, Button, Form, Tooltip, Input } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';


const RegisterCourseModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (value) => {
    //这里更新个人信息
    console.log(value)

    message.success("更新课程信息成功");
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
        width={800}
      >
        <p>{modalText}</p>
        <div style={{padding:"10px 100px"}}>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            hideRequiredMark
          >
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
              name="cid"
              label={"课号"}
            >
              <Input suffix={
                <Tooltip title="课号不可与已有课号重复！">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              } />
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
            {/* <Form.Item>
              <Button htmlType="submit" type="primary">
                更新课程信息
              </Button>
            </Form.Item> */}
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterCourseModal;