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
    const coursePhoto = document.getElementById("coursePhoto").files[0];
    const courseIntroduce = document.getElementById("courseIntroduce").value;

    // Create FormData object to store form data
    const formData = new FormData();
    console.log(courseSkill);
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
      url: "http://localhost:8080/ski/course_IS", // Replace 'your_server_endpoint' with the actual endpoint URL
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert("新增成功");
      },
      error: function () {
        alert("新增失敗");
      },

      //   function (status, error) {
      //     console.error("Request failed. Status:", status, "Error:", error);

      //     }
    });
  }
});
