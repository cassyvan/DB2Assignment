let blogPostList = [];
let url =
  "https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==";
const commentUrl =
  "https://mynotes33.azurewebsites.net/api/Comments?code=gf0aiT/bzaNOUl/t9YE2L4rsPnO2AEsraHqWCaGqo2sXKOYX3fmQXw==";

  window.onscroll = function () {scrollFunction()};

window.onload = function () {
  getData();
  openModal();

};

// getting
function getData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.response)
      setInitialBlogPosts(data.response);
    })
    .catch((error) => console.log(error));
}

// posting
async function postData() {
  let username = document.getElementById("userInput").value;
  let title = document.getElementById("userTitle").value;
  let description = document.getElementById("userDescription").value;
  let date = `Created: ${new Date().toLocaleString("en-US")}`;

  if (!username || !title || !description){
    alert("Information is missing. Please enter for all field provided.")
  } else {
    const data = {
      username: username,
      title: title,
      text: description,
      date: date,
    };
  
    await fetch(url, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert(`Blog Post '${title}' has been successfully created`);
    window.location.reload();
  
    // addBlogPosts(data);
  }
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
  const blogInfo = document.createElement("p");
  const divider = document.createElement("div");
  const updateBtn = document.createElement("a");
  const viewComments = document.createElement("a");
  const deletePost = document.createElement("a");
  updateBtn.className = "waves-effect waves-light btn-large";
  viewComments.className = "waves-effect waves-light btn-large";
  deletePost.className = "waves-effect waves-light btn-large";

  blogPost.className = "blogPost";
  divider.className = "blogPostDivider";

  if (initial) {
    blogTable.appendChild(blogPost);
  } else {
    blogTable.insertBefore(blogPost, blogTable.firstChild);
  }
  blogPost.appendChild(blogTitle);
  blogPost.appendChild(blogInfo);
  blogPost.appendChild(divider);
  blogPost.appendChild(updateBtn);
  blogPost.appendChild(viewComments);
  blogPost.appendChild(deletePost);

  blogTitle.innerText = post.title.toUpperCase();
  blogInfo.innerText = `By ${post.username}\n${post.date}\n\n${post.text}`;
  updateBtn.innerText = "Edit Post";
  viewComments.innerText = "View Comments";
  deletePost.innerText = "Delete Post";

  blogPost.id = post._id;
  deletePost.id = "deletePost";

  updateBtn.onclick = function () {
    showEditPost(
      blogTitle,
      blogInfo,
      blogPost,
      updateBtn,
      viewComments,
      deletePost,
      post.username,
      post.date,
      post.text,
      divider
    );
  };

  viewComments.onclick = function (e) {
    let postID = e.target.parentElement.id;
    window.location.href = `singlePost.html?id=${postID}`;
  };

  deletePost.addEventListener("click", (e) => {
    if (e.target.id === "deletePost") {
      let text = "Are you sure?";
      if (confirm(text) == true) {
        deleteSelectedPost(post);
        e.target.parentElement.remove();
      }
    }
  });

  function hasClass(elem, className) {
    return elem.className.split(" ").indexOf(className) > -1;
  }
};

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
  deleteCommentsOfPost(post._id);
}

const deleteCommentsOfPost = (postId) => {
  fetch(commentUrl)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.response.length; i++) {
        if (data.response[i].title == postId) {
          fetch(`${commentUrl}&id=${data.response[i]._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => console.log(res))
            .catch((data) => console.log(data));
        }
      }
    })
    .catch((error) => console.log(error));
};

const addBlogPosts = (post) => {
  blogPostList.unshift(post);
  createPostElement(post, false);
};

const openModal = () => {
  $(".createBtn").click(function () {
    $("#myModal").modal("show");
  });

  $(".bs-example").style.position = "absolute";
  $(".bs-example").style.top = "145px";
  $(".bs-example").style.right = "20px";
};

function showEditPost(
  blogTitle,
  blogInfo,
  blogPost,
  updateBtn,
  viewComments,
  deletePost,
  username,
  date,
  blogText,
  divider
  ) {
  //Creating DOM elements for the user to use to edit posts
  let editTitle = document.createElement("input");
  let editUsername = document.createElement("p");
  let markupDate = document.createElement("p");
  let editText = document.createElement("textarea");
  const CANCEL_BTN = document.createElement("button");
  const SAVE_BTN = document.createElement("button");

  //Modifying editable DOM elements to start off containing the original post's content
  editTitle.setAttribute("type", "text");
  // editUsername.setAttribute("type", "text");
  editText.setAttribute("type", "text");
  editText.style.height = "300px"
  editTitle.setAttribute("value", blogTitle.innerText);
  editUsername.innerText = username;
  markupDate.innerText = date;
  editText.innerText = blogText;
  CANCEL_BTN.innerText = "Cancel";
  SAVE_BTN.innerText = "Save";
  CANCEL_BTN.className = "waves-effect waves-light btn";
  SAVE_BTN.className = "waves-effect waves-light btn";
  CANCEL_BTN.style.marginLeft = "10px";
  CANCEL_BTN.style.marginRight = "10px";

  //Putting all DOM elements into arrays to simplify code for next steps
  let originalItems = [
    blogTitle,
    blogInfo,
    divider,
    updateBtn,
    viewComments,
    deletePost,
  ];
  let newItems = [
    editTitle,
    editUsername,
    markupDate,
    editText,
    divider,
    CANCEL_BTN,
    SAVE_BTN,
  ];

  //Removing the original content from the post
  originalItems.forEach((blogItem) => {
    removeItemFromDOM(blogPost, blogItem);
  });

  //Adding editable fields for the user
  newItems.forEach((blogItem) => {
    addItemToDOM(blogPost, blogItem);
  });

  //Adding an onclick listener for the cancel button
  CANCEL_BTN.onclick = function () {
    putContentBack();
  };

  //Adding an onclick listener for the save button
  SAVE_BTN.onclick = function (e) {
    let postId = e.target.parentElement.id;
    let newDate = `Last modified: ${new Date().toLocaleString("en-US")}`;
    // username = editUsername.value;
    blogText = editText.value;
    blogTitle.innerText = editTitle.value.toUpperCase();
    blogInfo.innerText = `By ${username}\n${newDate}\n\n${blogText}`;
    putContentBack();
    updateDB(postId, editTitle.value, blogText, newDate);
  };

  const updateDB = (postId, title, description, date) => {
    const data = {
      username: username,
      title: title,
      text: description,
      date: date,
    };

    fetch(`${url}&id=${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  //Puts all the content back the way it was before either modified or not so that the post looks normal again
  function putContentBack() {
    newItems.forEach((blogItem) => {
      removeItemFromDOM(blogPost, blogItem);
    });

    originalItems.forEach((blogItem) => {
      addItemToDOM(blogPost, blogItem);
    });
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

function scrollFunction() {
  if (
    document.body.scrollTop > 2000 ||
    document.documentElement.scrollTop > 2000
  ) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
