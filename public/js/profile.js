
const newFormHandler = async (event) => {
  event.preventDefault();
console.log('GOODBYE');
const postId = event.target.getAttribute('postId')
const comment = document.querySelector('#commentsForm').value.trim();
console.log('HELLO:'+ comment);
console.log(postId);

  if (comment) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ comment, postId }),
      headers: {
        'Content-Type': 'application/json',
      }, 
    });

    if (response.ok) {
console.log("GREAT!")

    
    } else {
      alert('Failed to create comment');
    }
  }
};


document.getElementById("formbutton").addEventListener("click", newFormHandler);
console.log("TEXT FROM MAIN");