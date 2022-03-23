let blogData = [];

// getting
function getData() {
  let url =
    "https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderBlogPost(data.response);
    })
    .catch((error) => console.log(error));
}

// posting
function postData() {
  const data = {
    title: "title",
    text: "text",
  };
  fetch(
    "https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==",
    {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
}

const renderBlogPost = (blogPostInfo) => {
  const blogTable = document.getElementById("table");
  const blogPost = document.createElement("th");
  let lastPost = blogPostInfo.length - 1;

  blogPost.innerText = blogPostInfo[lastPost].text;

  blogTable.appendChild(blogPost);
  console.log(blogPostInfo);
};
