let ajaxImpl = (str) => {
  console.log("Searching for:", str);

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let tableBody = document.getElementById("tblBody");
      tableBody.innerHTML = "";

      let responseData = this.responseText;
      let jsonObj = JSON.parse(responseData);

      jsonObj.forEach((item, index) => {
        let row = document.createElement("tr");

        // Column 1: Course ID
        let column = document.createElement("td");
        column.textContent = item.course_id;  // Match key with your data
        row.appendChild(column);

        // Column 2: Course Name
        column = document.createElement("td");
        column.textContent = item.course_name;
        row.appendChild(column);

        
        tableBody.appendChild(row);
      });
    }
  };

  xhttp.open("GET", "courses/search?sd=" + encodeURIComponent(str), true);
  xhttp.send();
};
