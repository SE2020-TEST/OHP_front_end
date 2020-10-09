import React from "react";
import {Layout, Tabs, Table, Button, Input,Space,Popconfirm} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import "../Assets/Css/CourseListPage.css";

const {Content} = Layout;
const {TabPane} = Tabs;

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            currentPage: 1,
            searchText: '',
            searchedColumn: '',
        }
        this.columns = [
            {
                title: <b>课程名</b>,
                dataIndex: 'title',
                key: 'title',
                ...this.getColumnSearchProps('title'),
            },
            {
                title: <b>学期</b>,
                dataIndex: 'semester',
                key: 'semester',
                ...this.getColumnSearchProps('semester'),
            },
            {
                title: <b>任课教师</b>,
                dataIndex: 'teacher',
                key: 'teacher',
                ...this.getColumnSearchProps('teacher'),
            },
            {
                title: <b>持续时间</b>,
                dataIndex: 'duration',
                key: 'duration',
                ...this.getColumnSearchProps('duration'),
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.courseList.length >= 1 ? (
                        <div>
                            <Button onClick={()=>this.goToCourseInfo(record)}>查看详情</Button>
                            &nbsp;&nbsp;
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteCourse(record.key)}>
                                <Button>删除</Button>
                            </Popconfirm>
                        </div>

                    ) : null,
            },
        ];
        this.getCourseList = this.getCourseList.bind(this);
    }

    getCourseList(tabKey) {
        console.log("change:" + tabKey)

        let list = [];
        for (let i = 0; i < 26; ++i) {
            let title = `电路基础${i}`;
            if (tabKey === "1" || tabKey === undefined)
                title += `(正在进行)`;
            else if (tabKey === "2")
                title += `(已结束)`;
            else if (tabKey === "3")
                title += `(所有课程)`;
            list.push({
                key: i,
                title: title,
                semester: `20年秋季`,
                teacher: `Zhang Feng`,
                duration: `18周`
            });
        }
        this.setState({courseList: list});
    }

    componentDidMount() {
        this.getCourseList(this.props.tabKey);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.tabKey !== this.props.tabKey) {
            console.log("next:" + nextProps.tabKey);
            this.getCourseList(nextProps.tabKey);
        }
    }

    //跳转到相应课程页面
    goToCourseInfo(record){
        console.log("goto");
        console.log(record)
        sessionStorage.setItem("courseId", record.key);
        sessionStorage.setItem("courseTitle", record.title);
        this.props.history.push('/home/course');
    }

    deleteCourse(key){
        const list=[...this.state.courseList];
        this.setState({courseList:list.filter((item)=>item.key!==key)});
    }

    //搜索
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        console.log("tabKey:" + this.props.tabKey);
        const paginationProps = {
            position: ['bottomCenter'],
            showSizeChanger: true,//设置每页显示数据条数
            showQuickJumper: true
        }

        return (
            <div className="site-layout-content">
                <Table history={this.props.history}
                       columns={this.columns}
                       dataSource={this.state.courseList}
                       bordered
                       pagination={paginationProps}
                       footer={() => {
                           return <div>共<b>{this.state.courseList.length}</b>条记录</div>
                       }}/>
            </div>
        );
    }
}

class CourseListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabKey: "1",
            courseList: [],
            currentPage: 1
        }
        this.changeTabKey = this.changeTabKey.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    changeTabKey(key) {
        this.setState({tabKey: key});
    }

    createCourse() {
        this.props.history.push("/home/createCourse");
    };

    searchCourse(value) {

    }

    render() {
        return (
            <Content style={{padding: '50px'}}>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.changeTabKey}
                          tabBarExtraContent={<Button onClick={this.createCourse}>新建课程</Button>}>
                        <TabPane tab="正在进行" key="1">
                            <CourseList tabKey={this.state.tabKey} history={this.props.history}/>
                        </TabPane>
                        <TabPane tab="已结束" key="2">
                            <CourseList tabKey={this.state.tabKey} history={this.props.history}/>
                        </TabPane>
                        <TabPane tab="所有课程" key="3">
                            <CourseList tabKey={this.state.tabKey} history={this.props.history}/>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        );
    }
}

export default CourseListPage;
