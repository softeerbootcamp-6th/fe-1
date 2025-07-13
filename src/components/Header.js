export function renderHeader() {
  const header = document.getElementById("header");
  header.className = "flex-row-between";
  header.innerHTML = `
        <h1>Wise Wallet</h1>
        <div class="flex-column-between">
            <p>2023</p>
            <div class="flex-row-center header-calendar-bar">
                <a href="#"><</a>
                <p>8</p>
                <a href="#">></a>
            </div>
            <p>August</p>
        </div>
        <ul class="flex-row-center">
            <li>
            <a href="#">main</a>
            </li>
            <li>
                <a href="#">calendar</a>
            </li>
            <li>
                <a href="#">graph</a> 
            </li>
        </div>`;
  return header;
}
