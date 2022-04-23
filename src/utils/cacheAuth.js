const AUTH_CACHE="AUTH_CACHE"
const ONE_DAY = 1000 * 60 * 60 * 24

const currentTime=()=>{
    return Date.now()
}

const getAuthCache=()=>{

    let authCache={
        data:{},
        nextCleanup:new Date().getTime()+ONE_DAY
    }  

    try {
        const data=localStorage.getItem(AUTH_CACHE)

        if(data){
            authCache=JSON.parse(data)
        }
    }
    catch(e){
        console.error(e.message)
    }

    return authCache
}

const setAuthToCache=(token)=>{

    const authCache=getAuthCache()
    const data=authCache.data


    const item={
        expiry:new Date().getTime()+ONE_DAY,
        auth:'Bearer ' + token
    }

    data['Bearer']=item

    try{
        localStorage.setItem(AUTH_CACHE,JSON.stringify(authCache))
    }
    catch(e){
        cleanUpStorage(data)
    }

}

const cleanUpStorage=(data)=>{

    let isDeleted
    let oldest
    let oldestKey


    //if 1 day have been passed, it removes the cache
    for (const key in data) {
        const expiry = data[key].expiry
        if (expiry && expiry <=currentTime()) {
          delete data[key]
          isDeleted = true
        }
    
        //finding the oldest cache in case none of them are expired
        if (!oldest || oldest > expiry) {
          oldest = expiry
          oldestKey=key
        }
    }

    //remove the oldest cache if there is no more space in local storage (5 MB)
    if(!isDeleted && oldestKey){
        delete data[oldestKey]
    }

    localStorage.setItem(
        AUTH_CACHE,
        JSON.stringify({
          data: data,
          nextCleanup:currentTime() + ONE_DAY,
        })
    )

}

export {setAuthToCache,getAuthCache}