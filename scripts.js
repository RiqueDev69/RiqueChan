import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"; // Import the specific Firebase service you need

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBw9CIcjmwMVC7N105s3H7vqnf1H9r6gAs",
    authDomain: "riquechan-18ec8.firebaseapp.com",
    databaseURL: "https://riquechan-18ec8-default-rtdb.firebaseio.com",
    projectId: "riquechan-18ec8",
    storageBucket: "riquechan-18ec8.appspot.com",
    messagingSenderId: "586054529399",
    appId: "1:586054529399:web:e27aff834b76c1cb5df172"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function () {
  const newPostBtn = document.getElementById("newPostBtn");
  const modal = document.getElementById("modal");
  const postTitle = document.getElementById("postTitle");
  const postContent = document.getElementById("postContent");
  const publishBtn = document.getElementById("publishBtn");
  const postList = document.getElementById("postList");
  const postsRef = database.ref("posts");

  newPostBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  modal.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });

  publishBtn.addEventListener("click", function () {
    const title = postTitle.value;
    const content = postContent.value;

    if (title && content) {
      const newPostRef = postsRef.push();
      newPostRef.set({
        title: title,
        content: content
      });

      fetchPosts();

      postTitle.value = "";
      postContent.value = "";
      modal.style.display = "none";
    }
  });

  function fetchPosts() {
    postsRef.once("value").then(snapshot => {
      const data = snapshot.val();
      const postArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));

      postList.innerHTML = postArray.map(post => `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
        </div>
      `).join("");
    });
  }

  // Call the fetchPosts function when the page is loaded
  fetchPosts();
});
