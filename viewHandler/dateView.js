export function dateViewChange(nowYear, nowMonth) {
    const $headerDateViewWrapper = document.getElementById('location');

    const $children = $headerDateViewWrapper.children;

    const monthName = new Date(nowYear, nowMonth - 1).toLocaleString('en-US', {
        month: 'long',
    });

    const $year = $children[0];
    const $month = $children[1];
    const $monthName = $children[2];

    $year.textContent = nowYear;
    $month.textContent = nowMonth;
    $monthName.textContent = monthName;
}
