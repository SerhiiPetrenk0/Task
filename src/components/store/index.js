import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const defaultData = {
    allNews: [],
    viewNews: [],
    loader: true,
}

function newsReducer(store = defaultData, action) {
    let res;
  switch (action.type) {
    case 'SORTTABLE': {
        const { payload : { type , changerSort } } = action
        const { viewNews } = store
            if(type==="TIME"){
                if(changerSort){
                    viewNews.sort(( a, b ) =>  a.time - b.time); 
                }else{
                    viewNews.sort(( a, b ) =>  b.time - a.time); 
                }
            }
            else if
            (type==="TITLE"){
                if(changerSort){
                        viewNews.sort(function(a, b){
                        let x = a.title.toLowerCase();
                        let y = b.title.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    })
                }else{
                        viewNews.sort(function(a, b){
                        let x = a.title.toLowerCase();
                        let y = b.title.toLowerCase();
                        if (x > y) {return -1;}
                        if (x < y) {return 1;}
                        return 0;
                    })
                }
            }
            else if 
            (type==="DOMAIN"){
                if(changerSort){
                        viewNews.sort(function(a, b){
                        let x = a.domain
                        let y = b.domain
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    })
                }else{
                        viewNews.sort(function(a, b){
                        let x = a.domain
                        let y = b.domain
                        if (x > y) {return -1;}
                        if (x < y) {return 1;}
                        return 0;
                    })
                }
            }




        res = { 
            ...store,
            viewNews: [...viewNews]
        }

        break;
    }
    case 'ADDVIEW': {
        const { payload } = action
        const { viewNews, allNews } = store
        if(payload < allNews.length ){ 
            res = { 
                ...store,
                viewNews: [...viewNews, ...allNews[payload]]
            }
        }else{
            res = { 
                ...store,
                viewNews: [...viewNews]
            }
        }


        break;
    }
    case 'LOADVIEWS':{
        const { payload } = action
        res = { 
            ...store,
            viewNews: payload
        }
        break;
    }
    case 'LOADALL':{
        const { payload } = action
      res = { 
          ...store,
          allNews: payload
      }
      break
    }
    default:
        res = store
      break
  }
  return res;
};


export const appStore = createStore(newsReducer, composeWithDevTools(
    applyMiddleware(thunk)
))