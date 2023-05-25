<template>
    <section class="main-wrapper" :class="loading && 'loader'">
        <div v-if="loading" class="spinner-holder">
            <Loader></Loader>
        </div>
        <div v-else>
            <nav>
                <div class="logo-holder">
                    <div>
                        <svg
                            width="50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M6.08296 13C6.0284 12.6748 6 12.3407 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 12.3407 17.9716 12.6748 17.917 13H15.874C15.9562 12.6804 16 12.3453 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 12.3453 8.04375 12.6804 8.12602 13H6.08296ZM2 15H12V17H2V15ZM14 15H22V17H14V15ZM16 19H20V21H16V19ZM4 19H14V21H4V19ZM11 1H13V4H11V1ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"
                                fill="#FC814A"
                            ></path>
                        </svg>
                    </div>
                    <span class="title">Trip Planner</span>
                </div>
                <div class="github">
                    <a
                        href="https://github.com/j-b-marques/TripPlanner"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"
                                fill="#eeeeff"
                            ></path>
                        </svg>
                    </a>
                </div>
            </nav>
            <div class="item-wrapper select-options">
                <div class="item-holder">
                    <div class="item">
                        <span>Select Country</span>
                        <vue-select
                            v-model="selectedCountry"
                            :options="countriesList"
                            :close-on-select="true"
                            :key="keyCountry"
                            :searchable="true"
                        ></vue-select>
                    </div>
                </div>
                <div class="item-holder" v-if="selectedCountry">
                    <div class="item">
                        <span>Select City</span>
                        <vue-select
                            v-model="selectedCity"
                            :options="citysList"
                            :close-on-select="true"
                            :key="keyCity"
                            :searchable="true"
                        ></vue-select>
                    </div>
                </div>
                <div class="item-holder" v-if="selectedCountry && selectedCity">
                    <div class="item">
                        <span>How many days you're planning to stay?</span>
                        <input
                            type="text"
                            v-model="days"
                            @input="filterNonNumeric"
                        />
                    </div>
                </div>
                <button v-if="haveData" class="setTrip" @click="search">
                    Set Trip
                </button>
            </div>
            <div v-if="tripData.length > 0">
                <div class="selection-holder">
                    <h4>{{ selectedCity }}, &nbsp;{{ selectedCountry }}</h4>
                    <button @click="copyData" class="copyInfo">
                        Download Plan to Pdf
                    </button>
                </div>

                <div class="item-wrapper trip-planner">
                    <div class="item-holder" v-for="x in tripData" :key="x.day">
                        <div class="item">
                            <div class="card">
                                <div class="day">
                                    <span class="title-day"
                                        >Day: &nbsp; {{ x.day }}</span
                                    >
                                    <div
                                        v-for="j in x.activities"
                                        class="activities"
                                    >
                                        <div>
                                            <span class="title">Hour:</span>
                                            &nbsp;
                                            {{ j.time }}
                                        </div>
                                        <div>
                                            <span class="title">
                                                Activity:</span
                                            >
                                            &nbsp; {{ j.description }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref, computed, toRaw, watch, reactive } from 'vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Loader from '../components/Loader.vue'
import { useTripsStore } from '../stores/trips'
import { options } from '../services/tripsPlannerApi'

import countriesJson from '../data/countries.json'
import exampleTrip from '../data/exampleTrip.json'

//Data
const baseUrl = options.url
const store = useTripsStore()

//usign static data to not max out api call limit of 10 p/month, data retrieved from api in countries.json file
const countriesData = countriesJson.cities
let tripData = reactive([])

let countriesList = reactive([])
let selectedCountry = ref('')
let citysList = reactive([])
let selectedCity = ref('')
let days = ref(0)

let loading = ref(false)
let keyCountry = ref(0)
let keyCity = ref(0)

//Hooks
onMounted(() => {
    setCountriesList(countriesData)
})

// Computed
const haveData = computed(() => {
    if (selectedCountry.value && selectedCity.value && days.value > 0) {
        return {
            country: selectedCountry.value,
            city: selectedCity.value,
            days: days.value
        }
    }
})

// Watchers
watch(selectedCountry, (val, oldVal) => {
    if (val) {
        citysList = countriesData
            .filter((x) => x.country_name === val)
            .map((x) => x.city_name)
        keyCity.value++
    }
})

watch(selectedCountry, (val) => {
    if (val) keyCountry.value++
})
watch(selectedCity, (val) => {
    if (val) keyCity.value++
})

//Functions
function setCountriesList(data) {
    let countries = data.map((x) => x.country_name)
    countriesList = [...new Set(countries)]
    keyCountry.value++
}
function filterNonNumeric() {
    days.value = days.value.replace(/[^0-9]/g, '')
}
async function search() {
    loading.value = true

    let city = haveData.value.city
    let days = parseInt(haveData.value.days)

    await fetch(`${baseUrl}?days=${days}/&destination=${city}`, {
        headers: {
            'X-RapidAPI-Key': options.headers['X-RapidAPI-Key'],
            'X-RapidAPI-Host': options.headers['X-RapidAPI-Host']
        }
    })
        .then((res) => {
            if (res.status == 429) {
                alert(
                    'Api limit was excedeed, Try again in some other time ! Sorry about the inconvenience'
                )
                return
            }
            return res.json()
        })
        .then((data) => {
            tripData = data.plan
            store.addPlanTrip(tripData)
        })
        .catch((error) => {
            console.error(error)
        })

    loading.value = false
}

