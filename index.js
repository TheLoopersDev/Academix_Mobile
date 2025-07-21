import { registerRootComponent } from "expo";
import App from "../neurolearn_mobile/src/App"; // File App.tsx của bạn đang ở thư mục gốc

// registerRootComponent sẽ tự động gọi AppRegistry.registerComponent('main', () => App)
registerRootComponent(App);
