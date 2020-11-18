const teacherNames = [
    '张峰', '周志华', '邹鹏', '陈昊鹏', '陈雨婷', '冯卫国', '吴爱文', '刘志勇', '杨昌俊', '熊德文',
];

let teacherList = [];
for (let i = 0; i < 20; ++i) {
    teacherList.push({
        name: teacherNames[i % teacherNames.length],
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userId: `418${i}`,
        email: 'livingsu@sjtu.edu.cn',
        phone: '17872003000',
        role: 1,
        intro: '你好，云作业平台！',
        address: '上海市闵行区上海交通大学',
    })
}

export default teacherList;