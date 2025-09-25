{
    "title": "🍷 XTeam",
    "layout": "single"
}
### Senior Frontend Engineer - React Native 📅 Sep 2022 - Jul 2023  
![XTeam Header](/images/cellar-header.webp)  

# 🌲 Project Treemap {#cellar-project-treemap}  
![XTeam Treemap](/images/cellar-treemap.webp)  

# 🧱 Tech Stack {#cellar-tech-stack}  
- **Animations and Gestures:** Moti, Motify Interactions, React Native Gesture Handler, React Native Reanimated  
- **Component Library and UI:** Expo Vector Icons, Gorhom Bottom Sheet, React Native Calendars, React Native Clipboard, React Native Masked View, React Native Paper, React Native Paper Dropdown, React Native Render HTML, React Native Segmented Control, React Native SVG  
- **Data Fetching and Networking:** Apisauce, Axios Auth Refresh  
- **Framework and Core:** React, React Native, React Native Safe Area Context  
- **Forms and Validation:** Formik, Hookform Resolvers, React Hook Form, Yup  
- **Internationalization (i18n):** FormatJS Intl (DateTimeFormat, GetCanonicalLocales, Locale, NumberFormat, PluralRules), React Intl  
- **Navigation:** React Navigation (Bottom Tabs, Drawer, Native, Native Stack, Stack)  
- **State Management:** React Redux, Reactotron React Native, Reactotron Redux, Redux Persist, Redux Toolkit  
- **Storage:** React Native Async Storage  
- **Testing:** Testing Library React Native  
- **Utilities:** Date-fns, Diacritics, Fuse.js, Lodash, qs  
- **Expo Modules:** Expo Auth Session, Expo AV, Expo Camera, Expo Constants, Expo Image Picker, Expo Linear Gradient, Expo Linking, Expo Status Bar  

# 🌟 STAR Cases  



## STAR Case - Performance Bottleneck  
### Situation  
**Before my involvement**, the app was built only with a **dozen hard-coded entries**. This limited dataset masked scalability issues in the fetching and rendering logic. After I integrated the backend, the app received **thousands of real bottle registries**, and the existing implementation could not handle this scale, causing the app to **freeze during feching, filtering, grouping, and searching**.  

### Task  
Re-architect how the app **handled large-scale data** to:  
1. Support **thousands of records without freezing**.  
2. Ensure **accurate results across all features**.  
3. Build a **modular and maintainable architecture** for data and UI.  
4. Enhance **user experience with smooth navigation and search**.  

### Actions  
First I needed to guarantee the data was loaded **quickly and accurately**. For that I reviewed how the app was fetching and storing information and found **deeply nested loops, duplicated logic and recalculations on every action**. I decided to **reorganize the data fetching and storage flow**, creating **consistent patterns** for how records were requested, saved and displayed. I also introduced a **preloading mechanism** that ensured data was available before the UI rendered. This eliminated unnecessary reload cycles and gave users a faster and smoother experience from cold boot.  

After that I addressed the **UI data rendering code**. Many filtering and sorting elements **were duplicated and inconsistent** so I **refactored** them into **reusable components** which made the interface **easier to maintain and extend**. To improve the experience of browsing large inventories I introduced **sectioned lists and infinite scroll** which reduced rendering cost and gave users a smooth and responsive navigation.  

Below is one of the optimizations I introduced to the selectors.  
```diff
- export const selectCustomFilters = (...) => {
-   ...
-   return {
-     locations: [
-       ...new Set(
-         cellar
-           .map(i => {
-             if (i.Holdings) {
-               return i.Holdings.map(holding => {
-                 if (holding.Locations) {
-                   return holding?.Locations.map(k => {
-                     return k.Location;
-                   });
-                 } else {
-                   return;
-                 }
-               }).flat();
-             }
-             return;
-           })
-           .flat()
-           .filter(i => typeof i === 'string'),
-       ),
-     ],
-     ...


+ const FilterPendingDataArray = (inCellarWines: InCellarWinePending[]) => {
+   const resultData = {} as FilterObject<PendingFilters>;
+
+   inCellarWines?.forEach?.(wine => {
+     const hasBottles = wine?.Purchases?.some?.(p => !!p?.Quantity);
+     if (!hasBottles) return;
+
+     addNewFilterDataItem(resultData, 'appellation', wine?.Appellation);
+     ...
+
+     wine?.Purchases?.forEach(p => {
+       if (!p?.Quantity) return;
+       addNewFilterDataItem(resultData, 'bottleSize', p?.Size);
+     });
+   });
+
+   const { appellation, bottleSize, country, masterVarietal, region, subRegion, type } = resultData;
+   [appellation, bottleSize, country, masterVarietal, region, subRegion, type].forEach(a => a?.sort?.(sortStringAsc));
+
+   const { vintage } = resultData;
+   [vintage].forEach(a => a?.sort?.(sortNumberAsc));
+
+   return resultData;
+ };
```

