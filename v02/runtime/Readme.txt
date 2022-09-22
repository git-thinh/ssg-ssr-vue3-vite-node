
# https://markus.oberlehner.net/blog/distributed-vue-applications-loading-components-via-http/

- npm install @vue/cli-service
- npx vue-cli-service build --target lib --formats umd-min --no-clean --dest server/components/MyComponent --name "MyComponent.[chunkhash]" server/components/MyComponent/MyComponent.vue


const MyComponent = () => import('./MyComponent.vue');
const MyComponent = () => import('https://distribution.server/MyComponent.js');


npx vue-cli-service build --target lib --dest src/_shared/components --name "rtTestRuntime" src/_runtime/templates/rtTestRuntime.vue

npx vue-cli-service build --target lib --formats umd-min --no-clean --dest src/_shared/components --name "rtTestRuntime" src/_runtime/templates/rtTestRuntime.vue
npx vue-cli-service build --target lib --mode production --formats umd-min --no-clean --dest src/_shared/components --inline-vue --name "rtTestRuntime" src/_runtime/templates/rtTestRuntime.vue