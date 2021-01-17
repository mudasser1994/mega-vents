import { dataFromSnapshot } from './../firestore/firestoreService';
import { useDispatch } from 'react-redux';
import { asyncActionStart, asyncActionError, asyncActionFinish } from './../async/asyncReducer';
import { useEffect } from "react";



export function useFirestoreCollection({query , data , deps}){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            (snapshot)=>{
                const docs = snapshot.docs.map(docSnapshot=>dataFromSnapshot(docSnapshot))
                data(docs);
                dispatch(asyncActionFinish());
            },
            (error)=>dispatch(asyncActionError(error))
        )
        return ()=>{
            unsubscribe();
        }
    } , deps)   //eslint-disable-line react-hooks/exhaustive-deps   
}


export default useFirestoreCollection;