import * as React from 'react';
import { NavigationProp } from '@react-navigation/core/lib/typescript/src/types';
import NavigationContext from '@react-navigation/core/src/NavigationContext';
import { RouteProp } from '@react-navigation/core/src/types';
import { useRoute as RNUseRoute } from '@react-navigation/native';

import type { AppNavigationType } from './type';

/**
 * Hook to access the navigation prop of the parent screen anywhere.
 *
 * @returns Navigation prop of the parent screen.
 */
export function useNavigation<
  T extends NavigationProp<AppNavigationType>,
>(): T {
  const navigation = React.useContext(NavigationContext);

  if (navigation === undefined) {
    throw new Error(
      "Couldn't find a navigation object. Is your component inside a screen in a navigator?",
    );
  }

  return navigation as unknown as T;
}

/**
 * Hook to access the route prop of the parent screen anywhere.
 *
 * @returns Route prop of the parent screen.
 */

export const useRoute = <T extends keyof AppNavigationType>(): RouteProp<
  AppNavigationType,
  T
> => {
  return RNUseRoute<RouteProp<AppNavigationType, T>>();
};
