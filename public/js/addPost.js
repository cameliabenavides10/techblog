
const newPostFormHandler = async (event) => {
    event.preventDefault();
  console.log('GOODBYE');
  const userId = event.target.getAttribute('userId')
  const body = document.querySelector('#postForm').value.trim();
  const title = document.querySelector('#titleForm').value.trim();
  
  console.log('HELLO:'+ body);
  console.log(userId);
  
    if (body) {
      const response = await fetch(`/api/post/`, {
        method: 'POST',
        body: JSON.stringify({ body, title, userId }),
        headers: {
          'Content-Type': 'application/json',
        }, 
      });
  
      if (response.ok) {
  console.log("GREAT!")
  document.location.replace(`/`);
      
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  
  document.getElementById("postbutton").addEventListener("click", newPostFormHandler);
  console.log("TEXT FROM MAIN");