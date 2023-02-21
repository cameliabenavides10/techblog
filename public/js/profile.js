
const newFormHandler = async (event) => {
  event.preventDefault();

const postId = document.getElementById('post_id').value
const comment = document.querySelector('#exampleFormControlInput1').value.trim();
console.log(comment);
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
      res.location.replace(`/post/${postId}`)
    
    } else {
      alert('Failed to create comment');
    }
  }
};


document
  .querySelector('.btn')
  .addEventListener('submit', newFormHandler);
