import store from '../../../Store';

export const get = () => store.getState().services.session;
