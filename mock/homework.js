const deadlines=[
    '2020-11-17 00:00:00',
    '2020-11-18 00:00:00',
    '2020-11-19 00:00:00',
    '2020-11-20 00:00:00',
];


const contents=[
    '<p>这里是作业内容！</p>'

];

//0为未完成,1为按时完成,2为迟交
const states=[
    0,1,2
];

const answers=[
    '<p>这里是参考答案！</p>'
];

const scores=[
    '55','60','65','70','75','80','85','90','95',
];


let hwList=[];
for(let i=0;i<158;++i){
    hwList.push(
        {
            id: `${i}`,
            title: `作业${i}`,//作业标题
            deadline: deadlines[i % deadlines.length],//截止时间
            content: contents[i % contents.length],//作业内容(html代码)
            state: states[i % states.length],//完成情况
            hasCorrected: i % 3 == 0 ? true : false,//是否被批改
            answer: answers[i % answers.length],//参考答案(html代码)
            score: scores[i % scores.length],//评分
            comment: `批注${i}`,//批注
            msg: `留言${i}`,//留言
        }
    )
}

export default {
    'POST  /hw/list': (req, res) => {
        const { sid } = req.query;
        // console.log("hwlist")
        // console.log(sid);
        return res.json(hwList);
    },

    'POST /hw/info': (req, res) => {
        const { hwid } = req.query;
        res.send(hwList.find(item => { return item.id == hwid }));
    },
};