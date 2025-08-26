import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function diffForHumans(date: string): string {
  return dayjs(date).fromNow()
}

export function formatDate(date: string, format = "DD MMM YYYY HH:mm"): string {
  return dayjs(date).format(format)
}
