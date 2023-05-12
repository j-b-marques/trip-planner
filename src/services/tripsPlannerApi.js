const baseUrl = import.meta.env.VITE_BASE_URL_TRIP_PLANNER
const apiKey = import.meta.env.VITE_API_KEY_TRIP_PLANNER
const apiHost = import.meta.env.VITE_API_HOST_TRIP_PLANNER

export const options = {
    method: 'GET',
    url: baseUrl,
    params: {
        days: '',
        destination: ''
    },
    headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost
    }
}
