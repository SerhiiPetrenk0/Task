import { LOADVIEWS, LOADALL, ADDVIEW, SORTTABLE } from "./actionTypes"

export const loadViews = () => {
    return (dispatch , getState) => {
        fetch('https://api.hnpwa.com/v0/news/1.json')
            .then(function (response) {
          return response.json()
        })
        .then(function (data) {
            dispatch({
                type: LOADVIEWS,
                payload: data,
            })
        })
    }


}
export const loadAll = () => {

    var localData = []
    return (dispatch , getState) => {
        
        for(let i = 2 ; i <= 10 ; i++ ) {
            fetch(`https://api.hnpwa.com/v0/news/${i}.json`)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    localData.push(data)
                })
            }
          
        dispatch({
            type: LOADALL,
            payload: localData,
        })

    }}
export const addViews = (countPage) => {
        return{
            type : ADDVIEW,
            payload: countPage,
        }
    }
export const sorttabl = ({type, changerSort}) => {
    return{
        type : SORTTABLE,
        payload: {type, changerSort},
    }
}
    
