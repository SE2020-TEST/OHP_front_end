const studentNames = [
    'Tom', 'Gregory', 'Steadfast', 'Keaton', 'Exalted', 'Moorish', 'Holly', 'Goddard', 'Howard', 'Kelsey', 'Valerie',
];

let studentList = [];
for (let i = 0; i < 11; ++i) {
    studentList.push({
        id:`${i}`,
        name: studentNames[i % studentNames.length],
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userId: `518${i}`,
        email: 'livingsu@sjtu.edu.cn',
        phone: '17872003000',
        role: 0,
        intro: '你好，云作业平台！',
        address: '上海市闵行区上海交通大学',
    })
}


export default studentList;