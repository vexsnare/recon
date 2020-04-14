import { NavigationActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

// function reset(routeName, params) {
//   _container.dispatch(
//     NavigationActions.reset({
//       index: 0,
//       key: null,
//       actions: [
//         NavigationActions.navigate({
//           type: 'Navigation/NAVIGATE',
//           routeName,
//           params,
//         }),
//       ],
//     }),
//   );
// }

// add other navigation functions that you need and export them

export default {
  navigate,
  reset,
  setTopLevelNavigator
};