### Results  
1. **Smooth performance**: large datasets became responsive and near-instant to operate on.  
2. **Fast search and filtering**: thousands of entries could be queried without performance loss.  
3. **Better user experience**: responsive infinite scrolling and grouped lists improved navigation.  
4. **Higher developer productivity**: reusable, modular UI components reduced duplication.  
5. **Scalable architecture**: a foundation that supported new features and long-term growth.  



## STAR Case - Unstructured Backend Responses  
### Situation  
After we managed to consistently **recover thousands of entries** across the app, the next challenge was **the lack** of a proper **model** to organize, sort, and feed data **into the UI**. The **core issue** was the **same as before**: the **data model** the app relied on was **partially hardcoded and incorrect**, the **backend did not provide** a reliable way to **validate data**, and in many cases **critical fields were missing**. This made it difficult to **present accurate information** and to build a **fast and flexible** search mechanism **for users**.  

### Task  
Create a reliable way to handle the app's **deeply nested and inconsistent backend data** in order to:  
1. Resolve issues caused by **missing and unreliable fields**.  
2. Establish a **consistent foundation** for filtering and search.  
3. Ensure the model could **scale to thousands of entries** without breaking.  
4. Enable users to **quickly find and browse bottles** with accurate results.  

### Actions  
To solve this I **restructured** the data handling **into a graph-structured** traversal model where each level of **information** (bottles, holdings, locations, bins) was treated as a **connected node**. This approach created a **navigable structure** where starting from a node like a **location** you could **immediately find** the **bottles** stored there and **from those bottles** trace back to **their vintage** or other attributes. This replaced **scattered nested loops** with a **clear and predictable flow**, making the model **easier to maintain, extend, and scale**.  

This graph approach gave three major advantages:  
1. **Traversal clarity**: instead of nested loops, each level of the data (wine → holding → location → bin) contributed in an organized way.  
2. **Extensibility**: adding a new filter meant only extending traversal rules for a node, not rewriting entire loops.  
3. **Consistency**: the same traversal logic powered cellar, pending, and consumed states, removing duplication and errors.  

![Neurogram Framework](/images/cellar-graph.webp)  

### Results  
1. **Reliable filtering**: users could apply filters consistently even when backend data was incomplete.  
2. **Faster and accurate search**: browsing and filtering across thousands of entries became smooth and responsive.  
3. **Extensible filters**: new filter types were added without breaking existing functionality.  
4. **Maintainable data model**: a graph-inspired approach organized unstructured responses into a predictable system.  



## STAR Case - Missing Internationalization  
### Situation  
The app serves a **global audience** of wine collectors who expect **multiple language support**. While there were some **early attempts at internationalization**, the application was **inconsistent and incomplete**. Many components still relied on **hardcoded English strings** for filters, chips, dropdowns, and error messages. This incomplete approach made the UI feel **disjointed and awkward**, blocking **full localization** and **limiting** the app's ability to deliver a **scalable, accessible international experience**.  

### Task  
**Establish** a consistent internationalization **pattern** to:  
1. **Replace** remaining **hardcoded strings** with localized messages.  
2. Ensure UI elements like filters, chips, and dialogs were **fully translation-ready**.  
3. Create a **scalable i18n foundation** that developers could apply uniformly across the app.  
4. Fix prior inconsistencies and enable a **seamless multilingual experience** for end users.  

### Actions  
I refactored the application to use a **consistent internationalization pattern**, replacing static strings with translated messages across components. To simplify adoption, I created hooks to make it easy to pull translations into any new component.  

Below is the hook I introduced, which **encapsulated the logic** for pulling translation messages, formatting them with **react-intl**, and wiring them into **navigation flows**. This removed duplication and made internationalization extensible across filters, chips, bottom sheets, and dropdowns:
```tsx
import {useNavigation, useRoute} from '@react-navigation/native';
import {useIntl} from 'react-intl';
import {useEffect, useRef} from 'react';

const useEventActionSheet = ({messages, title, params, onSelect}) => {
  const route = useRoute();
  const {formatMessage} = useIntl();
  const navigation = useNavigation();
  ...

  useEffect(() => {...}, [route?.params]);

  const openSheet = () => {
    const options = Object.keys(messages).map(key => {
      const message = messages[key];
      return {
        label: formatMessage(message),
        value: message.value,
      };
    });

    navigation.navigate('EventActionSheet', {...});
  };

  return [openSheet];
};

export default useEventActionSheet;
```

### Results  
1. **Translation-ready UI**: all hardcoded strings were removed and replaced with localized messages.  
2. **Scalable i18n foundation**: reusable hooks centralized logic and ensured consistent adoption across the app.  
3. **Consistent user interface**: standardized messaging eliminated awkward or disjointed UI patterns.  
4. **Broader international reach**: multilingual support prepared the app to serve a global user base effectively.  
5. **Faster development workflows**: developers could add new components with built-in i18n support and less duplication.  
