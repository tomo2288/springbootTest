var articleID = 1;
var userID = 1;
var articleTypeID = 1;
var articleTitle = "";
var articleContent = "";
var articleDateTime = "";
var articleModified = "";
var articleLike = 1;
var articleStatus = "";
var number = 0;
var buttonPage = 0;
var saveArticleID = 0;


//顯示全部
$(document).ready(function init() {

    console.log("js載入成功");
    $.ajax({
        url: "http://localhost:8080/ski/BackendArticle",
        type: "Post",
        data: {
            "articleID": articleID,
            "articleTitle": articleTitle,
            "articleStatus": articleStatus,
            "action": "showAll"
        },
        dataType: "json",
        success: function (data) {
            // console.log(data.length);
            console.log(data);
            console.log("後端文章分類載入成功");
            // for (let i = 0; i < data.length; i++) {
            for (let i = 0; i < 10; i++) {
                let list_html = "";
                let articleID = data[i].articleID;
                let articleTitle = data[i].articleTitle;
                if(data[i].articleStatus == "1"){
                    list_html += `<tr class="tr">`;
                    list_html += `<td><p class="id">${articleID}</p></td>`;
                    // list_html += `<td><a class="saveArticleID" href="http://localhost:8080/ski/article/backend_Article_ChangeStatus.html">${articleTitle}</a></td>`;
                    list_html += `<td><button class="nextPageBtn">${articleTitle}</button></td>`;
                    list_html += `<td><p class="green">上架</p>
                                        <p class="red -none">下架</p></td>`;
                    list_html += `</tr>`
                }else if(data[i].articleStatus == "0"){
                    list_html += `<tr class="tr">`;
                    list_html += `<td><p class="id">${articleID}</p></td>`;
                    // list_html += `<td><a class="saveArticleID" href="http://localhost:8080/ski/article/backend_Article_ChangeStatus.html">${articleTitle}</a></td>`;
                    list_html += `<td><button class="nextPageBtn">${articleTitle}</button></td>`;
                    list_html += `<td><p class="green -none">上架</p>
                                        <p class="red">下架</p></td>`;
                    list_html += `</tr>`
                }

                

                $("#type > table > tbody").append(list_html); // 加入網頁表格中
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
        },
        error: function (err) {
            console.log("後端文章分類載入失敗")
        }

    })
});

//點文章標題
$("#articleTableBody").on("click", "button.nextPageBtn", function () {
    saveArticleID = $(this).closest("tr").find("p.id").text();
    console.log(saveArticleID);
    sessionStorage.setItem("saveArticleID", saveArticleID); // 存下ID
    window.location.href = "http://localhost:8080/ski/article/backend_Article_ChangeStatus.html"; // 將存下來的ID丟到此網址
});

//ChangeStatus網頁
// $("#articleTableBody").on("click", "a.saveArticleID", function () {
//     saveArticleID = $(this).closest("tr").find("p.id").text();
//     sessionStorage.setItem("saveArticleID", saveArticleID); // 存下ID
//     window.location.href = "http://localhost:8080/ski/article/backend_Article_ChangeStatus.html"; // 將存下來的ID丟到此網址
// });

//分頁按鈕
$("#pagination").on("click", "button.btn_limit", function () {

    $(this).addClass("-disabled");
    var clickButtonNumber = $(this).text();
    console.log(clickButtonNumber);
    var buttons = document.getElementsByClassName("btn_limit");
    // 迭代按鈕元素
    for (var i = 0; i < buttons.length; i++) {
        // 檢查按鈕的文字是否為 clickButtonNumber
        if (buttons[i].textContent.trim() != clickButtonNumber) {
            // 刪除 "-disabled" class
            buttons[i].classList.remove("-disabled");
        }
    }
    $.ajax({
        url: "http://localhost:8080/ski/BackendArticle",
        type: "Post",
        data: {
            "articleID": articleID,
            "articleTitle": articleTitle,
            "articleStatus": articleStatus,
            "action": "showAll"
        },
        dataType: "json",
        success: function (data) {
            // console.log(data.length);
            $("#articleTypeTableBody").empty();
            // for (let i = 0; i < data.length; i++) {
            if (clickButtonNumber == 1) {
                limit = 10;
            } else {
                limit = 10 * clickButtonNumber;
            }
            for (let i = 0 + (10 * (clickButtonNumber - 1)); i < limit; i++) {
                let list_html = "";
                let articleID = data[i].articleID;
                let articleTitle = data[i].articleTitle;

                if(data[i].articleStatus == "1"){
                    list_html += `<tr class="tr">`;
                    list_html += `<td><p class="id">${articleID}</p></td>`;
                    // list_html += `<td><a class="saveArticleID" href="http://localhost:8080/ski/article/backend_Article_ChangeStatus.html">${articleTitle}</a></td>`;
                    list_html += `<td><button class="nextPageBtn">${articleTitle}</button></td>`;
                    list_html += `<td><p class="green">上架</p>
                                        <p class="red -none">下架</p></td>`;
                    list_html += `</tr>`
                }else if(data[i].articleStatus == "0"){
                    list_html += `<tr class="tr">`;
                    list_html += `<td><p class="id">${articleID}</p></td>`;
                    // list_html += `<td><a class="saveArticleID" href="http://localhost:8080/ski/article/backend_Article_ChangeStatus.html">${articleTitle}</a></td>`;
                    list_html += `<td><button class="nextPageBtn">${articleTitle}</button></td>`;
                    list_html += `<td><p class="green -none">上架</p>
                                        <p class="red">下架</p></td>`;
                    list_html += `</tr>`
                }

                $("#type > table > tbody").append(list_html); // 加入網頁表格中
            }
        },
        error: function (err) {
            console.log("載入分頁失敗")
        }

    })

})


//搜尋分類內容、編號
$("button.task_search").on("click", function () {
    let task_name_search = $("input.task_name_search").val().trim(); // 將輸入的文字存下來
    if ($("input.task_name_search").val().trim() != "") { // 如果輸入的文字扣掉空格不為空值的話就執行

        if (!$(this).hasClass("-disabled")) { // 如果新增按鈕的class沒有"-disabled"就執行
            let form_data = {}
            if (!(isNaN(parseInt(task_name_search)))) {
                // console.log('輸入為數字');
                form_data = { // 將輸入的文字送入資料庫
                    "articleID": task_name_search,
                    "articleTitle": articleTitle,
                    "action": "searchIDAndTitle",
                    "type": "Number"
                }
            } else {
                // console.log('輸入為字串');
                if(task_name_search === "上架"){
                    form_data = { // 將輸入的文字送入資料庫
                        "articleID": articleID,
                        "articleStatus": "1",
                        "action": "searchIDAndTitle",
                        "type": "上下架"
                    }
                }else if(task_name_search === "下架"){
                    form_data = { // 將輸入的文字送入資料庫
                        "articleID": articleID,
                        "articleStatus": "0",
                        "action": "searchIDAndTitle",
                        "type": "上下架"
                    }
                }else{
                    form_data = { // 將輸入的文字送入資料庫
                        "articleID": articleID,
                        "articleTitle": task_name_search,
                        "action": "searchIDAndTitle",
                        "type": "String"
                    }
                }
            }
            $.ajax({
                url: "http://localhost:8080/ski/BackendArticle",
                type: "Post",
                data: form_data,
                dataType: "json",
                beforeSend: function () { // 執行前對新增按鈕加入"-disabled"，讓按鈕沒辦法被連續啟動
                    $("button.task_search").addClass("-disabled");
                },
                success: function (data) {
                    console.log("搜尋成功");
                    // console.log(data);
                    $("#type > table > tbody").find("tr").remove(); // 刪除原網頁表格
                    if (!(isNaN(parseInt(task_name_search)))) {

                        console.log('輸入為數字');
                        let list_html = "";
                        if(data[i].articleStatus == "1"){
                            list_html += `<tr class="tr">`;
                            list_html += `<td><p class="id">${data.articleID}</p></td>`;
                            // list_html += `<td><a class="saveArticleID" href="http://localhost:8080/ski/article/backend_Article_ChangeStatus.html">${articleTitle}</a></td>`;
                            list_html += `<td><button class="nextPageBtn">${articleTitle}</button></td>`;
                            list_html += `<td><p class="green">上架</p>
                                                <p class="red -none">下架</p></td>`;
                            list_html += `</tr>`
                        }else if(data[i].articleStatus == "0"){
                            list_html += `<tr class="tr">`;
                            list_html += `<td><p class="id">${data.articleID}</p></td>`;
                            // list_html += `<td><a class="saveArticleID" href="http://localhost:8080/ski/article/backend_Article_ChangeStatus.html">${articleTitle}</a></td>`;
                            list_html += `<td><button class="nextPageBtn">${articleTitle}</button></td>`;
                            list_html += `<td><p class="green -none">上架</p>
                                                <p class="red">下架</p></td>`;
                            list_html += `</tr>`
                        }

                        $("#type > table > tbody").append(list_html); // 加入網頁表格中

                    } else {
                        console.log('輸入為字串');
                        for (let i = 0; i < data.length; i++) { // 再把已經更變過的資料新增到網頁表格
                            let list_html = "";
                            let articleID = data[i].articleID;
                            let articleTitle = data[i].articleTitle;
                            // console.log(data[i].articleStatus);
                            if(data[i].articleStatus == "1"){
                                list_html += `<tr class="tr">`;
                                list_html += `<td><p class="id">${articleID}</p></td>`;
                                // list_html += `<td><a class="saveArticleID" href="http://localhost:8080/ski/article/backend_Article_ChangeStatus.html">${articleTitle}</a></td>`;
                                list_html += `<td><button class="nextPageBtn">${articleTitle}</button></td>`;
                                list_html += `<td><p class="green">上架</p>
                                                    <p class="red -none">下架</p></td>`;
                                list_html += `</tr>`
                            }else if(data[i].articleStatus == "0"){
                                list_html += `<tr class="tr">`;
                                list_html += `<td><p class="id">${articleID}</p></td>`;
                                // list_html += `<td><a class="saveArticleID" href="http://localhost:8080/ski/article/backend_Article_ChangeStatus.html">${articleTitle}</a></td>`;
                                list_html += `<td><button class="nextPageBtn">${articleTitle}</button></td>`;
                                list_html += `<td><p class="green -none">上架</p>
                                                    <p class="red">下架</p></td>`;
                                list_html += `</tr>`
                            }

                            $("#type > table > tbody").append(list_html); // 加入網頁表格中
                            // number = articleTypeID; // 紀錄目前分類編號最後一碼
                        }
                    }
                },
                complete: function () { // 執行結束後刪除新增按鈕的"-disabled"，恢復功能
                    $("button.task_search").removeClass("-disabled");
                }
            })
        }
    } else {
        alert("搜尋不可為空");
    }
});