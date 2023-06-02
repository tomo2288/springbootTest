var articleTypeID = 1;
var articleTypeContent = "";
var number = 0;
var repeat = 0;
var buttonPage = 0;

//顯示全部
$(document).ready(function init() {

    console.log("js載入成功");
    $.ajax({
        url: "http://localhost:8080/ski/BackendArticleType",
        type: "Post",
        data: {
            "articleTypeID": articleTypeID,
            "articleTypeContent": articleTypeContent,
            "action": "showAll"
        },
        dataType: "json",
        success: function (data) {
            // console.log(data.length);
            console.log("後端文章分類載入成功");
            // for (let i = 0; i < data.length; i++) {
            for (let i = 0; i < 10; i++) {
                let list_html = "";
                let articleTypeID = data[i].articleTypeID;
                let articleTypeContent = data[i].articleTypeContent;

                list_html += `<tr class="tr">`;
                list_html += `<td><p class="id">${articleTypeID}</p></td>`;
                list_html += `<td> <p class="para">${articleTypeContent}</p> <input type="text" class="task_name_update -none" value="${articleTypeContent}"></td>`;
                list_html += `<td> <button class="btn_update">修改</button>
                					<button class="btn_delete -none">刪除</button>
									<button class="btn_cancel -none">取消</button>
								</td>`;
                list_html += "</tr>"

                $("#type > table > tbody").append(list_html); // 加入網頁表格中
                number = articleTypeID; // 紀錄目前分類編號最後一碼
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

//分頁
// function fetchArticles(page, limit) {
//     $.ajax({
//         url: "http://localhost:8080/ski/BackendArticleType",
//         type: "Post",
//         data: {
//             "page": page, // 當前頁碼
//             "limit": limit, // 每頁的記錄數
//             "action": "showAll"
//             // "action": "limit" // 沒用到
//         },
//         success: function (data) {
//             /// 處理分頁結果
//             // 解析 JSON 格式的分頁數據
//             var result = JSON.parse(data);
//             console.log(result)
//             // var articlesType = result.length;  // 文章數據列表

//             $("#articleTypeTableBody").empty();

//             // 對返回的分頁數據進行處理和顯示
//             for (var i = 0; i < result.length; i++) {
//                 let list_html = "";
//                 var articleType = result[i];
//                 var articleTypeID = articleType.articleTypeID;
//                 var articleTypeContent = articleType.articleTypeContent;
//                 var articles = result.articles;  // 文章數據列表
//                 if (result.length > 10) { var count = (result.length / 10) + 1; };
//                 var totalPage = count;// 總頁數
//                 var currentPage = result.currentPage;  // 當前頁碼

//                 // 創建表格行並填充數據
//                 // var row = "<tr><td>" + articleTypeID + "</td><td>" + articleTypeContent + "</td></tr>";
//                 // $("#articleTypeTableBody").append(row);
//                 list_html += `<tr class="tr">
//                              <td><p class="id">${articleTypeID}</p></td> // 將最後分類編號加入網頁表格中，不這麼做網頁表格顯示的編號都會是"1"，要重整才會顯示正確結果
//                             <td>  <p class="para">${articleTypeContent}</p> <input type="text" class="task_name_update -none" value="${articleTypeContent}"></td>
//                             <td> <button class="btn_update">修改</button>
//                             <button class="btn_delete -none">刪除</button>
//                                     <button class="btn_cancel -none">取消</button></td>
//                             </tr>`;
//                 $("#articleTypeTableBody").append(list_html);
//             }


//             // 更新分頁按鈕或頁碼
//             updatePagination(totalPage, currentPage);

//             // 更新文章列表
//             $.ajax({
//                 url: "http://localhost:8080/ski/BackendArticleType",
//                 type: "Post",
//                 data: {
//                     "page": page, // 當前頁碼
//                     "limit": limit, // 每頁的記錄數
//                     "action": "limit"
//                     // "action": "limit" // 沒用到
//                 },
//                 success: function (data) {
//                 }
//             })
//             // 其他操作
//             // ...
//         },
//         error: function (xhr, status, error) {
//             // 處理錯誤
//             // ...
//         }
//     });
// }

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
        url: "http://localhost:8080/ski/BackendArticleType",
        type: "Post",
        data: {
            "articleTypeID": articleTypeID,
            "articleTypeContent": articleTypeContent,
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
                limit = 10*clickButtonNumber;
            }
            for (let i = 0 + (10 * (clickButtonNumber - 1)); i < limit ; i++) {
                let list_html = "";
                let articleTypeID = data[i].articleTypeID;
                let articleTypeContent = data[i].articleTypeContent;

                list_html += `<tr class="tr">`;
                list_html += `<td><p class="id">${articleTypeID}</p></td>`;
                list_html += `<td> <p class="para">${articleTypeContent}</p> <input type="text" class="task_name_update -none" value="${articleTypeContent}"></td>`;
                list_html += `<td> <button class="btn_update">修改</button>
                					<button class="btn_delete -none">刪除</button>
									<button class="btn_cancel -none">取消</button>
								</td>`;
                list_html += "</tr>"

                $("#type > table > tbody").append(list_html); // 加入網頁表格中
            }
        },
        error: function (err) {
            console.log("載入分頁失敗")
        }

    })

})

//更新分頁按鈕
// function updatePagination(totalPage, currentPage) {
//     var pagination = $("#pagination");
//     pagination.empty();

//     for (var i = 1; i <= totalPage; i++) {
//         var button = $("<button>").text(i);
//         if (i === currentPage) {
//             button.addClass("active");
//         }
//         button.on("click", function () {
//             var page = parseInt($(this).text());
//             fetchArticles(page, 10);
//         });
//         pagination.append(button);
//     }
// }

//新增分類內容
$("button.task_add").on("click", function () {

    //$.trim()函数会移除字符串开始和末尾处的所有换行符，空格(包括连续的空格)和制表符。如果这些空白字符在字符串中间时，它们将被保留，不会被移除
    let task_text = $("input.task_name").val().trim(); // 將輸入的文字存下來

    let form_data2 = { // 將輸入的文字送入資料庫
        "articleTypeID": articleTypeID,
        "articleTypeContent": task_text,
        "action": "searchIDAndContentRepeat",
        "type": "String"
    }
    $.ajax({
        url: "http://localhost:8080/ski/BackendArticleType",
        type: "Post",
        data: form_data2,
        dataType: "json",
        beforeSend: function () { // 執行前對新增按鈕加入"-disabled"，讓按鈕沒辦法被連續啟動
            $("button.task_search").addClass("-disabled");
        },
        success: function (data) {
            if (data != {}) {
                repeat = data.length;
                // console.log(repeat);
            }
            if (($("input.task_name").val().trim() != "") && (repeat == 0)) { // 如果輸入的文字扣掉空格不為空值的話就執行

                if (!$(this).hasClass("-disabled")) { // 如果送出按鈕的class沒有"-disabled"就執行
                    let form_data = { // 將輸入的文字送入資料庫
                        "articleTypeID": articleTypeID,
                        "articleTypeContent": task_text,
                        "action": "addContent"
                    }
                    $.ajax({
                        url: "http://localhost:8080/ski/BackendArticleType",
                        type: "Post",
                        data: form_data,
                        dataType: "json",
                        beforeSend: function () { // 執行前對新增按鈕加入"-disabled"，讓按鈕沒辦法被連續啟動
                            $("button.task_add").addClass("-disabled");
                        },
                        success: function (data) {
                            loadDeleteContentAndShowAll();
                            $("#articleTypeTableBody").empty();
                            $("#pagination").empty();
                            $.ajax({
                                url: "http://localhost:8080/ski/BackendArticleType",
                                type: "Post",
                                data: {
                                    "articleTypeID": articleTypeID,
                                    "articleTypeContent": articleTypeContent,
                                    "action": "showAll"
                                },
                                dataType: "json",
                                success: function (data) {
                                    
                                    // console.log(data.length);
                                    console.log("後端文章分類載入成功");
                                    // for (let i = 0; i < data.length; i++) {
                                    for (let i = 0; i < 10; i++) {
                                        let list_html = "";
                                        let articleTypeID = data[i].articleTypeID;
                                        let articleTypeContent = data[i].articleTypeContent;

                                        list_html += `<tr class="tr">`;
                                        list_html += `<td><p class="id">${articleTypeID}</p></td>`;
                                        list_html += `<td> <p class="para">${articleTypeContent}</p> <input type="text" class="task_name_update -none" value="${articleTypeContent}"></td>`;
                                        list_html += `<td> <button class="btn_update">修改</button>
                                                            <button class="btn_delete -none">刪除</button>
                                                            <button class="btn_cancel -none">取消</button>
                                                        </td>`;
                                        list_html += "</tr>"

                                        $("#type > table > tbody").append(list_html); // 加入網頁表格中
                                        number = articleTypeID; // 紀錄目前分類編號最後一碼
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
                                    console.log("失敗")
                                }

                            })
                            // let list_html = "";
                            // // console.log(articleTypeID);
                            // list_html += `<tr class="tr">
                            //  <td><p class="id">${data.articleTypeID}</p></td> // 將最後分類編號加入網頁表格中，不這麼做網頁表格顯示的編號都會是"1"，要重整才會顯示正確結果
                            // <td>  <p class="para">${task_text}</p> <input type="text" class="task_name_update -none" value="${task_text}"></td>
                            // <td> <button class="btn_update">修改</button>
                            // <button class="btn_delete -none">刪除</button>
                            //         <button class="btn_cancel -none">取消</button></td>
                            // </tr>`;
                            // $("#type > table > tbody").append(list_html); // 將新增的分類加入網頁表格中
                            $("input.task_name").val(""); // 輸入框清空

                        },
                        complete: function () { // 執行結束後刪除送出按鈕的"-disabled"，恢復功能
                            $("button.task_add").removeClass("-disabled");
                        }
                    })
                }
            } else {
                alert("標題不可為空白或重複");
            }
        }
    })
});

//修改分類內容
$("#type > table > tbody").on("click", "button.btn_update", function () {

    if ($(this).attr("data-updating") == "true") { // 有 data-updating 就代表 ajax 正在傳輸中，資料正在更新中
        alert("資料更新中");
        return;
    }

    // console.log($(this).attr("data-edit"));
    if ($(this).attr("data-edit") == undefined) { // 進入編輯狀態
        $(this).attr("data-edit", true); // "data-edit"改為true
        $(this).closest("tr").find("p.para").toggleClass("-none"); // 將分類內容隱藏
        $(this).closest("tr").find("input.task_name_update").toggleClass("-none"); // 將分類內容修改框顯示
        $(this).closest("tr").find("button.btn_delete").toggleClass("-none"); // 顯示刪除按鈕
        $(this).closest("tr").find("button.btn_cancel").toggleClass("-none"); // 顯示取消按鈕
        $(this).html("確定"); // 將修改改成確認
    } else { // 進入檢視狀態
        let update_task_name = ($(this).closest("tr").find("input.task_name_update").val()).trim(); // 儲存輸入的文字
        let update_articleID = $(this).closest("tr").find("p.id").text(); // 儲存修改的分類內容的編號，不存這個會一直修改到編號"1"的分類內容

        if (update_task_name == "") { // 如果輸入的分類內容為空值就會跳出錯誤訊息
            alert("請輸入分類內容");
        } else { // 分類內容不為空值執行

            $(this).attr("data-updating", true).html('<i class="fas fa-spinner fa-spin"></i>');
            let closest_tr = $(this).closest("tr");
            let that = this;

            $.ajax({
                url: "http://localhost:8080/ski/BackendArticleType",  // 資料請求的網址
                type: "Post",
                data: {
                    "articleTypeID": update_articleID,
                    "articleTypeContent": update_task_name,
                    "action": "updateContent"
                },                  // 傳送資料到指定的 url
                //processData: false,
                dataType: "json",             // 預期會接收到回傳資料的格式： json | xml | html
                beforeSend: function () {       // 在 request 發送之前執行
                },
                success: function (data) {      // request 成功取得回應後執行
                    // console.log(data);

                    $(closest_tr).find("p.para").html(update_task_name).toggleClass("-none"); // 分類文章內容顯示
                    $(closest_tr).find("input.task_name_update").val(update_task_name).toggleClass("-none"); // 分類文章內容修改框隱藏
                    $(that).removeAttr("data-updating").removeAttr("data-edit").html("修改");  // 將確認改成修改
                    alert("更新成功"); // 跳出成功訊息
                    $(closest_tr).find("button.btn_delete").toggleClass("-none"); // 隱藏刪除按鈕
                    $(closest_tr).find("button.btn_cancel").toggleClass("-none"); // 隱藏取消按鈕


                },
                error: function (xhr) {         // request 發生錯誤的話執行
                    console.log("error");
                    console.log(xhr);
                },
                complete: function (xhr) {
                }
            });

        }
    }
});

// 刪除分類
$("#type > table > tbody").on("click", "button.btn_delete", function () {
    let delete_articleID = $(this).closest("tr").find("p.id").text(); // 儲存要刪除的分類內容的編號，不存這個會一直刪到編號"1"的分類內容
    let item_id = $(this).closest("tr").attr("data-id");
    let r = confirm("Are you sure?") // 跳出確認視窗
    // console.log(r);
    let that = this;
    if (r) { // 跳出視窗如果按確定(true)執行
        $.ajax({
            url: "http://localhost:8080/ski/BackendArticleType",
            type: "Post",
            data: {
                "articleTypeID": delete_articleID,
                "action": "deleteContent"
            },
            dataType: "json",
            success: function (data) {
                $(that).closest("tr").animate({ // 刪除動畫
                    "opacity": 0
                }, 1000, "swing", function () {
                    $(this).remove();
                    reload_sort()
                });
                loadDeleteContentAndShowAll();
                $("#articleTypeTableBody").empty();
                $("#pagination").empty();
                $.ajax({
                    url: "http://localhost:8080/ski/BackendArticleType",
                    type: "Post",
                    data: {
                        "articleTypeID": articleTypeID,
                        "articleTypeContent": articleTypeContent,
                        "action": "showAll"
                    },
                    dataType: "json",
                    success: function (data) {
                        // console.log(data.length);
                        // for (let i = 0; i < data.length; i++) {
                        for (let i = 0; i < 10; i++) {
                            let list_html = "";
                            let articleTypeID = data[i].articleTypeID;
                            let articleTypeContent = data[i].articleTypeContent;

                            list_html += `<tr class="tr">`;
                            list_html += `<td><p class="id">${articleTypeID}</p></td>`;
                            list_html += `<td> <p class="para">${articleTypeContent}</p> <input type="text" class="task_name_update -none" value="${articleTypeContent}"></td>`;
                            list_html += `<td> <button class="btn_update">修改</button>
                                                            <button class="btn_delete -none">刪除</button>
                                                            <button class="btn_cancel -none">取消</button>
                                                        </td>`;
                            list_html += "</tr>"

                            $("#type > table > tbody").append(list_html); // 加入網頁表格中
                            number = articleTypeID; // 紀錄目前分類編號最後一碼
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
                        console.log("失敗")
                    }

                })

            },
            error: function (xhr) {
                console.log("error");
                console.log(xhr);
            }
        });
    }
});

// 取消修改
$("#type > table > tbody").on("click", "button.btn_cancel", function () {
    let update_task_name = ($(this).closest("tr").find("input.task_name_update").val()).trim(); // 儲存輸入的文字
    let closest_tr = $(this).closest("tr");
    $(closest_tr).find("p.para").html(update_task_name).toggleClass("-none"); // 分類文章內容顯示
    $(closest_tr).find("input.task_name_update").val(update_task_name).toggleClass("-none"); // 分類文章內容修改框隱藏
    $(this).closest("tr").find("button.btn_update").removeAttr("data-updating").removeAttr("data-edit").html("修改");  // 將確認改成修改
    alert("已取消修改"); // 跳出成功訊息
    $(closest_tr).find("button.btn_delete").toggleClass("-none"); // 隱藏刪除按鈕
    $(closest_tr).find("button.btn_cancel").toggleClass("-none"); // 隱藏取消按鈕
});



// 即時重整(配合刪除動畫)
function reload_sort() {
    let sort_item = [];
    $("ul.task_list").children("li").each(function (i, item) {
        //console.log(i);
        $(this).attr("data-sort", (i + 1));
        sort_item.push({
            item_id: $(this).attr("data-id"),
            sort: $(this).attr("data-sort")
        });
    });
}

// 重整刪除後的表格
function loadDeleteContentAndShowAll() {
    $.ajax({
        url: "http://localhost:8080/ski/BackendArticleType",
        type: "Post",
        data: {
            "articleTypeID": articleTypeID,
            "articleTypeContent": articleTypeContent,
            "action": "deleteContentAndShowAll"
        },
        dataType: "json",
        success: function (data) {
            $("#type > table > tbody").find("tr").remove(); // 刪除原網頁表格
            // console.log(data.length);
            for (let i = 0; i < 10; i++) { // 再把已經更變過的資料新增到網頁表格
                let list_html = "";
                let articleTypeID = data[i].articleTypeID;
                let articleTypeContent = data[i].articleTypeContent;

                list_html += `<tr class="tr">`;
                list_html += `<td><p class="id">${articleTypeID}</p></td>`;
                list_html += `<td> <p class="para">${articleTypeContent}</p> <input type="text" class="task_name_update -none" value="${articleTypeContent}"></td>`;
                list_html += `<td> <button class="btn_update">修改</button><button class="btn_delete -none">刪除</button>
										<button class="btn_cancel -none">取消</button></td>`;
                list_html += "</tr>"

                $("#type > table > tbody").append(list_html); // 加入網頁表格中
                number = articleTypeID; // 紀錄目前分類編號最後一碼
            }
        },
        error: function (xhr) {
            console.log("error");
            console.log(xhr);
        }
    });
}

//搜尋分類內容、編號
$("button.task_search").on("click", function () {
    let task_name_search = $("input.task_name_search").val().trim(); // 將輸入的文字存下來
    //	console.log(typeof(parseInt(task_name_search)));
    //	function processInput(input) {
    //    	if (!isNaN(parseInt(input))) {
    // 處理數字類型
    //        	console.log('輸入為數字');
    //    	} else {
    // 處理字串類型
    //       	console.log('輸入為字串');
    //    	}
    //	}
    //	processInput(task_name_search);
    if ($("input.task_name_search").val().trim() != "") { // 如果輸入的文字扣掉空格不為空值的話就執行

        if (!$(this).hasClass("-disabled")) { // 如果新增按鈕的class沒有"-disabled"就執行
            let form_data = {}
            if (!(isNaN(parseInt(task_name_search)))) {
                // console.log('輸入為數字');
                form_data = { // 將輸入的文字送入資料庫
                    "articleTypeID": task_name_search,
                    "articleTypeContent": articleTypeContent,
                    "action": "searchIDAndContent",
                    "type": "Number"
                }
            } else {
                // console.log('輸入為字串');
                form_data = { // 將輸入的文字送入資料庫
                    "articleTypeID": articleTypeID,
                    "articleTypeContent": task_name_search,
                    "action": "searchIDAndContent",
                    "type": "String"
                }
            }
            $.ajax({
                url: "http://localhost:8080/ski/BackendArticleType",
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
                        list_html += `<tr class="tr">`;
                        list_html += `<td><p class="id">${data.articleTypeID}</p></td>`;
                        list_html += `<td> <p class="para">${data.articleTypeContent}</p> <input type="text" class="task_name_update -none" value="${articleTypeContent}"></td>`;
                        list_html += `<td> <button class="btn_update">修改</button><button class="btn_delete -none">刪除</button>
										<button class="btn_cancel -none">取消</button></td>`;
                        list_html += "</tr>"

                        $("#type > table > tbody").append(list_html); // 加入網頁表格中
                        // number = articleTypeID; // 紀錄目前分類編號最後一碼

                    } else {
                        console.log('輸入為字串');
                        for (let i = 0; i < data.length; i++) { // 再把已經更變過的資料新增到網頁表格
                            let list_html = "";
                            let articleTypeID = data[i].articleTypeID;
                            let articleTypeContent = data[i].articleTypeContent;
                            console.log(articleTypeID);

                            list_html += `<tr class="tr">`;
                            list_html += `<td><p class="id">${articleTypeID}</p></td>`;
                            list_html += `<td> <p class="para">${articleTypeContent}</p> <input type="text" class="task_name_update -none" value="${articleTypeContent}"></td>`;
                            list_html += `<td> <button class="btn_update">修改</button><button class="btn_delete -none">刪除</button>
										<button class="btn_cancel -none">取消</button></td>`;
                            list_html += "</tr>"

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