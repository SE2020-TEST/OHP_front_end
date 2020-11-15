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

const intros = [
    '那是一种内在的东西， 他们到达不了，也无法触及的',
    '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    '生命就像一盒巧克力，结果往往出人意料',
    '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const textbooks=titles;

const teachers = [
    '张峰',
    '周志华',
    '邹鹏',
    '陈昊鹏',
    '陈雨婷',
    '冯卫国',
    '吴爱文',
    '刘志勇',
    '杨昌俊',
    '熊德文',
];

const years = [
    '2017',
    '2018',
    '2019',
    '2020'
];

const semesters = [
    '春季',
    '夏季',
    '秋季',
];

const durations = [
    '12周',
    '16周',
    '18周',
    '20周',
];

let sectionList=[];
for(let i=0;i<8;++i){
    sectionList.push(
        {
            id: `${i}`,
            title: titles[i % titles.length],
            avatar: avatars[i % avatars.length],
            intro: intros[i % intros.length],
            textbook:textbooks[i%textbooks.length],
            teacher: teachers[i % teachers.length],
            year: years[i % years.length],
            semester: semesters[i % semesters.length],
            duration: durations[i % durations.length],
            processing: Math.round(Math.random()),
        }
    )
}

export default {
    'GET  /section/list': (req, res) => {
        return res.json(sectionList);
    },

    'POST /section/info': (req, res) => {
        const { sid } = req.query;
        res.send(sectionList.find(item=>{return item.id==sid}));
    },
};

