let blogPostList = [];
let url =
  "https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==";

window.onload = function () {
  getData();
  openModal();
  // getComment();
};

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

  let date = new Date().toLocaleString("en-US");

  const data = {
    username: username,
    title: title,
    text: description,
    date: date,
  };
  fetch(url, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  addBlogPosts(data);
  $("form")[0].reset();
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
  deletePost.className = "deletePost";

  readMore.onclick = function () {
    window.location.href = "singlePost.html";
  };

  deletePost.addEventListener('click', (e) => {
    if (hasClass(e.target, 'deletePost')) {
      deleteSelectedPost(post)
      e.target.parentElement.remove();
    }
  })

  function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
  }

  function deleteSelectedPost(post) {
    let postId = post._id;
    fetch(`${url}&id=${postId}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((data) => console.log(data));
  };

  blogPost.setAttribute("align", "center");
  blogImage.setAttribute("src", "/images/sample.jpg");

  blogPost.style.margin = "50px";
  blogImage.style.margin = "20px";
  blogImage.style.height = "400px";
  blogImage.style.width = "400px";
};

const addBlogPosts = (post) => {
  blogPostList.push(post);
  renderBlogPosts()
}

const openModal = () => {
  $(".btn").click(function () {
    $("#myModal").modal("show");
  });

  $(".bs-example").style.position = "absolute";
  $(".bs-example").style.top = "145px";
  $(".bs-example").style.right = "20px";
};

// const getComment = () => {
//   // const addComment = document.getElementsByClassName('primaryContained');
//   alert("Comment added")

// }
