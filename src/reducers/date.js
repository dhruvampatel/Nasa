const dateReducer = (state = new Date(), action) => {
    switch(action.type){
        case 'DATE':
            return action.payload;
        default: 
            return new Date();
    }
}

export default dateReducer;