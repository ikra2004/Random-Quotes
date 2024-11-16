document.getElementById('random-btn').addEventListener('click', getRandomAdvice);
document.getElementById('search-btn').addEventListener('click', searchAdvice);

const adviceContainer = document.getElementById('advice');
const searchResults = document.getElementById('search-results');


function getRandomAdvice() {
  fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(data => {
      adviceContainer.textContent = `"${data.slip.advice}"`;
    })
    .catch(error => {
      console.error('Error fetching random advice:', error);
      adviceContainer.textContent = "Couldn't fetch advice. Try again.";
    });
}


function searchAdvice() {
    const query = document.getElementById('search-query').value;
    if (query.trim() === '') {
      searchResults.textContent = 'Please enter a search query.';
      return;
    }
  
    fetch(`https://api.adviceslip.com/advice/search/${query}`)
      .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = ''; 
        if (data.slips) {
          data.slips.forEach(slip => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('search-result-card'); 
  
            const adviceText = document.createElement('p');
            adviceText.textContent = `"${slip.advice}"`;
            
            const adviceID = document.createElement('span');
            adviceID.textContent = `Advice ID: ${slip.id}`;
  
            resultCard.appendChild(adviceText);
            resultCard.appendChild(adviceID);
  
            searchResults.appendChild(resultCard); 
          });
        } else {
          searchResults.textContent = 'No advice found for the search term.';
        }
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        searchResults.textContent = "Couldn't fetch results. Try again.";
      });
  }
  