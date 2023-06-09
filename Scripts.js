<script>
        const map = L.map('mymap').setView([1, 2], 2);
        const myIcon = L.icon({
            iconUrl: 'ISS_sat.png',
            iconSize: [50, 32],
            iconAnchor: [24, 16],
        });
        const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
        let first_try=true;
        async function getISS() {
            const response = await fetch(api_url);
            const data = await response.json();
            console.log(data);
            const { latitude, longitude } = data;
            marker.setLatLng([latitude, longitude]);
            if(first_try){
                map.setView([latitude, longitude], 2);
                first_try = false;
            }
            document.getElementById("lat").textContent = latitude;
            document.getElementById("lon").textContent = longitude;
        }
        getISS();

        setInterval(getISS, 100);
    </script>
