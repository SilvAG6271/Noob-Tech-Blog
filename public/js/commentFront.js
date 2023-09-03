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