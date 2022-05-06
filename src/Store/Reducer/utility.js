const updateState=(state,changes)=>{
    return {
        ...state,
        ...changes
    }
}

export default updateState;