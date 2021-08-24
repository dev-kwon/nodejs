const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getNews = () => {
    request(
        {
            url: "https://news.naver.com/",
            method: "GET",
            encoding : null
        },
        (error, response, body) => {
            if (error) {
                console.error(error);
                return;
            }
            if (response.statusCode === 200) {
                console.log("response ok");
                // cheerio를 활용하여 body에서 데이터 추출
                const bodyDecoded = iconv.decode(body, "euc-kr").toString();
                const $ = cheerio.load(bodyDecoded);
                const listTextInnerArr = $("#_rankingList0 > li").toArray();
                // console.log(bodyDecoded);
                // console.log($);
                console.log(listTextInnerArr);
                
            }
        }
    );
};
  
getNews();