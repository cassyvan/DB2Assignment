let blogPostList = [];
let url = "https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==";

window.onload = function () {
  getData();
  openModal();
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
  blogPostList.reverse().forEach((post) => {
    createPostElement(post, true);
  });
};

const createPostElement = (post, initial) => {
  const blogTable = document.getElementById("container");
  const blogPost = document.createElement("div");
  const blogTitle = document.createElement("h4");
  const blogInfo = document.createElement("p")
  const updateBtn = document.createElement("button");
  const viewComments = document.createElement("button");
  const deletePost = document.createElement("button");

  if (initial) {
    blogTable.appendChild(blogPost);
  } else {
    blogTable.insertBefore(blogPost, blogTable.firstChild);
  }
  blogPost.appendChild(blogTitle);
  blogPost.appendChild(blogInfo);
  blogPost.appendChild(updateBtn);
  blogPost.appendChild(viewComments);
  blogPost.appendChild(deletePost);

  blogTitle.innerText = post.title;
  blogInfo.innerText = `By ${post.username} \n ${post.date} \n ${post.text}`;
  updateBtn.innerText = "Edit Post";
  viewComments.innerText = "View Comments";
  deletePost.innerText = "Delete Post";

  blogPost.id = post._id;
  deletePost.className = "deletePost";

  updateBtn.onclick = function() {
    showEditPost(blogTitle, blogUser, blogText, blogPost, updateBtn, readMore, blogDate);
  }

  viewComments.onclick = function (e) {
    let postID = e.target.parentElement.id;
    window.location.href = `singlePost.html?id=${postID}`;
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
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((data) => console.log(data));
  };

  blogPost.setAttribute("align", "center");
  blogPost.style.margin = "50px";
};

const addBlogPosts = (post) => {
  blogPostList.unshift(post);
  createPostElement(post, false)
}

const openModal = () => {
  $(".btn").click(function () {
    $("#myModal").modal("show");
  });

  $(".bs-example").style.position = "absolute";
  $(".bs-example").style.top = "145px";
  $(".bs-example").style.right = "20px";
};

function showEditPost(blogTitle, blogUser, blogText, blogPost, updateBtn, readMore, blogDate) {
  //Creating DOM elements for the user to use to edit posts
  let editTitle = document.createElement("input");
  let editUser = document.createElement("input");
  let editText = document.createElement("textarea");
  const CANCEL_BTN = document.createElement("button");
  const SAVE_BTN = document.createElement("button");

  //Modifying editable DOM elements to start off containing the original post's content
  editTitle.setAttribute("type", "text");
  editUser.setAttribute("type", "text");
  editText.setAttribute("type", "text");
  editTitle.setAttribute("value", blogTitle.innerText);
  editUser.setAttribute("value", blogUser.innerText);
  editText.innerText = blogText.innerText;
  CANCEL_BTN.innerText = "Cancel";
  SAVE_BTN.innerText = "Save";

  //Putting all DOM elements into arrays to simplify code for next steps
  let originalItems = [blogTitle, blogUser, blogDate, blogText, updateBtn, readMore];
  let newItems = [editTitle, editUser, blogDate, editText, CANCEL_BTN, SAVE_BTN];

  //Removing the original content from the post
  originalItems.forEach((blogItem) => {
    removeItemFromDOM(blogPost, blogItem);
  })

  //Adding editable fields for the user
  newItems.forEach((blogItem) => {
    addItemToDOM(blogPost, blogItem);
  })

  //Adding an onclick listener for the cancel button
  CANCEL_BTN.onclick = function() {
    putContentBack();
  }

  //Adding an onclick listener for the save button
  SAVE_BTN.onclick = function() {
    // updatePost(blogUser.innerText, blogTitle.innerText, blogText.innerText, editUser.value, editTitle.value, editText.value);
    blogTitle.innerText = editTitle.value;
    blogUser.innerText = editUser.value;
    blogText.innerText = editText.value;

    putContentBack();
  }

  //Puts all the content back the way it was before either modified or not so that the post looks normal again
  function putContentBack() {
    newItems.forEach((blogItem) => {
      removeItemFromDOM(blogPost, blogItem);
    })

    originalItems.forEach((blogItem) => {
      addItemToDOM(blogPost, blogItem);
    })
  }
}

//Removes a DOM item from a parent DOM element. Both need to be passed in.
function removeItemFromDOM(parentObject, obectToRemove) {
  parentObject.removeChild(obectToRemove);
}

//Adds a DOM item to a parent DOM element. Both need to be passed in.
function addItemToDOM(parentObject, obectToAdd) {
  parentObject.appendChild(obectToAdd);
}
