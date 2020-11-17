import teacherList from './data/teacherList';

const titles = [
    '电路基础',
    '数据结构',
    '机器学习',
    '操作系统',
    '软件工程实践',
    '高等数学',
    '大学物理(A)',
    '数理方法',
];

const avatars = [
    'https://i.loli.net/2020/11/09/76zYupdN1CGDv4V.jpg',//电路基础
    'https://i.loli.net/2020/11/09/gbkCF4O82adrhl6.jpg',//数据结构
    'https://i.loli.net/2020/11/09/qg8IPcfyXo1Rtan.jpg',//机器学习
    'https://i.loli.net/2020/11/09/CtaGSncXQFTh8Oo.jpg',//操作系统
    'https://i.loli.net/2020/11/09/oHyNDVnM8QkrpRK.jpg',//软件工程
    'https://i.loli.net/2020/11/09/jRzoPnJsrwySDMZ.jpg',//高数
    'https://i.loli.net/2020/11/09/XKJavleNR4gQ6Br.jpg',//大物
    'https://i.loli.net/2020/11/09/XZsqeJdfRAKtuQb.jpg',//数理方法
];

const descriptions = [
    '那是一种内在的东西， 他们到达不了，也无法触及的',
    '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    '生命就像一盒巧克力，结果往往出人意料',
    '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const textbooks = titles;

let courseList = [];
for (let i = 0; i < 8; ++i) {
    courseList.push({
        courseId: `SE-10${i}`,
        title: titles[i % titles.length],
        avatar: avatars[i % avatars.length],
        description: descriptions[i % descriptions.length],
        textbook: textbooks[i % textbooks.length],
    });
}


const semesters = [
    '2019春季',
    '2019夏季',
    '2019秋季',
    '2020春季',
    '2020夏季',
    '2020秋季',
    '2021春季',
    '2021夏季',
    '2021秋季',
];

let sectionList = [];
for (let i = 0; i < 18; ++i) {
    sectionList.push(
        {
            id: `${i}`,
            semester: semesters[i % semesters.length],
            processing: Math.round(Math.random()) == 0 ? true : false,
            course: courseList[i % courseList.length],
            teacher: teacherList[i % teacherList.length],
        }
    )
}

export default {
    'POST  /section/list': (req, res) => {
        const { uid, role, list_type } = req.query;

        let list = sectionList;
        if (list_type == 0) {
            list = list.filter((item) => { return item.processing == true });
        } else if (list_type == 1) {
            list = list.filter((item) => { return item.processing == false });
        }
        return res.json(list);
    },

    'POST /section/info': (req, res) => {
        const { sid } = req.query;        
        res.send(sectionList.find(item => { return item.course.courseId == sid }));
    },
};

