import { Modal, Button, Form, Tooltip, Input, Select, message, DatePicker } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getUserinfo } from '@/utils/userinfo';
import { postRequest } from '@/utils/request';

const { Option } = Select;

//日期只能往后选择
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

const AddSectionModal = (props) => {
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
    //这里添加新section
    let payload={
      cid:value.cid,
      uid:getUserinfo().id,
      endTime:value.endTime.format('YYYY-MM-DD'),
      semester:value.semester
    }

    postRequest('/section/add',payload,(data)=>{
      message.success('新建课程成功');
      props.forceUpdate();//强制重新刷新
    });
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
        title="新建课程(选择学期)"
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
            <Form.Item
              name="endTime"
              label={"截止时间"}
              rules={[
                {
                  required: true,
                  message: '请输入截止时间!',
                },
              ]}
            >
              <DatePicker
                disabledDate={disabledDate}
                disabledTime={disabledDateTime} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                新建课程
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddSectionModal;