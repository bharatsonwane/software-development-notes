# React Native

Notes for building mobile apps with React Native (iOS and Android).

Files are numbered in **learning order**: `01-rn-topic.md`, `02-rn-topic.md`, and so on.

**Prerequisite:** complete [React.js](../reactjs/) fundamentals (at least files 01–07) and [JavaScript Language](../javascript-language/) async basics (file 10).

## Contents

**01. [Setup & Overview](./01-rn-setup-and-overview.md)**  
Tier — Fundamental

1. What is React Native  
2. React Native vs React web  
3. Expo vs bare workflow  
4. Project structure and Metro  
5. Common questions

**02. [Core Components](./02-rn-core-components.md)**  
Tier — Fundamental

1. `View`, `Text`, `Image`  
2. `ScrollView` vs scrollable content  
3. `SafeAreaView` and screen insets  
4. Platform-specific components (intro)  
5. Common questions

**03. [Styling & Layout](./03-rn-styling-layout.md)**  
Tier — Fundamental

1. `StyleSheet` and inline styles  
2. Flexbox on mobile (default column)  
3. Dimensions and pixel density  
4. Shadows and elevation (iOS vs Android)  
5. Common questions

**04. [Touch & Interaction](./04-rn-touch-interaction.md)**  
Tier — Fundamental

1. `Pressable` and touch feedback  
2. `TouchableOpacity` / `TouchableHighlight`  
3. Disabled and hit slop  
4. Gesture Handler (intro)  
5. Common questions

**05. [Lists & Performance Basics](./05-rn-lists-performance-basics.md)**  
Tier — Fundamental

1. Why not `map` + `ScrollView` for long lists  
2. `FlatList` — `renderItem`, `keyExtractor`  
3. `SectionList`  
4. Pull to refresh and empty states  
5. Common questions

**06. [Forms & Text Input](./06-rn-forms-text-input.md)**  
Tier — Fundamental

1. `TextInput` and controlled inputs  
2. Keyboard types and return key  
3. `KeyboardAvoidingView` and keyboard dismiss  
4. Form validation patterns  
5. Common questions

**07. [Navigation](./07-rn-navigation.md)**  
Tier — Intermediate

1. React Navigation setup  
2. Stack navigator  
3. Tab and drawer navigators  
4. Params, deep linking (intro)  
5. Common questions

**08. [State & Local Storage](./08-rn-state-local-storage.md)**  
Tier — Intermediate

1. React state patterns on mobile  
2. Context and global state  
3. AsyncStorage / SecureStore  
4. Persisting auth tokens  
5. Common questions

**09. [Networking & Data](./09-rn-networking-data.md)**  
Tier — Intermediate

1. Fetching APIs in RN  
2. Loading, error, and offline UI  
3. TanStack Query on mobile (intro)  
4. Environment config  
5. Common questions

**10. [Platform APIs](./10-rn-platform-apis.md)**  
Tier — Intermediate

1. `Platform` and `Platform.select`  
2. Permissions model  
3. Linking, Share, and deep links  
4. Camera, location, notifications (overview)  
5. Common questions

**11. [Platform Differences](./11-rn-platform-differences.md)**  
Tier — Intermediate

1. iOS vs Android UI patterns  
2. Safe areas and notches  
3. Back button behavior (Android)  
4. Status bar and navigation bar  
5. Common questions

**12. [Native Modules & Bridging](./12-rn-native-modules.md)**  
Tier — Advanced

1. When you need native code  
2. Community modules vs custom native  
3. New Architecture (Fabric, TurboModules intro)  
4. Expo config plugins (overview)  
5. Common questions

**13. [Performance & Debugging](./13-rn-performance-debugging.md)**  
Tier — Advanced

1. FlatList optimization  
2. `React.memo` and render cost  
3. Hermes engine  
4. Flipper / React Native DevTools  
5. Common questions

**14. [Testing & Deployment](./14-rn-testing-deployment.md)**  
Tier — Advanced

1. Jest and React Native Testing Library  
2. E2E testing (Detox / Maestro intro)  
3. EAS Build and OTA updates  
4. App Store and Play Store checklist  
5. Common questions

## Learning path

```
01–06  Fundamental  →  components, layout, lists, inputs
07–11  Intermediate →  navigation, data, platform APIs
12–14  Advanced     →  native code, performance, shipping
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file).

## Topic map (by area)

| Area | Files |
|------|-------|
| UI foundation | 01, 02, 03, 04 |
| Lists & forms | 05, 06 |
| App structure | 07, 08, 09 |
| Platform | 10, 11 |
| Production | 12, 13, 14 |

## Related notes

| Topic | Location |
|-------|----------|
| React (shared concepts) | [../reactjs/](../reactjs/) |
| Node / APIs | [../nodejs/](../nodejs/) |
