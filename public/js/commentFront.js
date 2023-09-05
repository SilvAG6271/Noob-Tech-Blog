document.addEventListener('DOMContentLoaded', () => {
    async function newFormHandler(event) {
        event.preventDefault();
        const commentTitle = document.querySelector('#comment-title').value.trim();
        const commentText = document.querySelector('#comment-text').value.trim();
        
    
        try { 
          const userData = await fetch('api/users/username')
          if (!userData.ok) {
            throw new Error(`Request failed with status ${userData.status}`);
          }
          const data = await userData.json();
          const username = data.username;
          console.log('username:', username)
    
       // Send post request to add a new blog post information
        let response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify ({
            title: commentTitle,
            text: commentText,
            username: username
            
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        //if blog post is added, the dashboard will be rendered
        if (response.ok) {
          window.location.replace('/homepage');
        } else {
          alert('Failed to add post');
        }
      } catch (error) {
        console.error('Fetch error', error);
        alert('Failed to fetch the username');
      }
    }
      
    
    
      const addCommentBtn = () => {
        const newCommentBtn = document.querySelector('#new-comment');
        if (newCommentBtn) {
        newCommentBtn.addEventListener('click', newFormHandler);
        }
        };
        
        document.addEventListener('DOMContentLoaded', addCommentBtn);
        
        addCommentBtn();
    }); 