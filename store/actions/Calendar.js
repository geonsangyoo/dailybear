export const SET_DATE = 'SET_DATE';

export const setActiveDate = activeDate => {
    return  {
        type: SET_DATE,
        activeDate: activeDate
    }
}