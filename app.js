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

// updating (will figure this out later)
function updatePost(currentUsername, currentTitle, currentDescription, newUsername, newTitle, newDescription) {
  const data = { 
      username: username,
      title: title,
      text: description,
      date: date
    };
    fetch("https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==", {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
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
  const blogTitle = document.createElement("h4")
  const blogUser = document.createElement("p")
  const blogDate = document.createElement("p")
  const blogText = document.createElement("p");
  const updateBtn = document.createElement("button");
  const readMore = document.createElement("button");

  blogTable.appendChild(blogPost);
  blogPost.appendChild(blogTitle);
  blogPost.appendChild(blogUser);
  blogPost.appendChild(blogDate);
  blogPost.appendChild(blogText);
  blogPost.appendChild(updateBtn);
  blogPost.appendChild(readMore);

  blogTitle.innerText = title
  blogUser.innerText = "By " + username;;
  blogDate.innerText = date;;
  blogText.innerText = text;
  updateBtn.innerText = "Edit Post";
  readMore.innerText = "Read More";
  updateBtn.onclick = function() {
    showEditPost(blogTitle, blogUser, blogText, blogPost, updateBtn, readMore, blogDate);
  }
  readMore.onclick = function() {
    window.location.href='singlePost.html'
  }

  blogPost.setAttribute('align', 'center');
  blogPost.style.margin = "50px";
}

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