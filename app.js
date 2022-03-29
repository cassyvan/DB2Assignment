// let blogData = [];

window.onload = function(){
  getData();
  openModal();
  // getComment();
};

const alertTest = () => {
  alert("Workings")
}
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
  const blogInfo = document.createElement("p")
  const readMore = document.createElement("button");

  blogTable.appendChild(blogPost);
  blogPost.appendChild(blogImage);
  blogPost.appendChild(blogTitle);
  blogPost.appendChild(blogInfo);
  blogPost.appendChild(readMore);

  blogTitle.innerText = title
  blogInfo.innerText = `By ${username} \n ${date} \n ${text}`
  readMore.innerText = "Read More";
  readMore.onclick = function() {
    window.location.href=`singlePost.html?username=${username}&title=${title}`
  }

  blogPost.id = 
  blogPost.setAttribute('align', 'center');
  blogImage.setAttribute('src', '/images/sample.jpg');

  blogPost.style.margin = "50px";
  blogImage.style.margin = "20px";
  blogImage.style.height = "400px";
  blogImage.style.width = "400px";
}

const openModal = () => {
  $(".btn").click(function(){
    $("#myModal").modal('show');
  });

  $(".bs-example").style.position = "absolute";
  $(".bs-example").style.top = "145px";
  $(".bs-example").style.right = "20px";
}

// const getComment = () => {
//   // const addComment = document.getElementsByClassName('primaryContained');
//   alert("Comment added")
  
// }

  
