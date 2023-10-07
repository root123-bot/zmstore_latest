// https://stackoverflow.com/questions/68779417/navigation-navigatehome-showing-some-error-in-typescript
import { RootStackParamList } from '@src/App';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
