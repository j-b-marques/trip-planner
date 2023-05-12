import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTripsStore = defineStore('trips', () => {
    //state
    const trip = reactive([])
    //getters
    const getAllActivities = computed(() => {
        return trip.map((x) => x.activities).length
    })
    //actions
    function addPlanTrip(data) {
        trip.push(data)
    }

    return { trip, getAllActivities, addPlanTrip }
})
