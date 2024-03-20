const destinations = [
    {
        name: 'Thailand',
        location: 'Bangkok',
        rate: '$99 per person',
        image: './images/thailand.jpg'
    },
    {
        name: 'Iran',
        location: 'Tehran',
        rate: '$120 per person',
        image: './images/tehran.jpg'
    },
    {
        name: 'Iran',
        location: 'Tehran',
        rate: '$120 per person',
        image: './images/tehran.jpg'
    },
    {
        name: 'Iraq',
        location: 'Baghdad',
        rate: '$150 per person',
        image: './images/bagdad.jpg'
    }
];
document.addEventListener('DOMContentLoaded', function() {
    const destinationList = document.getElementById('destinationList');

    destinations.forEach(destination => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">
            <div class="card-info">
                <h3>${destination.name}</h3>
                <p>${destination.location}</p>
                <p>${destination.rate}</p>
                <button class="book-button" data-name="${destination.name}" data-location="${destination.location}" data-rate="${destination.rate}" data-image="${destination.image}">Book</button>
            </div>
        `;
        destinationList.appendChild(card);
    });

    // Add event listener for book buttons
    destinationList.addEventListener('click', function(event) {
        if (event.target.classList.contains('book-button')) {
            const location = event.target.dataset.location;
            const rate = event.target.dataset.rate;
            const image = event.target.dataset.image;
            const destination = event.target.dataset.name;
            window.location.href = `bookings?name=${destination}&location=${location}&rate=${rate}&image=${image}`;
        }
    });
    

});




