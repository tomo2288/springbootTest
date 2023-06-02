var reportID = 1;
var articleID = 1;
var userID = 1;
var articleContent = "";
var articleStatus = "";
var articleResponse = "";
var number = 0;
var repeat = 0;
var buttonPage = 0;
var saveReportID = 0;

//顯示全部
$(document).ready(function init() {

    console.log("js載入成功");
    $.ajax({
        url: "http://localhost:8080/ski/BackendReport",
        type: "Post",
        data: {
            "reportID": reportID,
            "reportContent": reportContent,
            "action": "showAll"
        },
        data: "json",
        success: function (data) {
            // console.log(data.length);
            console.log("後端文章分類載入成功");
            // for (let i = 0; i < data.length; i++) {
            for (let i = 0; i < 10; i++) {
                let list_html = "";
                let reportID = data[i].reportID;
                let reportContent = data[i].reportContent;

                list_html += `<tr class="tr">`;
                list_html += `<td><p class="id">${reportID}</p></td>`;
                list_html += `<td> <p>${articleID}</p></td>`;
                list_html += `<td> <p>${reportContent}</p></td>`;
                list_html += `<td> <p class="red">未處理</p>
                            		 <p class="green -none">已處理</p></td>`;
                list_html += `<td> <p>${reportResponse}</p></td>`;
                list_html += `<td> <button class="nextPageBtn">檢舉處理</button></td>`;
                list_html += "</tr>";

                $("#type > table > tbody").append(list_html); // append順序由上往下
                                                                // prepend順序由下往上
                number = articleID; // 紀錄目前分類編號最後一碼
            }
            if (data.length > 10) {
                var pagination = $("#pagination");
                buttonPage = (data.length / 10) + 1;
                for (let i = 1; i < buttonPage; i++) {
                    let list_html = "";
                    if (i == 1) {
                        list_html += `
                        <button class="btn_limit -disabled">${i}</button>
                        `;
                    } else {
                        list_html += `
                        <button class="btn_limit">${i}</button>
                        `;
                    }
                    // 當點擊其中一個btn_limit，就將他加上-disabled，其餘的btn_limit
                    // 就刪掉-disabled
                    pagination.append(list_html);
                }
            }
            // fetchArticles(1, 10);

        },
        error: function (err) {
            console.log("後端文章分類載入失敗")
        }

    })
});

//分頁按鈕
$("#pagination").on("click", "button.btn_limit", function () {// 點擊任何分頁按鈕

    $(this).addClass("-disabled"); // 將按到的按鈕加上"-disabled"，讓他無法重覆被按
    var clickButtonNumber = $(this).text(); // 儲存所按到的按鈕號碼
    // console.log(clickButtonNumber);
    var buttons = document.getElementsByClassName("btn_limit"); // 儲存所按到的按鈕號碼
    // 迭代按鈕元素
    for (var i = 0; i < buttons.length; i++) { // 將剛剛兩個按鈕做比較，目的是為了讓沒被按到的按鈕刪掉"-disabled"，讓它們能被點擊
        // 檢查按鈕的文字是否為 clickButtonNumber
        if (buttons[i].textContent.trim() != clickButtonNumber) {
            // 刪除 "-disabled" class
            buttons[i].classList.remove("-disabled");
        }
    }
    $.ajax({
        url: "http://localhost:8080/ski/BackendReport",
        type: "Post",
        data: {
            "reportID": reportID,
            "reportContent": reportContent,
            "action": "showAll"
        },
        data: "json",
        success: function (data) {
            // console.log(data.length);
            $("#articleTableBody").empty();
            if (clickButtonNumber == 1) { // 當按到第一頁按鈕，只顯示10筆資料
                limit = 10;
            } else { // 因為我是每10筆資料分頁，所以第二頁之後就乘10，ex:第二頁最後一筆資料要為20
                limit = 10*clickButtonNumber;
            }
            for (let i = 0 + (10 * (clickButtonNumber - 1)); i < limit ; i++) {
                // 0 + (10 * (clickButtonNumber - 1)) 這算式可以得出每個分頁的
                // 第一筆資料要從0 + (10 * (clickButtonNumber - 1))筆資料開始印出
                // 因為第一筆資料是從data[0]開始算，所以1~10筆資料是data[0]~data[9]
                let list_html = "";
                let articleID = data[i].articleID;
                let articleContent = data[i].articleContent;

                list_html += `<tr class="tr">`;
                list_html += `<td><p class="id">${articleID}</p></td>`;
                list_html += `<td> <p class="para">${articleContent}</p> <input type="text" class="task_name_update -none" value="${articleContent}"></td>`;
                list_html += `<td> <button class="btn_update">修改</button>
                					<button class="btn_delete -none">刪除</button>
									<button class="btn_cancel -none">取消</button>
								</td>`;
                list_html += "</tr>";

                $("#type > table > tbody").append(list_html); // 加入網頁表格中
            }
        },
        error: function (err) {
            console.log("載入分頁失敗")
        }

    })

})

//點檢舉處理
$("#reportTableBody").on("click", "button.nextPageBtn", function () {
    saveArticleID = $(this).closest("tr").find("p.id").text();
    console.log(saveReportID);
    sessionStorage.setItem("saveReportID", saveReportID); // 存下ID
    window.location.href = "http://localhost:8080/ski/article/backend_Article_ChangeStatus.html"; // 將存下來的ID丟到此網址
});