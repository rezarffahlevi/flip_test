const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Ocktober',
    'November',
    'Desember'
]

export function formatDate(date: string) {
    let newDate = new Date(date),
        day = '' + newDate.getDate(),
        month = '' + months[newDate.getMonth()],
        year = newDate.getFullYear();

    return `${day} ${month} ${year}`;
}