const data = [
    { name: "Greater Vancouver Food Bank", category: "Food Bank", address: "1150 Raymur Ave, Vancouver", phone: "(604) 876-3601", hours: "Mon-Fri, 9 AM - 5 PM", website: "www.foodbank.bc.ca" },
    { name: "Vancouver Public Library", category: "Library", address: "350 W Georgia St, Vancouver", phone: "(604) 331-3603", hours: "Mon-Sat, 9 AM - 6 PM", website: "www.vpl.ca" },
    { name: "Downtown Walk-in Clinic", category: "Clinic", address: "123 Main St, Vancouver", phone: "(604) 123-4567", hours: "Mon-Sun, 8 AM - 8 PM", website: "www.downtownclinic.ca" },
    { name: "Salvation Army Vancouver", category: "Food Bank", address: "3213 E Hastings St, Vancouver", phone: "(604) 254-9059", hours: "Mon-Sun, 8 AM - 6 PM", website: "www.salvationarmy.ca" },
    { name: "Vancouver General Hospital", category: "Hospital", address: "899 W 12th Ave, Vancouver", phone: "(604) 875-4111", hours: "24 Hours", website: "www.vgh.ca" },
    { name: "BC211", category: "Community Services", address: "12345 6th St, Vancouver", phone: "(604) 875-9181", hours: "Mon-Sun, 24 Hours", website: "www.bc211.ca" },
    { name: "Women's Shelters BC", category: "Shelter", address: "Multiple Locations", phone: "(800) 563-0808", hours: "24 Hours", website: "www.womenshelters.ca" },
    { name: "Covenant House Vancouver", category: "Shelter", address: "575 Drake St, Vancouver", phone: "(604) 637-2300", hours: "24 Hours", website: "www.covenanthousebc.org" },
    { name: "Family Services of Greater Vancouver", category: "Community Services", address: "150-100 Park Royal South, West Vancouver", phone: "(604) 987-8211", hours: "Mon-Fri, 9 AM - 5 PM", website: "www.fsgv.ca" },
    { name: "United Way of Lower Mainland", category: "Community Services", address: "4543 Canada Way, Burnaby", phone: "(604) 294-8929", hours: "Mon-Fri, 9 AM - 5 PM", website: "www.uwlm.ca" },
    { name: "Vancouver Coastal Health", category: "Health", address: "601 W Broadway, Vancouver", phone: "(604) 736-2033", hours: "Mon-Fri, 9 AM - 5 PM", website: "www.vch.ca" },
    { name: "Seniors Services Society", category: "Community Services", address: "210-3030 Lincoln Ave, Coquitlam", phone: "(604) 520-6621", hours: "Mon-Fri, 9 AM - 5 PM", website: "www.seniorsservicessociety.ca" },
    { name: "The Lookout Society", category: "Shelter", address: "929 Powell St, Vancouver", phone: "(604) 255-0340", hours: "24 Hours", website: "www.lookoutsociety.ca" },
    { name: "Carnegie Community Centre", category: "Community Services", address: "401 Main St, Vancouver", phone: "(604) 665-2220", hours: "Mon-Fri, 9 AM - 9 PM", website: "www.carnegiecentre.org" },
    { name: "Burnaby Hospital", category: "Hospital", address: "3935 Kincaid St, Burnaby", phone: "(604) 434-4211", hours: "24 Hours", website: "www.bch.ca" },
    { name: "Mission Possible", category: "Shelter", address: "1106 Seymour St, Vancouver", phone: "(604) 254-2001", hours: "Mon-Sun, 8 AM - 6 PM", website: "www.missionpossible.ca" },
    { name: "Pacific Community Resources Society", category: "Youth Services", address: "200-1193 Kingsway, Vancouver", phone: "(604) 320-5030", hours: "Mon-Fri, 9 AM - 5 PM", website: "www.pcrs.ca" },
    { name: "The Food Pantry", category: "Food Bank", address: "1298 Hornby St, Vancouver", phone: "(604) 408-7275", hours: "Mon-Sun, 9 AM - 5 PM", website: "www.thefoodpantry.org" },
    { name: "Seniors' Drop-In Centre", category: "Community Services", address: "6000 Dunbar St, Vancouver", phone: "(604) 222-4446", hours: "Mon-Fri, 9 AM - 4 PM", website: "www.seniorsdropin.ca" },
    { name: "Vancouver Food Connection", category: "Food Bank", address: "1212 E Pender St, Vancouver", phone: "(604) 577-2321", hours: "Mon-Fri, 9 AM - 5 PM", website: "www.vancouverfoodconnection.org" },
    { name: "Aboriginal Mother Centre", category: "Community Services", address: "201-5518 12th Ave, Vancouver", phone: "(604) 678-0058", hours: "Mon-Fri, 9 AM - 5 PM", website: "www.aboriginalmothercentre.com" }
];

// Function to show and hide the loading spinner
function toggleSpinner(show) {
    const spinner = document.getElementById("loading-spinner");
    spinner.style.display = show ? "block" : "none";
}

let map;
let markers = [];

// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 49.2827, lng: -123.1207 }, // Centered on Vancouver
        zoom: 12
    });

    // Show markers for all resources
    addMarkers(data);
}

// Function to add markers to the map
function addMarkers(resourceData) {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    resourceData.forEach(resource => {
        const marker = new google.maps.Marker({
            position: { lat: resource.lat, lng: resource.lng },
            map: map,
            title: resource.name
        });

        // Info window with details
        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${resource.name}</h3>
                      <p>${resource.address}</p>
                      <a href="https://${resource.website}" target="_blank">Visit Website</a>
                      <br>
                      <button onclick="getDirections(${resource.lat}, ${resource.lng})">Get Directions</button>`
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}

// Function to get directions from user's location
function getDirections(destLat, destLng) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            const destination = new google.maps.LatLng(destLat, destLng);

            // Open Google Maps with directions
            window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat()},${userLocation.lng()}&destination=${destination.lat()},${destination.lng()}`, "_blank");
        }, () => {
            alert("Error: Unable to get your location.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Function to filter data and update results
function filterData() {
    toggleSpinner(true);

    const searchQuery = document.getElementById("search").value.toLowerCase();
    const selectedCategory = document.getElementById("category-filter").value;

    setTimeout(() => {
        const filteredData = data.filter(item => {
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        displayResults(filteredData);
        addMarkers(filteredData);  // Update map markers

        toggleSpinner(false);
    }, 500);
}

// Function to display results
function displayResults(filteredData) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = '';

    if (filteredData.length === 0) {
        resultsDiv.innerHTML = '<p>No resources found.</p>';
    } else {
        filteredData.forEach(item => {
            const resourceDiv = document.createElement("div");
            resourceDiv.classList.add("resource");

            resourceDiv.innerHTML = `
                <h2>${item.name}</h2>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Address:</strong> ${item.address}</p>
                <p><strong>Phone:</strong> ${item.phone}</p>
                <p><strong>Hours:</strong> ${item.hours}</p>
                <p><a href="https://${item.website}" target="_blank">Visit Website</a></p>
                <button onclick="getDirections(${item.lat}, ${item.lng})">Get Directions</button>
            `;

            resultsDiv.appendChild(resourceDiv);
        });
    }
}

// Event listeners
document.getElementById("search").addEventListener("input", filterData);
document.getElementById("category-filter").addEventListener("change", filterData);

// Initialize map on load
window.onload = function() {
    displayResults(data);
};
