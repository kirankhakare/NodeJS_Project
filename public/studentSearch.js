function searchStudents(query) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let tableBody = document.getElementById("tblBody");
      tableBody.innerHTML = "";

      let jsonObj = JSON.parse(this.responseText);

      jsonObj.forEach((student) => {
        let row = document.createElement("tr");

        row.innerHTML = `
          <td>${student.student_id}</td>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.course_name}</td>
          <td>
            <a href="/students/edit/${student.student_id}" class="btn btn-sm btn-warning">Edit</a>
            <a href="/students/delete/${student.student_id}" class="btn btn-sm btn-danger"
              onclick="return confirm('Are you sure you want to delete this student?');">Delete</a>
          </td>
        `;

        tableBody.appendChild(row);
      });
    }
  };

  xhttp.open("GET", "/students/search?query=" + encodeURIComponent(query), true);
  xhttp.send();
}
