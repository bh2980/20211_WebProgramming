// table.courTable
//        tbody
//           tr
//             th th1~th17

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async() => {
    try {
        return await axios.get("http://my.knu.ac.kr/stpo/stpo/cour/listLectPln/list.action?search_open_crse_cde=1O01&sub=1O&search_open_yr_trm=20211");

    } catch (error) {
        console.error(error);
    }
};

getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("table.courTable tbody tr").children("th.th5");

        console.log(ulList);
    })
    .then(res => log(res));