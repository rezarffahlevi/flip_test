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
  'Desember',
];

export function formatDate(date: string) {
  let newDate = new Date(date),
    day = '' + newDate.getDate(),
    month = '' + months[newDate.getMonth()],
    year = newDate.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatDateTime(date: string) {
  let newDate = new Date(date),
    day = '' + newDate.getDate(),
    month = '' + months[newDate.getMonth()],
    year = newDate.getFullYear(),
    hours =
      newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours(),
    minutes =
      newDate.getMinutes() < 10
        ? '0' + newDate.getMinutes()
        : newDate.getMinutes(),
    seconds =
      newDate.getSeconds() < 10
        ? '0' + newDate.getSeconds()
        : newDate.getSeconds();

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}
