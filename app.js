let blogPostList = [];
let url =
  "https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==";

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
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setInitialBlogPosts(data.response);
    })
    .catch((error) => console.log(error));
}

// posting
function postData() {
  let username = document.getElementById("userInput").value;
  let title = document.getElementById("userTitle").value;
  let description = document.getElementById("userDescription").value;

  // var today = new Date();
  // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+ ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let date = new Date().toLocaleString('en-US')


  const data = { 
      username: username,
      title: title,
      text: description,
      date: date
    };
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  updateBlogPosts(true, data);
  $('form')[0].reset();

}

const setInitialBlogPosts = (blogPostInfo) => {
  blogPostInfo.forEach((post) => {
    blogPostList.push(post);
  });

  renderBlogPosts();
};

const renderBlogPosts = () => {
  blogPostList.forEach((post) => {
    createPostElement(post);
  });
};

const createPostElement = (post) => {
  const blogTable = document.getElementById("container");
  const blogPost = document.createElement("div");
  const blogImage = document.createElement("img");
  const blogTitle = document.createElement("h4");
  const blogUser = document.createElement("p");
  const blogDate = document.createElement("p");
  const blogText = document.createElement("p");
  const readMore = document.createElement("button");
  const deletePost = document.createElement("button");

  blogTable.appendChild(blogPost);
  blogPost.appendChild(blogImage);
  blogPost.appendChild(blogTitle);
  blogPost.appendChild(blogUser);
  blogPost.appendChild(blogDate);
  blogPost.appendChild(blogText);
  blogPost.appendChild(readMore);
  blogPost.appendChild(deletePost);

  blogTitle.innerText = post.title;
  blogUser.innerText = "By " + post.username;
  blogDate.innerText = post.date;
  blogText.innerText = post.text;
  readMore.innerText = "Read More";
  deletePost.innerText = "Delete Post";

  readMore.onclick = function () {
    window.location.href = "singlePost.html";
  };

  deletePost.onclick = () => {
    console.log(post._id);
    updateBlogPosts(false, post);
  };
  blogPost.setAttribute('align', 'center');
  blogImage.setAttribute('src', '/images/sample.jpg');

  blogPost.style.margin = "50px";
  blogImage.style.margin = "20px";
  blogImage.style.height = "400px";
  blogImage.style.width = "400px";
}

const updateBlogPosts = (add, post) => {
  if (add) {
    blogPostList.push(post);
  } else {
    let postId = post._id;
    fetch(url + postId, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(postId),
    })
      .then((res) => console.log(res))
      // .then((res) => console.log(res))
      .catch((data) => console.log(data));
  }
  renderBlogPosts();
};

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

  
