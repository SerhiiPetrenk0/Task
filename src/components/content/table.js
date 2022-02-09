import { useEffect, useState, useRef } from "react"
import { appStore } from "../store"
import './table.css'
import Loader from "../icon/loader";
import arrow from '../img/directional-arrows.png'
import { connect } from "react-redux";
import { loadViews, loadAll, addViews, sorttabl } from "../store/action"


const Table = (props) => {
    const [ news , setNews ] = useState([])
    const [ changerSort, setChangerSort ] = useState(true)
    const [countPage , setCountPage] = useState(0)
    let screenWidth = window.innerWidth
    let BilderBody = null
        //LIFECICLE
        useEffect(()=>{
            appStore.dispatch(loadViews())
            appStore.dispatch(loadAll())
            window.addEventListener('scroll', onScroll)
                return () => {
                    window.removeEventListener('scroll', onScroll)
                }
        },[])

        useEffect(()=>{
            loadNews()
        },[props.viewNews])

        useEffect(() => {
        })
        // BILDER
        {if(screenWidth < 600){
             BilderBody = news.map(item => (
                <tr key={item.id} onClick={() => document.location = item.url}>
                    <td className="table-title">{item.title}</td>
                </tr>
            ))
        }else{
             BilderBody = news.map(item => (
                <tr key={item.id} onClick={() => document.location = item.url}>
                    <td>{item.time}</td>
                    <td className="table-title">{item.title}</td>
                    <td>{item.domain}</td>
                </tr>
            ))
        }}


        // OTHER
        const loadNews = () => {
            const { viewNews } = props
            setNews( viewNews )
        }
        
        const onScroll = () => {
            let innerHeight = window.innerHeight
            let offsetHeight = window.document.body.offsetHeight
            let endTo = offsetHeight - innerHeight
            let endMove = endTo - window.scrollY
                if(endMove < 100 ){
                    console.log('..............................')
                    appStore.dispatch(addViews(countPage))
                    onAddView()
                }
        }
        
       const onAddView = () => {
        console.log(countPage)
        
        let page = countPage + 1
        setCountPage(page)

        
       }

       const onSorting = (event) => {
           let type = event.target.outerText
           setChangerSort(!changerSort)
           appStore.dispatch(sorttabl({type, changerSort}))

       }
        return(<>
            <div className="container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            {(screenWidth < 600) ? <></> : <th onClick={onSorting}><div>time<img src={arrow} alt="arrow" /></div></th>}
                            <th onClick={onSorting}><div>title<img src={arrow} alt="arrow" /></div></th>
                            {(screenWidth < 600) ? <></> : <th onClick={onSorting}><div>domain<img src={arrow} alt="arrow" /></div></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {BilderBody}
                    </tbody>
            </table>
            
            </div>
            <div onClick={onSorting} className="btn-time">time</div>
            </>
        )
}

const mapStateToProps = (store) => {
    const { allNews, viewNews } = store
    return{
        allNews,
        viewNews,
    }
}
const mapDispatchToProps =  ({
    loadViews,
    loadAll,
    addViews,
    sorttabl,
})


export default connect(mapStateToProps, mapDispatchToProps)(Table)
