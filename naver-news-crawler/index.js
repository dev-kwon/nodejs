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
                const listTextInnerArr = $("#_rankingList0 > li > div > div > div").toArray();
                // console.log(bodyDecoded);
                // console.log($);
                // console.log(listTextInnerArr);
                const result = [];
                listTextInnerArr.forEach((div) => {
                    // result에 1. 뉴스글 url / 2. 뉴스제목 / 3. 작성자(언론사) 저장
                    const aFirst = $(div).find("a").first();
                    
                    const path = aFirst.attr("href"); // 첫번째 a 태그
                    const url = `https://news.naver.com/${path}` ; //도메인을 붙인 url 주소
                    const title = aFirst.text().trim(); // 공백 제거

                    // console.log(path);
                    // console.log(title);
                    // console.log(url, title);
                    const aLast = $(div).find("a").last();
                    const author = aLast.text().trim();

                    result.push({
                        url,
                        title,
                        author,
                    })
                });
                console.log(result);
                
            }
        }
    );
};
  
getNews();