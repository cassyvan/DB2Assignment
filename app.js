// let blogData = [];


window.onload = function(){
  // document.getElementById("modal").style.display='none';
  getData();
  $(".btn").click(function(){
    $("#myModal").modal('show');
  });

  $(".bs-example").style.position = "absolute";
  $(".bs-example").style.top = "145px";
  $(".bs-example").style.right = "20px";
};

// getting
function getData() {
  let url = "https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderBlogPost(data.response);
    })
    .catch((error) => console.log(error));
}

// posting
function postData() {
  var username = document.getElementById("userInput").value;
  var title = document.getElementById("userTitle").value;
  var description = document.getElementById("userDescription").value;

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+ ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


  const data = { 
      username: username,
      title: title,
      text: description,
      date: date
    };
    fetch('https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==', {
      method: 'POST', // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  createPostElement(username, title, description, date);
  $('form')[0].reset();

}

const renderBlogPost = (blogPostInfo) => {

  const blogTable = document.getElementById("container");
  // let lastPost = blogPostInfo.length - 1;
  let totalPost = blogPostInfo.length;

  if (totalPost != 0) {
    for (let i=0; i < totalPost; i++) {

      let username = blogPostInfo[i].username
      let title = blogPostInfo[i].title
      let text = blogPostInfo[i].text
      let date = blogPostInfo[i].date

      createPostElement(username, title, text, date);
    }
  }
  console.log(blogPostInfo);
};

const createPostElement = (username, title, text, date) => {
  const blogTable = document.getElementById("container");
  const blogPost = document.createElement("div");
  const blogImage = document.createElement("img")
  const blogTitle = document.createElement("h4")
  const blogUser = document.createElement("p")
  const blogDate = document.createElement("p")
  const blogText = document.createElement("p");
  const readMore = document.createElement("button");

  blogTable.appendChild(blogPost);
  blogPost.appendChild(blogImage);
  blogPost.appendChild(blogTitle);
  blogPost.appendChild(blogUser);
  blogPost.appendChild(blogDate);
  blogPost.appendChild(blogText);
  blogPost.appendChild(readMore);

  blogTitle.innerText = title
  blogUser.innerText = "By " + username;;
  blogDate.innerText = date;;
  blogText.innerText = text;
  readMore.innerText = "Read More";
  readMore.onclick = function() {
    window.location.href='singlePost.html'
  }

  blogPost.setAttribute('align', 'center');
  blogImage.setAttribute('src', '/images/sample.jpg');

  blogPost.style.margin = "50px";
  blogImage.style.margin = "20px";
  blogImage.style.height = "400px";
  blogImage.style.width = "400px";
}

