import { Modal, Button, Form, Tooltip, Input, message } from 'antd';
import {  InfoCircleOutlined,UserAddOutlined } from '@ant-design/icons';
import { postRequest } from '@/utils/request';


const AddUserModal = (props) => {
  const [visible, setVisible] = React.useState(false);

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
    //这里添加user
    value.sid=props.sid;
    postRequest('/section/adduser',value,()=>{
        message.success('添加学生成功!');
        props.forceUpdate();
    });
  };


  return (
    <>
      <Button icon={<UserAddOutlined />}  onClick={showModal}>添加学生</Button>
      <Modal
        title="添加学生"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: "10px 50px" }}>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            hideRequiredMark
          >
            <Form.Item
              name="uid"
              label={"学号"}
              rules={[
                {
                  required: true,
                  message: '请输入课号!',
                },
              ]}
            >
              <Input suffix={
                <Tooltip title="学号必须是已有学号！">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              } />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                添加学生
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddUserModal;