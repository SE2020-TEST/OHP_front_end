import { Modal, Button, Form, Tooltip, Input, Select, message } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import request from 'umi-request';

const { Option } = Select;


const RegisterCourseModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
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
    //这里注册课程
    let params={};
    params.cid=value.cid;
    params.avatar="";
    params.title=value.title;
    params.textbook=value.textbook;
    params.intro=value.description;

    console.log(params);

    request.post('http://localhost:8080/course/register',{data:params})
    .then(function(res){
      console.log(res);
      if(res.code==0){
        message.success("注册课程成功");
      }else{
        message.error(res.message);
      }
    })
  };

  const validatorCid = (rule, value, callback) => {
    request.post('http://localhost:8080/course/checkcid', {
      data: {
        cid: value,
      },
    }).then(function(response) {
      console.log(response);
      if(response.code==0&&response.data==true){
        callback();
      }else{
        callback("该课号与已有课号重复！");
      }
    })
  }

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
        // width={800}
      >
        {/* <p>{modalText}</p> */}
        <div style={{padding:"10px 50px"}}>
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
              rules={[
                {
                  required: true,
                  message: '请输入课号!',
                },
                {
                  validator: validatorCid,
                },
              ]}
            >
              <Input/>
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
                <Option value="2019春季">2019春季</Option>
                <Option value="2019夏季">2019夏季</Option>
                <Option value="2019秋季">2019秋季</Option>
                <Option value="2020春季">2020春季</Option>
                <Option value="2020夏季">2020夏季</Option>
                <Option value="2020秋季">2020秋季</Option>
                <Option value="2021春季">2021春季</Option>
                <Option value="2021夏季">2021夏季</Option>
                <Option value="2021秋季">2021秋季</Option>
              </Select>
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
                更新课程信息
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterCourseModal;