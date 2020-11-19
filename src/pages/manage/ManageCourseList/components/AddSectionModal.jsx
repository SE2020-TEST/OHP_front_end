import { Modal, Button, Form, Tooltip, Input, Select, message } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import request from 'umi-request';

const { Option } = Select;

const AddSectionModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (value) => {
    //这里更新个人信息
    console.log(value)

    request.post('http://localhost:8080/section/add', {
      data: {
        cid: value.cid,
        semester: value.semester,
        endTime: "2020.12.12",
        uid:"4180",
      },
    }).then(function(response) {
      console.log(response);
      if(response.code==0){
        message.success("新建课程成功");
      }else{
        message.error(response.message);
      }
    })
    
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
              新建课程(选择学期)
            </Button>
      <Modal
        title="注册新课程"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* <p>{modalText}</p> */}
        <div style={{ padding: "10px 50px" }}>
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
              <Input suffix={
                <Tooltip title="课号必须是已有课号！">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              } />
            </Form.Item>
            <Form.Item
              name="semester"
              label={"学期"}
              rules={[
                {
                  required: true,
                  message: '请输入学期!',
                },
              ]}
            >
              <Select style={{ width: 120 }}>
                <Option value="2020春季">2020春季</Option>
                <Option value="2020夏季">2020夏季</Option>
                <Option value="2020秋季">2020秋季</Option>
                <Option value="2021春季">2021春季</Option>
                <Option value="2021夏季">2021夏季</Option>
                <Option value="2021秋季">2021秋季</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                更新课程信息
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddSectionModal;