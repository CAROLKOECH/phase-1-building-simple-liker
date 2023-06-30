document.addEventListener('DOMContentLoaded', () => {
  const errorModal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  const likeButtons = document.getElementsByClassName('like');

  // Hide the error modal initially
  errorModal.classList.add('hidden');

  // Add click event listener to each like button
  Array.from(likeButtons).forEach((button) => {
    button.addEventListener('click', (event) => {
      const heart = event.target;
      mimicServerCall()
        .then(() => {
          // Simulated success response
          heart.classList.toggle('activated-heart');
          if (heart.innerHTML === EMPTY_HEART) {
            heart.innerHTML = FULL_HEART;
          } else {
            heart.innerHTML = EMPTY_HEART;
          }
        })
        .catch((error) => {
          // Simulated failure response
          modalMessage.textContent = error;
          errorModal.classList.remove('hidden');
          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    });
  });
});

// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Function to mimic the server call
function mimicServerCall(url = 'http://mimicServer.example.com', config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject('Random server error. Try again.');
      } else {
        resolve('Pretend remote server notified of action!');
      }
    }, 300);
  });
}
