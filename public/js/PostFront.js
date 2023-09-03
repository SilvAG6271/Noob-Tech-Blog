document.addEventListener('DOMContentLoaded', () => {
async function newFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();
    
   // Send post request to add a new blog post information
    let response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify ({
        title: title,
        text: text,
        
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //if blog post is added, the dashboard will be rendered
    if (response.ok) {
      window.location.replace('/dashboard');
    } else {
      alert('Failed to add post');
    }
  }
  


  const addPostBtn = () => {
    const newPostBtn = document.querySelector('#new-post');
    if (newPostBtn) {
    newPostBtn.addEventListener('click', newFormHandler);
    }
    };
    
    document.addEventListener('DOMContentLoaded', addPostBtn);
    
    addPostBtn();
  
    
    const editTitleInput = document.getElementById('editableTitle');
    const editTextArea = document.getElementById('editableText');

    let editing = false;

    const editButton = document.getElementById('edit-button');
    if (editButton) {
      editButton.addEventListener('click', ()=> {
       editing = true;
      });  
    }    

  const saveButton = document.getElementById('save-button');
    if (saveButton) {
      saveButton.addEventListener('click', async () => {
      const newTitle = editTitleInput.value.trim();
      const newText = editTextArea.value.trim();
     try {
      const response = await fetch('api/posts/${postId}', {
        method: 'PUT',
        body: JSON.stringify({
          title: newTitle,
          text: newText,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
});

if (response.ok) {
  editing = false;
  render('/dashboard');
}
     } catch (error) {
      console.log('Error updating post', error);
     }
});
    }
  

  const cancelButton = document.getElementById('cancel-button');
    if (cancelButton) {cancelButton.addEventListener('click', ()=> {
      editing = false;
      render('/singlePost')
    })
  }
});
