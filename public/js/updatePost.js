
const updatePostFormHandler = async (event) => {
    event.preventDefault();
  console.log('GOODBYE');
  const userId = event.target.getAttribute('userId')
  const postId = event.target.getAttribute('postId')
  const body = document.querySelector('#updatepostForm').value.trim();
  const title = document.querySelector('#updatetitleForm').value.trim();
  
  console.log('HELLO:'+ body);
  console.log(userId);
  
    if (body) {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ body, title, postId }),
        headers: {
          'Content-Type': 'application/json',
        }, 
      });
  
      if (response.ok) {
  console.log("GREAT!")
  document.location.replace(`/`);
      
      } else {
        alert('Failed to update post');
      }
    }
  };
  
  
  document.getElementById("updatepostbutton").addEventListener("click", updatePostFormHandler);
  console.log("TEXT FROM MAIN");