const studentNames = [
    '杨修贤', '李元良', '沈宏达', '罗俊拔', '刘翔飞', '于曾琪', '石才艺', '易德馨', '方正青', '罗开霁', '常俊美', '姚玉树',
];

let studentList = [];
for (let i = 0; i < 140; ++i) {
    studentList.push({
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