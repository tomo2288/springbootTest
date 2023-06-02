document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("courseTableBody");
  // 獲取數據並渲染表格
  AllCrouseRequsest();

  // 為刪除修、改按鈕綁定事件
  document
    .getElementById("courseTableBody")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("btn-delete")) {
        const courseID = event.target.dataset.courseId;
        deleteExc(courseID);
      } else if (event.target.classList.contains("btn-edit")) {
        const courseID = event.target.dataset.courseId;
      }
    });

  $("#serachbar").on("input", function () {
    var keyWord = $(this).val();
    $.ajax({
      url: "http://localhost:8080/ski/course_GBK",
      type: "POST",
      dataType: "json",
      data: { keyWord: keyWord },
      success: function (data) {
      	$("#courseTableBody").empty();
        renderCourse(data);
      },
      error: function () {
        console.log("error");
      },
    });
  });

  function AllCrouseRequsest() {
    $.ajax({
      url: "http://localhost:8080/ski/course_GA",
      type: "POST",
      dataType: "json",
      success: function (data) {
        renderCourse(data);
      },
      error: function () {
        console.log("error");
      },
    });
  }

  // 渲染商品表格
  function renderCourse(Course) {  

    Course.forEach((course) => {
      const row = document.createElement("tr");
      row.classList.add("align-middle");

      const editButton = document.createElement("button");
      editButton.classList.add("btn", "btn-secondary", "btn-edit");
      editButton.textContent = "修改";
      const editlink = document.createElement("a");
      editlink.href =
        "http://localhost:8080/ski/course/backend_courseUpdate.html?courseID=" +
        course.courseID;

      editlink.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-secondary", "btn-delete");
      deleteButton.textContent = "刪除";

      // 將日期格式轉換為 yyyy-MM-dd 格式
      const date = new Date(course.courseDate);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

      const base64Image = btoa(
        new Uint8Array(course.coursePhoto).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const imageSrc = `data:image/png;base64,${base64Image}`;

      row.innerHTML = `
      <th scope="row">${course.courseID}</th>
      <td><img src='${imageSrc}' style="max-width: 150px; max-height: 80px;"></img></td>
      <td>couchID</td>
      <td>${course.skill}</td>
      <td>${course.level}</td>
      <td>${course.courseName}</td>
      <td>授課地點</td>
      <td>${formattedDate}</td>
      <td>headcount/${course.courseMax}</td>
      <td>${course.courseStatus}</td>
      <td></td>
      <td></td>
    `;

      row.querySelector("td:nth-child(11)").appendChild(editlink);
      row.querySelector("td:nth-child(12)").appendChild(deleteButton);

      tableBody.appendChild(row);
    });
  }

  function deleteExc(courseID) {
    if (confirm("確認刪除此課程?")) {
      $.ajax({
        url: "http://localhost:8080/ski/course_DL",
        type: "POST",
        data: { CourseID: courseID },
        dataType: "json",
        success: function (data) {
          console.success(data);
        },
        error: function (error) {
          console.error(error);
        },
      });
      alarm("刪除成功");
      AllCrouseRequsest();
    } else {
      alarm("刪除失敗");
    }
  }
});
