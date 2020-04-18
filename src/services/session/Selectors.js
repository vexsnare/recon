import store from '../../../Store';

export const getUser = () => store.getState().services.session.user;
