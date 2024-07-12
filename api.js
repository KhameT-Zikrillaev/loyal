import axiosCustom from "@/axiosConf";


const apiPost = {
    getCatigories() {
        const url = `categories`
        return axiosCustom.get(url)
    },
    getLocations() {
        const locationUrl = `locations`
        return axiosCustom.get(locationUrl)
    }
}

export default apiPost