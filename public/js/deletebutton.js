const deleteFormHandler = async (event) => {
    event.preventDefault();
  console.log('GOODBYE');
  const postId = event.target.getAttribute('postId')

  console.log(postId);
  

      const response = await fetch(`/api/post/delete/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({ postId }),
        headers: {
          'Content-Type': 'application/json',
        }, 
      });
  
      if (response.ok) {
  console.log("GREAT!")
  document.location.replace(`/`);
      
      } else {
        alert('Failed to delete post');
      }

  };
  
  
  document.getElementById("deletebutton").addEventListener("click", deleteFormHandler);
  console.log("TEXT FROM MAIN");