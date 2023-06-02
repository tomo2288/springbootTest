// Usage example: Call the function with the course ID to retrieve the information
const urlParams = new URLSearchParams(window.location.search);
const courseID = urlParams.get("courseID"); //

$(document).ready(function () {
  getCourseInfo();

  // Get form element by ID
  const form = $("#courseForm");

  // Add event listener for form submission
  $("#addButton").on("click", function (event) {
    event.preventDefault(); // Prevent form from being submitted
    // Reset error messages
    $(".text-danger").addClass("d-none");

    // Validate form inputs
    let isValid = true;

    form
      .find(
        'select, input[type="text"], input[type="file"], input[type="date"], textarea'
      )
      .each(function () {
        const input = $(this);
        const value = input.val();
        if (value === null || value === "") {
          const errorMsg = input.parent().parent().siblings(".text-danger");
          errorMsg.removeClass("d-none");
          isValid = false;
        }
      });

    if (isValid) {
      // Get form values
      const courseSkill = document.getElementById("courseSkill").value;
      const courseLevel = document.getElementById("courseLevel").value;
      const courseName = document.getElementById("courseName").value;
      const courseLocation = document.getElementById("coursePrice").value;
      const courseDate = document.getElementById("courseDate").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const coursePrice = document.getElementById("coursePrice").value;
      const courseMax = document.getElementById("courseMax").value;
      const courseMin = document.getElementById("courseMin").value;
      const courseStatus = document.getElementById("courseStatus").value;
      const courseIntroduce = document.getElementById("courseIntroduce").value;

      let coursePhoto = document.getElementById("coursePhoto").files[0];
      if (!coursePhoto) {
        const originalBase64 =
          document.getElementById("originalImage").dataset.originalImage; // 獲取 originalBase64 的值
        if (typeof originalBase64 === "undefined") {
          console.error("原始圖片的URL格式不正確，無法提取base64數據。");
          return;
        }
        const cleanedBase64 = originalBase64.replace(/(\r\n|\n|\r)/gm, "");
        const blob = base64ToBlob(cleanedBase64, "image/png");
        coursePhoto = new File([blob], "coursePhoto.png", { type: blob.type });
      }

      // Create FormData object to store form data
      const formData = new FormData();
      formData.append("courseID", courseID);
      formData.append("courseSkill", courseSkill);
      formData.append("courseLevel", courseLevel);
      formData.append("courseName", courseName);
      formData.append("courseLocation", courseLocation);
      formData.append("courseDate", courseDate);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("coursePrice", coursePrice);
      formData.append("courseMax", courseMax);
      formData.append("courseMin", courseMin);
      formData.append("courseStatus", courseStatus);
      formData.append("coursePhoto", coursePhoto);
      formData.append("courseIntroduce", courseIntroduce);

      $.ajax({
        url: "http://localhost:8080/ski/course_UD",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          alert("更新成功");
        },
        error: function () {
          alert("更新失敗");
        },
      });
    }
  });
});

// Function to retrieve course information by ID
function getCourseInfo() {
  // Perform AJAX request to fetch course data
  $.ajax({
    url: "http://localhost:8080/ski/course_GBI",
    data: { courseID: courseID },
    type: "POST",
    success: function (response) {
      const courseDate = moment(response.courseDate).format("YYYY-MM-DD");
      const startDate = moment(response.startDate).format("YYYY-MM-DD");
      const endDate = moment(response.endDate).format("YYYY-MM-DD");

      $("#courseSkill").val(response.skill);
      $("#courseLevel").val(response.level);
      $("#courseName").val(response.courseName);
      $("#courseLocation").val(response.pointID);
      $("#courseDate").val(courseDate);
      $("#startDate").val(startDate);
      $("#endDate").val(endDate);
      $("#coursePrice").val(response.coursePrice);
      $("#courseMax").val(response.courseMax);
      $("#courseMin").val(response.courseMin);
      $("#courseStatus").val(response.courseStatus);

      const base64Image = btoa(
        new Uint8Array(response.coursePhoto).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const imageSrc = `data:image/png;base64,${base64Image}`;
      document.getElementById("originalImage").src = imageSrc;
      document.getElementById("originalImage").dataset.originalImage =
        base64Image;

      $("#courseIntroduce").val(response.courseIntroduce);

      // Additional handling or UI updates can be done here if needed
    },
    error: function (status, error) {
      console.error("Request failed. Status:", status, "Error:", error);
    },
  });
}
