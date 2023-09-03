const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

  async function newPost(event){
    event.preventDefault();


const title = document.querySelector('#post-title').value;
const post_description = document.querySelector('#post-description').value;


    try {
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({title, text}),
        headers: {"Content-Type": "application/json"},
    });

if (response.ok) {
    window.location.replace("./dashboard");
} else {
    throw new Error(`Error creating post: ${response.statusText}`);
 }

} catch (error) {
    console.error(error);
    alert("An error occured while creating the post")
 }
}
async function updatePost(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const post_description = document.querySelector('#post-description').value;
    
try {
    const response = await fetch('/api/posts', {
        method: 'PUT',
        body: JSON.stringify({title, description: post_description}),
        headers: {"Content-Type": "application/json"},
    });

if (response.ok) {
    window.location.replace("./dashboard");
} else {
    throw new Error(`Error updating post: ${response.statusText}`);
 }

} catch (error) {
    console.error(error);
    alert("An error occured while updating the post")
 }
} 
async function deletePost(postId)
try {
    const response = await fetch(`/comments/${postId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
});

if (response.ok) {
    window.location.reload("./dashboard");
} else {
    throw new Error(`Error deleting post: ${response.statusText}`);
 }

} catch (error) {
    console.error(error);
    alert("An error occured while deleting the post")
}

  async function newComment(event){
    event.preventDefault();


const commentPost = document.querySelector('#commentText').value;

const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length-1];



    try {
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({post_id, commentPost }),
        headers: {"Content-Type": "application/json"},
    });

if (response.ok) {
    window.location.reload();
} else {
    throw new Error(`Error creating post: ${response.statusText}`);
 }

} catch (error) {
    console.error(error);
    alert("An error occured while creating the post")
}
};

try {
const deleteComment = async(commentId) => {
    const response = await fetch(`/comments/${commentId}`, {
        method: "DELETE",
        header: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        window.location.reload();
    } else {
        throw new Error(`Error deleting post: ${response.statusText}`);
    }
};  
document.getElementById("deleteCommentButton").addEventListener("click", function(){
const selectedCommentId = this.getAttribute("data-comment-id");
deleteComment(selectedCommentId);
});   
} catch (error) {
        console.error(error);
        alert("An error occured while deleting the post")
}



    
document.querySelector("comment-form")
.addEventListener("submit", newComment)