function copyData() {
    let stringArray = []

    tripData.map((x, indx) => {
        let arr = []
        arr.push(`Day:${x.day}`)
        x.activities.map((j) => {
            arr.push(`Time: ${j.time} \n Description: ${j.description}`)
        })

        stringArray.push(arr)
    })

    stringArray.map((x) => x.flatMap((j) => j))

    let concatString = ''
    for (let x = 0; x < stringArray.length; x++) {
        for (let j = 0; j < stringArray[x].length; j++) {
            concatString += stringArray[x][j] + ' ' + '\n'
        }

        if (stringArray[x][stringArray.length - 1]) {
            concatString += '\n'
        }
    }

    exportToPdf(concatString)
}

async function exportToPdf(data) {
    const doc = new jsPDF()

    const contentElement = document.createElement('div')
    contentElement.style.width = '100%'
    contentElement.style.padding = '20px'

    const paragraph = document.createElement('p')
    paragraph.innerText = data
    contentElement.appendChild(paragraph)

    document.body.appendChild(contentElement)

    setTimeout(async () => {
        const canvas = await html2canvas(contentElement)
        const imgData = canvas.toDataURL('image/png')
        doc.addImage(imgData, 'PNG', 10, 10, 190, 0)
        doc.save(`TripPlanner_${selectedCity.value}_${selectedCountry.value}`)

        document.body.removeChild(contentElement)
    }, 0)
}
</script>

<style scoped lang="scss">
@import '../assets/styles/colors/colors';
.main-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    color: $colorFont;

    &.loader {
        display: flex;
        align-items: center;
    }

    .spinner-holder {
        width: 100%;
        height: 100%;
        flex: 1;
        display: grid;
        place-items: center;
    }

    nav {
        min-width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 30px;

        .logo-holder {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .title {
            font-size: 26px;
        }
    }

    .selection-holder {
        display: flex;
        margin-bottom: 30px;
        justify-content: center;
        align-items: center;
        gap: 10px;

        h4 {
            font-size: 24px;
            font-weight: 500;
        }

        .copyInfo {
            background-color: #db1d70;
            border-radius: 0.375rem;
            border: none;
            padding: 5px 8px;
            font-size: 14px;
            line-height: 1.75rem;
            transition: all 0.1s ease-in-out;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    .item-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;

        &.select-options {
            padding: 60px 30px 80px 30px;
        }
        &.trip-planner {
            padding: 0px 30px 0px 30px;
            margin-bottom: 80px;
        }

        &.select-options > .item-holder {
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            min-width: 100%;
            .item {
                max-width: 200px;
                span {
                    display: inline-block;
                    margin-bottom: 5px;
                    font-size: 22px;
                }
                input[type='text'] {
                    color: black;
                    max-width: 220px;

                    &:focus {
                        outline: 1px solid rgba(255, 255, 255, 0.125);
                    }
                }
            }

            &:nth-child(3) {
                margin-bottom: 30px;
            }
        }

        &.trip-planner > .item-holder {
            min-width: 100%;
            .item {
                margin: 0 auto;
                max-width: 360px;
            }
            .card {
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                background-color: rgba(17, 25, 40, 0.25);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.125);
                padding: 18px;
                filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;

                .activities {
                    margin-bottom: 10px;
                    position: relative;
                    padding-bottom: 5px;

                    &:not(:last-child) {
                        &::after {
                            content: '';
                            position: absolute;
                            height: 1px;
                            background-color: $colorFont;
                            width: 100%;
                            bottom: 0;
                            left: 0;
                        }
                    }
                }
                .title-day {
                    font-size: 24px;
                    font-weight: 600;
                    display: inline-block;
                    margin-bottom: 10px;
                }
                .title {
                    font-size: 16px;
                    font-weight: 600;
                }
            }
        }
    }

    button.setTrip {
        width: fit-content;
        font-size: 16px;
        padding: 8px 25px;
        font-weight: 600;
        cursor: pointer;
        text-align: center;
        border: none;
        background-size: 300% 100%;
        border-radius: 0.375rem;
        moz-transition: all 0.4s ease-in-out;
        -o-transition: all 0.4s ease-in-out;
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
    }

    button.setTrip:hover {
        background-position: 100% 0;
        moz-transition: all 0.4s ease-in-out;
        -o-transition: all 0.4s ease-in-out;
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
    }

    button.setTrip:focus {
        outline: none;
    }

    button.setTrip {
        background-image: linear-gradient(to bottom right, #5761b2, #1fc5a8);
        box-shadow: 0 4px 15px 0 rgba(184, 19, 101, 0.75);
    }
}

:deep(.vue-select) {
    min-width: 220px;
}
:deep(.vue-select .vue-select-header) {
    background-color: $colorFont;
}
:deep(.vue-select .vue-select-header .vue-input) {
    color: #18181b;

    input {
        font-weight: 600;
        font-size: 16px;
    }
}
:deep(.vue-select .vue-dropdown) {
    color: black;

    .highlighted {
        background-color: rgba(252, 129, 74, 1);
    }
}

@media (min-width: 768px) {
    .main-wrapper .item-wrapper.select-options {
        flex-direction: row;
        justify-content: center;
        gap: 35px;
        align-items: flex-end;
        flex-wrap: wrap;

        & > .item-holder {
            min-width: auto;
            margin-bottom: 0;
            &:nth-child(3) {
                margin-bottom: 0px;
            }
        }
    }

    .main-wrapper .item-wrapper.trip-planner > .item-holder .item {
        max-width: 650px;
    }
}

@media (min-width: 1024px) {
    .main-wrapper .item-wrapper.select-options {
        gap: 70px;
    }

    .main-wrapper .item-wrapper.trip-planner {
        flex-direction: row;
        gap: 15px;
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: center;

        & > .item-holder {
            min-width: 400px;
            max-width: 400px;
            .item {
                height: 100%;

                .card {
                    justify-content: flex-start;
                    min-height: 100%;
                }
            }
        }
    }
}
</style>
