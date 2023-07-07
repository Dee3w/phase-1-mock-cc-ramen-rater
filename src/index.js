// write your code here
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetail = document.getElementById('ramen-detail');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');
    const newRamenForm = document.getElementById('new-ramen');
  
    // Fetch all the ramen objects from the server and display their images
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
        ramens.forEach(ramen => {
          const ramenImage = document.createElement('img');
          ramenImage.src = ramen.image;
          ramenImage.addEventListener('click', () => displayRamenDetails(ramen));
          ramenMenu.appendChild(ramenImage);
        });
      });
  
    // Display the details of the selected ramen
    function displayRamenDetails(ramen) {
      ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
      `;
      ratingDisplay.textContent = ramen.rating;
      commentDisplay.textContent = ramen.comment;
    }
  
    // Handle form submission to create a new ramen
    newRamenForm.addEventListener('submit', event => {
      event.preventDefault();
  
      const name = document.getElementById('new-name').value;
      const restaurant = document.getElementById('new-restaurant').value;
      const image = document.getElementById('new-image').value;
      const rating = document.getElementById('new-rating').value;
      const comment = document.getElementById('new-comment').value;
  
      const newRamen = {
        name,
        restaurant,
        image,
        rating,
        comment
      };
  
      displayRamenDetails(newRamen); // Display the new ramen details in the detail section
  
      // Add the new ramen image to the menu
      const newRamenImage = document.createElement('img');
      newRamenImage.src = newRamen.image;
      newRamenImage.addEventListener('click', () => displayRamenDetails(newRamen));
      ramenMenu.appendChild(newRamenImage);
  
      // Clear the form values
      newRamenForm.reset();
    });
  });
  